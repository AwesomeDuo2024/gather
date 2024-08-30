"use server";

import { createClient } from "@/app/utils/supabase/server";
import {
  EventData,
  CreateUserResponseType,
  AvailabilityDataType,
  DateData,
  AvailabilityDataTimeType,
} from "@/lib/schema";
import { animateValue } from "framer-motion";
import { calculateTimeSlotBlocks } from "./utils";
import { start } from "repl";

var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export async function createEvent(eventData: EventData) {
  const supabase = createClient();
  const { eventName, start, end, dates } = eventData;
  const formattedStartTime = dayjs(
    `${dayjs(new Date()).format("YYYY-MM-DD")}T${start}`
  )
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss");
  const formattedEndTime = dayjs(
    `${dayjs(new Date()).format("YYYY-MM-DD")}T${end}`
  )
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss");
  const defaultSlotNumCols: number = dates.length;
  const defaultSlotsNumRows: number = calculateTimeSlotBlocks(
    formattedStartTime,
    formattedEndTime
  );
  const defaultSlots: boolean[][] = [];
  for (let i = 0; i < defaultSlotsNumRows; ++i) {
    defaultSlots.push(new Array(defaultSlotNumCols).fill(false));
  }
  // Insert new record to Event table and return value of id column
  const { data, error } = await supabase
    .from("Event")
    .upsert({
      event_name: eventName,
      defaultSlots: defaultSlots,
    })
    .select();

  return { data, error };
}

export async function createDates(eventData: EventData, newEventId: number) {
  const supabase = createClient();
  const { start, end, dates } = eventData;

  const formattedDateTimes = dates.map((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const startDateStr = `${year}-${month}-${day} ${start}`;
    const endDateStr = `${year}-${month}-${day} ${end}`;
    return {
      event_id: newEventId,
      start_datetime: startDateStr,
      end_datetime: endDateStr,
    };
  });

  // Insert new record(s) tagged to the new event in Date table
  const { data, error } = await supabase
    .from("Date")
    .upsert(formattedDateTimes)
    .select();

  return { data, error };
}

export async function prepareToUpdateAvailability(
  previousAvailabilitiesDateTime: AvailabilityDataTimeType[],
  // defaultSlots: boolean[][],
  // dates: DateData[],
  eventId: number
): Promise<
  { user_id: number; commonAvailability: boolean; newDateTime?: string[][] }[]
> {
  // { user_id: number; filteredArray: string[]; newDateTime: string[][] }[]
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Event")
    .select(`defaultSlots, Date (start_datetime, end_datetime)`)
    .eq("id", eventId);
  const defaultSlots: boolean[][] = data?.[0].defaultSlots;
  const dates: DateData[] = data?.[0].Date!;
  const previousAvailabilitiesDateTimeTimeSlots =
    previousAvailabilitiesDateTime.map((avail) => {
      return {
        user_id: avail.user_id,
        availability: avail.timeslots.flat().filter((t) => t !== ""),
        datetime: avail.timeslots,
      };
    });
  const defaultSlotsDateTime: string[][] = defaultSlots.map((row, row_idx) => {
    return row.map((col, col_idx) => {
      const date = dayjs(dates[col_idx].start_datetime);
      const val = dayjs(date)
        .add(30 * row_idx, "minute")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss");
      return val;
    });
  });

  const earliestDate = dates[0].start_datetime;
  const latestDate = dates[dates.length - 1].end_datetime;
  const common = previousAvailabilitiesDateTimeTimeSlots.map((userAvail) => {
    // 1. For every user find the earliest availability
    const earliestUserAvailbilities = userAvail.availability[0];

    // 2. For every user find the latest availability
    const latestUserAvailabilities =
      userAvail.availability[userAvail.availability.length - 1];

    // 3. Find the difference between the latest user availability and the earliest dateslot
    const diffBetweenUserLatestAndTimeSlotEarliest = dayjs(
      latestUserAvailabilities
    ).diff(dayjs(earliestDate), "second");
    // 4. Find the difference between the earliest user availability and the latest dateslot
    const diffBetweenUserEarliestAndTimeSlotLatest = dayjs(
      earliestUserAvailbilities
    ).diff(dayjs(latestDate), "second");

    // Filter out the user availabilities that are within the new date range
    const filteredArray = userAvail.availability.filter((value) =>
      defaultSlotsDateTime.flat().includes(value)
    );

    const newDateTime = [...defaultSlotsDateTime].map((row) =>
      row.map((col) => {
        if (!filteredArray.includes(col)) return "";
        else return col;
      })
    );
    return {
      user_id: userAvail.user_id,
      commonAvailability: true,
      newDateTime: newDateTime,
    };
    // }
    //   return {
    //     user_id: userAvail.user_id,
    //     filteredArray: [],
    //     newDateTime: userAvail.datetime,
    //   };
    // }
    // const newDateTime = [...defaultSlotsDateTime].map((row) =>
    //   row.map((col) => {
    //     if (!filteredArray.includes(col)) return "";
    //     else return col;
    //   })
    // );

    // return {
    //   user_id: userAvail.user_id,
    //   filteredArray: filteredArray,
    //   newDateTime: newDateTime,
    // };
    // }
  });

  return common;
}

export async function updateAvailability(
  userAvailabilityToUpdate: {
    user_id: number;
    commonAvailability: boolean;
    newDateTime?: string[][];
  }[],
  eventId: number
): Promise<void> {
  const supabase = createClient();
  userAvailabilityToUpdate.forEach(async (user) => {
    // if (user.commonAvailability === true) {
    const { data, error } = await supabase
      .from("Availability")
      .update({ timeslots: user.newDateTime })
      .eq("user_id", user.user_id)
      .select();
    // }
  });
}

export async function updateEventAndDates(
  eventData: EventData,
  eventId: number
) {
  const supabase = createClient();
  const { start, end, dates, eventName } = eventData;
  // Refresh all existing records by:

  // 1. Update defaultSlots column in Event table
  const formattedStartTime = dayjs(
    `${dayjs(new Date()).format("YYYY-MM-DD")}T${start}`
  )
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss");
  const formattedEndTime = dayjs(
    `${dayjs(new Date()).format("YYYY-MM-DD")}T${end}`
  )
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss");
  const newDefaultSlotNumCols: number = dates.length;
  const newDefaultSlotsNumRows: number = calculateTimeSlotBlocks(
    formattedStartTime,
    formattedEndTime
  );
  const newDefaultSlots: boolean[][] = [];
  for (let i = 0; i < newDefaultSlotsNumRows; ++i) {
    newDefaultSlots.push(new Array(newDefaultSlotNumCols).fill(false));
  }

  // 2. Update eventName in Event table
  await supabase
    .from("Event")
    .update({ event_name: eventName, defaultSlots: newDefaultSlots })
    .eq("id", eventId)
    .select();

  // 3. Delete all existing associated records in Date table
  await supabase.from("Date").delete().in("event_id", [eventId]);

  // 4. Insert updated values to new records in Date table
  const formattedDateTimes = dates.map((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const startDateStr = `${year}-${month}-${day} ${start}`;
    const endDateStr = `${year}-${month}-${day} ${end}`;
    return {
      event_id: eventId,
      start_datetime: startDateStr,
      end_datetime: endDateStr,
    };
  });

  const { data, error } = await supabase
    .from("Date")
    .upsert(formattedDateTimes)
    .select();

  return { data, error };
}

export async function deleteUserAndAvailabilities(userId: number) {
  const supabase = createClient();

  const response = await supabase
    .from("Availability")
    .delete()
    .in("user_id", [userId]);

  if (response.status === 204) {
    const { data, error } = await supabase
      .from("User")
      .delete()
      .eq("user_id", userId)
      .select();
    return { data, error };
  } else {
    return { data: null, error: response.error };
  }
}

interface User {
  created_at: string;
  email: string | null;
  event_id: number | null;
  name: string;
  updated_at: string;
  user_id: number;
}

// interface Availability {
//   availability_id?: number;
//   created_at?: string;
//   timeslots: boolean[][];
//   updated_at?: string;
//   user_id?: number | null;
// }

export async function createUser(respondentName: string, eventId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("User")
    .insert([{ name: respondentName, event_id: eventId }])
    .select("name, user_id");

  if (error) {
    console.error("Error creating user", error);
    return "";
  }
  return { data };
}

export async function createAvailability(
  timeSlots: string[][],
  userId: number,
  eventId: string
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Availability")
    .insert([{ timeslots: timeSlots, user_id: userId, event_id: eventId }])
    .select("timeslots, user_id, event_id");

  if (error) {
    console.error("Error creating user", error);
    return "";
  }
  return { data };
}

// Mapper functions
export const mapNestedBoolToNestedDateTime = async (
  writeModeBody: boolean[][],
  dates: DateData[]
): Promise<string[][]> => {
  const output = writeModeBody.map((row, row_idx) => {
    return row.map((col, col_idx) => {
      if (col === false) return "";
      else {
        const date = dayjs(dates[col_idx].start_datetime);
        const val = dayjs(date)
          .add(30 * row_idx, "minute")
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss");
        return val;
      }
    });
  });
  return output;
};

export const updateUserAvailability = async (
  userId: number,
  newAvailabilityDateTimeBody: string[][]
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Availability")
    .update({ timeslots: newAvailabilityDateTimeBody })
    .eq("user_id", userId)
    .select();
};

// Map boolean[][] to string[datetime][datetime]
/*
  Applies to: 
    - Add respondent's availability
    - Save respondent's availability to the Supabase `Availability` table
  1. input: boolean[][]
  2. 
*/

// Map string[datetime][datetime] to boolean[][]

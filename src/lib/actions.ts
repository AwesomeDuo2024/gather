"use server";

import { createClient } from "@/app/utils/supabase/server";
import { EventData, CreateUserResponseType } from "@/lib/schema";

export async function createEvent(eventData: EventData) {
  const supabase = createClient();
  const { eventName } = eventData;

  // Insert new record to Event table and return value of id column
  const { data, error } = await supabase
    .from("Event")
    .upsert({
      event_name: eventName,
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

export async function updateEventAndDates(
  eventData: EventData,
  eventId: number
) {
  const supabase = createClient();
  const { start, end, dates, eventName } = eventData;
  // Refresh all existing records by:

  // 1. Update eventName in Event table
  await supabase
    .from("Event")
    .update({ event_name: eventName })
    .eq("id", eventId)
    .select();

  // 2. Delete all existing associated records in Date table
  await supabase.from("Date").delete().in("event_id", [eventId]);

  // 3. Insert updated values to new records in Date table
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
  timeSlots: boolean[][],
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

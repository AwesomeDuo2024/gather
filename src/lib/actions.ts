"use server";

import { createClient } from "@/app/utils/supabase/server";
import { EventData } from "@/lib/schema";

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
      start_datetime: startDateStr.replace(/(\d{2}:\d{2}:\d{2})/, start),
      end_datetime: endDateStr.replace(/(\d{2}:\d{2}:\d{2})/, end),
    };
  });

  // Insert new record(s) tagged to the new event in Date table
  const { data, error } = await supabase
    .from("Date")
    .upsert(formattedDateTimes)
    .select();

  return { data, error };
}

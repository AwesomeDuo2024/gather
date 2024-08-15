import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export const formSchema = z.object({
  eventName: z.string().min(1, {
    message: "Event name required",
  }),
  // Format is HH:MM:SS eg."00:00:00"
  start: z.string().time({ message: "Start time required" }),
  end: z.string().time({ message: "End time required" }),
  dates: z.array(z.date()).nonempty({ message: "Select dates for event" }),
});

export const nameSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),
});

export type EventData = {
  eventName: string;
  start: string;
  end: string;
  dates: Date[];
};

export type DateData = {
  start_datetime: string;
  end_datetime: string;
};

export interface FetchedData {
  event_name: string;
  id: number;
  Date: DateData[];
}

export type CreateUserResponseType = {
  user_id: number;
  name: string;
  email: null | string;
  created_at: string;
  updated_at: string;
  event_id: number;
}[];

export type AvailabilityDataType = {
  user_id: number;
  timeslots: boolean[][];
  availability_id: number;
};

export type IModeContext = {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  effect: string;
  setEffect: Dispatch<SetStateAction<string>>;
};

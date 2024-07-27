import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FetchedData } from "@/lib/schema";

// Import dayjs
var dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TIME_PICKER_OPTIONS = [
  { value: "00:00:00", label: "12 am" },
  { value: "01:00:00", label: "1 am" },
  { value: "02:00:00", label: "2 am" },
  { value: "03:00:00", label: "3 am" },
  { value: "04:00:00", label: "4 am" },
  { value: "05:00:00", label: "5 am" },
  { value: "06:00:00", label: "6 am" },
  { value: "07:00:00", label: "7 am" },
  { value: "08:00:00", label: "8 am" },
  { value: "09:00:00", label: "9 am" },
  { value: "10:00:00", label: "10 am" },
  { value: "11:00:00", label: "11 am" },
  { value: "12:00:00", label: "12 pm" },
  { value: "13:00:00", label: "1 pm" },
  { value: "14:00:00", label: "2 pm" },
  { value: "15:00:00", label: "3 pm" },
  { value: "16:00:00", label: "4 pm" },
  { value: "17:00:00", label: "5 pm" },
  { value: "18:00:00", label: "6 pm" },
  { value: "19:00:00", label: "7 pm" },
  { value: "20:00:00", label: "8 pm" },
  { value: "21:00:00", label: "9 pm" },
  { value: "22:00:00", label: "10 pm" },
  { value: "23:00:00", label: "11 pm" },
];

export const getCurrentEventName = (data: FetchedData[]) =>
  data && data[0]?.event_name;

export const getCurrentEventStartTime = (data: FetchedData[]) =>
  data && data[0]?.Date[0]?.start_datetime.split("T")[1].split("+")[0];

export const getCurrentEventEndTime = (data: FetchedData[]) =>
  data && data[0]?.Date[0]?.end_datetime.split("T")[1].split("+")[0];

export const getCurrentEventDates = (data: FetchedData[]) =>
  (data && data[0]?.Date?.map((date) => date.start_datetime))?.map(
    (dateString) => new Date(dateString)
  ) || [];

/**
 ================= Time Picker =================
 */

export const calculateTimeSlotBlocks = (
  startTime: string,
  endTime: string,
  interval = 30
) => {
  return dayjs(endTime).diff(dayjs(startTime), "minute") / interval;
};

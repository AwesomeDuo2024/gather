import { z } from "zod";

export const formSchema = z.object({
  eventName: z.string().min(1, {
    message: "Event name required",
  }),
  // Format is HH:MM:SS eg."00:00:00"
  start: z.string(),
  end: z.string(),
});

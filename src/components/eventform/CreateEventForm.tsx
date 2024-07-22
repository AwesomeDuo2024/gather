"use client";
// https://www.youtube.com/watch?v=oGq9o2BxlaI

import { Calendar } from "@/components/ui/calendar";
import { formSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TIME_PICKER_OPTIONS } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEvent, createDates } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const CreateEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver links react-hook-form to zod schema
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      start: "",
      end: "",
      dates: [],
    },
  });

  // onSubmit handler that runs only when form is valid
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const newEvent = await createEvent(values);
    // console.log(newEvent);
    const newEventId = newEvent?.data?.[0]?.id;
    const newEventLink = newEvent?.data?.[0]?.event_link;
    const newDates = await createDates(values, newEventId);
    // console.log(newDates);
    router.push(`/${newEventLink}`);
  }

  return (
    <main className="absolute top-20 bg-white border drop-shadow-xl p-10 rounded-lg flex flex-col items-center w-[30rem]">
      <h2 className="text-xl font-medium mb-4">Create Event</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Enter event name..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <h2 className="text-lg self-center mt-2">When&apos;s a good time?</h2>

          <div className="flex justify-between items-start">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIME_PICKER_OPTIONS.map((option) => {
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="mt-2">to</div>

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIME_PICKER_OPTIONS.map((option) => {
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <h2 className="text-lg self-center mt-2">
            Which dates are you looking at?
          </h2>

          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Calendar
                      mode="multiple"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border caret-transparent flex mx-auto"
                      // Disable past dates => pass Matcher prop https://daypicker.dev/next/api/type-aliases/Matcher
                      disabled={{ before: new Date() }}
                      // Set earliest month to current month so users cannot navigate to past months https://daypicker.dev/using-daypicker/navigation#disabling-navigation
                      fromMonth={new Date()}
                      // Set default value of showOutsideDays to false
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {isLoading ? (
            <Button disabled className="w-full mt-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Event...
            </Button>
          ) : (
            <Button type="submit" variant="default" className="w-full mt-4">
              Create Event
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};
export default CreateEventForm;

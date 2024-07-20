"use client";
// https://www.youtube.com/watch?v=oGq9o2BxlaI

import DayPicker from "@/components/eventform/DayPicker";
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

const EventForm = () => {
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver links react-hook-form to zod schema
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      start: "",
      end: "",
    },
  });

  // onSubmit handler that runs only when form is valid
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="absolute top-60 bg-white border drop-shadow-xl p-10 rounded-lg flex flex-col gap-6 items-center">
      <h2 className="text-xl font-medium">Create Event</h2>
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
          <h2 className="text-xl font-medium self-center my-2">
            When&apos;s a good time?
          </h2>
          <div className="flex justify-between items-center">
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
            <div>to</div>
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

          <Button type="submit" variant="default" className="w-full">
            Create Event
          </Button>
        </form>
      </Form>
      <DayPicker />
    </main>
  );
};
export default EventForm;

"use client";

import { Button } from "@/components/ui/button";
import { useState, useContext, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";
import {
  createAvailability,
  createUser,
  deleteUserAndAvailabilities,
} from "@/lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ModeContext } from "@/app/theme-provider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { nameSchema } from "@/lib/schema";
import { z } from "zod";
import { toast } from "./ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";

const Respondents = ({
  updateWriteSlots,
  writeModeBody,
  eventId,
  respondentsData,
}: {
  updateWriteSlots: (newWriteSlots: boolean[][]) => void;
  writeModeBody: boolean[][];
  eventId: string;
  respondentsData: { name: string; user_id: number }[] | null;
}) => {
  console.log("==========Respondents================");

  console.log("writeModeBody", writeModeBody);
  // Returns a alphabeticall sorted list of respondents' names
  const sortedRespondents = respondentsData?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const { mode, setMode, effect, setEffect } = useContext(ModeContext);
  const router = useRouter();

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof nameSchema>) => {
    console.log("onSubmit", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    const createdUser = await createUser(data.name, eventId);
    console.log("createdUser", createdUser);
    if (createdUser != "") {
      const createdAvailability = await createAvailability(
        writeModeBody,
        createdUser.data[0].user_id,
        eventId
      );
      if (createdAvailability != "") {
        console.log("createdAvailability", createdAvailability);

        //1. Refresh current page to allow server component (page.tsx) to fetch updated data from Supabase.
        router.refresh();
        //2. Toggle to read mode (default)
        setMode("read");

        //3. Reset form input field
        form.reset({ name: "" });
        const emptyWriteBody = [];
        for (let i = 0; i < writeModeBody.length; i++) {
          emptyWriteBody.push(new Array(writeModeBody[i].length).fill(false));
        }
        updateWriteSlots(emptyWriteBody);
      }
    }
  };

  return (
    <div className="order-2">
      {mode == "write" && (
        <div className="flex gap-1 my-4">
          {/* Cancel Button*/}
          <Button
            variant="outline"
            key={effect}
            className={`flex-1 text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500`}
            onClick={() => {
              console.log("Clicked add availability");
              setMode("read");
            }}
          >
            Cancel
          </Button>
          {/* <NameDialog /> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="flex-1 text-white bg-green-600 hover:bg-green-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              >
                Save
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[20rem] max-h-[90%] justify-center flex flex-col">
              <DialogHeader>
                <DialogTitle className="mb-2">
                  Enter your name to continue{" "}
                </DialogTitle>
              </DialogHeader>

              {/* =========== Name Form ========== */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6 min-w-[100%] flex flex-col items-end"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState, formState }) =>
                      fieldState.invalid ? (
                        <FormItem className="w-[100%]">
                          <FormControl>
                            <Input
                              className="border-red-500 border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="Eg: Jack, Bobby..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      ) : (
                        <FormItem className="w-[100%] focus:outline-none">
                          <FormControl className="focus:outline-none">
                            <Input
                              className="border-gray-500 border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="Eg: Jack, Bobby..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }
                  />
                  {/* === !Dialog - Custom Close button to clear form content when closing dialog ===*/}
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => form.reset({ name: "" })}
                      >
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      variant="default"
                      className="flex-1 text-white bg-green-600 hover:bg-green-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                    >
                      Continue
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {mode == "read" && (
        <>
          <Button
            key={crypto.randomUUID()}
            className={`my-4 animate-bounce-awhile`}
            onClick={() => {
              console.log("Clicked add availability");
              mode == "read" ? setMode("write") : setMode("read");
            }}
          >
            Add availability
          </Button>
          <p>Respondents:</p>

          {/* === Display Respondents === */}
          {sortedRespondents?.map((respondent) => {
            const { name, user_id: userId } = respondent;
            return (
              <div
                key={userId}
                className="flex items-center py-2 px-4 rounded-md my-2 gap-4 group border "
              >
                <p>{name}</p>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-transparent text-gray-500 hover:bg-blue-100 hover:text-blue-600"
                    onClick={() => console.log("Edit user")}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-transparent text-red-600 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="mb-1">
                          Removing {name}&apos;s availabilities
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-700">
                          Are you sure you wish to remove {name} from the event?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className=" border-transparent hover:bg-gray-200">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            deleteUserAndAvailabilities(userId);
                            // Refresh current page to allow server component (page.tsx) to fetch updated data from Supabase.
                            router.refresh();
                          }}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
export default Respondents;

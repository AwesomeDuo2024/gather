"use client";

import { Button } from "@/components/ui/button";
import { useState, useContext, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";
import {
  createAvailability,
  createUser,
  deleteUserAndAvailabilities,
  mapNestedBoolToNestedDateTime,
  updateUserAvailability,
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
import { DateData, nameSchema } from "@/lib/schema";
import { z } from "zod";
import { toast } from "./ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import AddAvailabilityButton from "./AddAvailabilityButton";
import { Switch } from "./ui/switch";
import { Dispatch, SetStateAction } from "react";

const Respondents = ({
  editModeBodyRef,
  userRef,
  dates,
  updateWriteSlots,
  writeModeBody,
  eventId,
  respondentsData,
  toggleBestTimeslot,
  setToggleBestTimeslot,
}: {
  editModeBodyRef: React.MutableRefObject<boolean[][] | undefined>;
  userRef: React.MutableRefObject<{ userId: number; userName: string }>;
  dates: DateData[];
  updateWriteSlots: (newWriteSlots: boolean[][]) => void;
  writeModeBody: boolean[][];
  eventId: string;
  respondentsData: { name: string; user_id: number }[] | null;
  toggleBestTimeslot: boolean;
  setToggleBestTimeslot: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log("==========Respondents================");

  console.log("writeModeBody", writeModeBody);
  console.log("editModeBodyRef", editModeBodyRef.current);
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
      title: `${data.name}'s availability added`,
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),
    });
    const createdUser = await createUser(data.name, eventId);
    console.log("createdUser", createdUser);
    // 1. When a user is created successfully
    if (createdUser != "") {
      // 2. Insert availability for the created user
      const transformedWriteModeBody = await mapNestedBoolToNestedDateTime(
        writeModeBody,
        dates
      );
      const createdAvailability = await createAvailability(
        transformedWriteModeBody, // transform this to string[datetime][datetime]
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
  const checkDisableToggle = () => {
    return (
      respondentsData?.length === 1 ||
      respondentsData === null ||
      respondentsData?.length === 0
    );
  };

  useEffect(() => {
    if (respondentsData?.length === 1) setToggleBestTimeslot(false), [];
  });

  return (
    <div>
      {mode == "write" && (
        <div className="flex fixed gap-4 bottom-0 left-0 py-4 px-8 flex-row-reverse justify-between w-full bg-green-800 lg:bg-transparent lg:flex-col lg:mt-[72px] lg:p-0 lg:static">
          {/* <NameDialog /> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="text-white bg-green-600 min-w-[8rem] h-12 lg:h-10 hover:bg-green-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              >
                Save
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[28rem] max-h-[90%] justify-center flex flex-col">
              <DialogHeader>
                <DialogTitle className="mb-2">
                  Who&apos;s joining the event?{" "}
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
                  <DialogFooter className="flex flex-col-reverse gap-2 w-full sm:w-auto">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        className="h-12 sm:h-10"
                        variant="secondary"
                        onClick={() => form.reset({ name: "" })}
                      >
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      variant="default"
                      className="text-white bg-green-600 hover:bg-green-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-12 sm:h-10"
                    >
                      Continue
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          {/* Cancel Button*/}
          <Button
            variant="outline"
            key={effect}
            className={`text-red-500 min-w-[8rem] h-12 lg:h-10 lg:border-red-500 hover:bg-red-100 hover:text-red-500`}
            onClick={() => {
              console.log("Clicked add availability");
              setMode("read");

              // (Edit -> Read) Refresh router to forcefully fetch availability data from Supabase and override current data
              router.refresh();

              // (Write -> Read) Override current data with empty data
              const emptyWriteBody = [];
              for (let i = 0; i < writeModeBody.length; i++) {
                emptyWriteBody.push(
                  new Array(writeModeBody[i].length).fill(false)
                );
              }
              updateWriteSlots(emptyWriteBody);
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      {mode == "read" && (
        <>
          <div className="flex justify-between items-center my-4 text-sm md:text-base lg:flex-col lg:items-start lg:gap-4">
            <p className="font-medium">
              Respondents: <span>{sortedRespondents?.length}</span>
            </p>
            <div className="flex items-center lg:mb-2">
              <Switch
                disabled={checkDisableToggle()}
                checked={toggleBestTimeslot}
                onCheckedChange={setToggleBestTimeslot}
              />
              <p
                className={`ml-4 ${
                  checkDisableToggle() ? "text-gray-300" : ""
                }`}
              >
                Best Times
              </p>
            </div>
          </div>
          <div className="w-full bg-white bottom-0 left-0 p-4 lg:my-3 fixed lg:p-0 lg:static">
            <AddAvailabilityButton />
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 lg:block">
            {/* === Display Respondents === */}
            {sortedRespondents?.map((respondent) => {
              const { name, user_id: userId } = respondent;
              return (
                <div
                  key={userId}
                  className="flex justify-between items-center py-1 rounded-md group"
                >
                  <p className="break-words overflow-wrap w-2/4 text-sm md:text-base group-hover:font-semibold">
                    {name}
                  </p>
                  <div className="flex gap-1 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-transparent text-gray-500 hover:bg-blue-100 hover:text-blue-600"
                      onClick={() => {
                        console.log(
                          `You are editing user ${respondent.user_id}`
                        );
                        userRef.current = {
                          userId: respondent.user_id,
                          userName: respondent.name,
                        };

                        setMode("edit");
                      }}
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
                            Are you sure you wish to remove {name} from the
                            event?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-2">
                          <AlertDialogCancel className="border-transparent hover:bg-gray-200">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              deleteUserAndAvailabilities(userId);
                              userRef.current.userId = -1;
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
          </div>
        </>
      )}
      {mode == "edit" && (
        <div className="flex fixed gap-4 bottom-0 left-0 py-4 px-8 flex-row-reverse justify-between w-full bg-green-800 lg:bg-transparent lg:flex-col lg:mt-[72px] lg:p-0 lg:static">
          <h1>Editing availability as {userRef.current.userName}</h1>
          {/* Save Button */}
          <Button
            variant="default"
            className="text-white bg-green-600 min-w-[8rem] h-12 lg:h-10 hover:bg-green-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            onClick={async () => {
              console.log("Saving...");
              setMode("read");
              const transformedEditBody = await mapNestedBoolToNestedDateTime(
                editModeBodyRef.current as boolean[][],
                dates
              );
              updateUserAvailability(
                userRef.current.userId,
                transformedEditBody
              );
              router.refresh();
            }}
          >
            Save
          </Button>

          {/* Cancel Button */}
          <Button
            variant="outline"
            key={effect}
            className={`text-red-500 min-w-[8rem] h-12 lg:h-10 lg:border-red-500 hover:bg-red-100 hover:text-red-500`}
            onClick={() => {
              console.log("Clicked add availability");
              setMode("read");
              userRef.current.userId = -1;
              // (Edit -> Read) Refresh router to forcefully fetch availability data from Supabase and override current data
              router.refresh();

              // (Write -> Read) Override current data with empty data
              const emptyWriteBody = [];
              for (let i = 0; i < writeModeBody.length; i++) {
                emptyWriteBody.push(
                  new Array(writeModeBody[i].length).fill(false)
                );
              }
              updateWriteSlots(emptyWriteBody);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default Respondents;

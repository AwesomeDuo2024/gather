"use client";

import { Button } from "@/components/ui/button";
import { useState, useContext, useEffect } from "react";
import { Pencil, Trash } from "lucide-react";
import { deleteUserAndAvailabilities } from "@/lib/actions";
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

const Respondents = ({
  respondentsData,
}: {
  respondentsData: { name: string; user_id: number }[] | null;
}) => {
  const { mode, setMode, effect, setEffect } = useContext(ModeContext);
  const sortedRespondents = respondentsData?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [currentRespondents, setCurrentRespondents] =
    useState(sortedRespondents);

  useEffect(() => {
    if (mode == "read") {
      console.log("Respondents - effect has changed", effect);
    }
  }, [effect]);
  console.log("Respondents - re-rendering");
  return (
    <>
      <Button
        key={effect}
        className={`my-4 animate-bounce-awhile`}
        onClick={() => {
          console.log("Clicked add availability");
          mode == "read" ? setMode("write") : setMode("read");
        }}
      >
        Add availability
      </Button>
      <p>Respondents:</p>
      {currentRespondents?.map((respondent) => {
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
                        setCurrentRespondents((prev) =>
                          prev!.filter(
                            (respondent) => respondent.user_id !== userId
                          )
                        );
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
  );
};
export default Respondents;

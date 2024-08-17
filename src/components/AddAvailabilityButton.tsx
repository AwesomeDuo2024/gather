import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ModeContext } from "@/app/theme-provider";
import { useEffect, useState } from "react";

const AddAvailabilityButton = () => {
  const { mode, setMode, effect } = useContext(ModeContext);

  return (
    <>
      {mode === "read" && (
        <Button
          key={effect}
          className="lg:mt-0
          animate-pulse-awhile
          w-full h-12 lg:h-10"
          onClick={() => {
            console.log("Clicked add availability");
            mode == "read" ? setMode("write") : setMode("read");
          }}
        >
          Add availability
        </Button>
      )}
    </>
  );
};
export default AddAvailabilityButton;

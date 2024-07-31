"use client";

import { IModeContext } from "@/lib/schema";
import { createContext, useContext, useState } from "react";

export const ModeContext = createContext<IModeContext>({
  mode: "read",
  setMode: () => {},
});

export default function ModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<string>("read");

  console.log("ModeProvider - mode", mode);
  // Default mode = "read" -> Mode that allows interactions with participants, etc.
  // "write" mode -> Mode that allows adding participants' availability, etc.
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

// Export custom hook to expose mode and setMode to child components
// export const useMode = () => useContext(ModeContext);

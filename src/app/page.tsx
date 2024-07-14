import { createClient } from "@/app/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const { data: events } = await supabase.from("Event").select();
  const { data: users } = await supabase.from("User").select();
  const { data: dates } = await supabase.from("Date").select();
  const { data: availabilities } = await supabase.from("Availability").select();
  console.log(events);
  return (
    <>
      <h1>Home page</h1>
      <h2>Records from Supabase Event table:</h2>
      <pre>{JSON.stringify(events, null, 2)}</pre>
      <h2>Records from Supabase User table:</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h2>Records from Supabase Date table:</h2>
      <pre>{JSON.stringify(dates, null, 2)}</pre>
      <h2>Records from Supabase Availability table:</h2>
      <pre>{JSON.stringify(availabilities, null, 2)}</pre>
    </>
  );
}

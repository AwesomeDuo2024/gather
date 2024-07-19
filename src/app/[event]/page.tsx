import Link from "next/link";

const EventPage = ({ params }: { params: { event: string } }) => {
  console.log(params.event);

  return (
    <div>
      <p>Event Page where user indicates availability timeslots</p>
      <p>Event Link: {params.event}</p>
      <Link href="/">
        Return to Home
      </Link>
    </div>
  );
};
export default EventPage;

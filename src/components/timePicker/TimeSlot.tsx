"use client";

const TimeSlot = () => {
  const people = [
    {
      name: "9am",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "10am",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "11am",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "12am",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "1pm",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "2pm",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
  ];

  // const style =

  return (
    <>
      {people.map((item, ind) => (
        // Time
        <div className="bg-gray flex gap-2" key={ind}>
          <div className="bg-yellow-200 flex flex-col w-2/12">
            <div className="bg-gray-200 text-primary-content grid h-10 place-items-end content-start rounded">
              {item.name}
            </div>
          </div>

          {/* // Calendar */}
          <div className="flex flex-col w-2/12 border-solid border border-gray-200 divide-y divide-dashed">
            <div
              onClick={() => {
                console.log(
                  `clicked blocked ${item.name.slice(0, item.name.length - 2)}`
                );
              }}
              className="text-primary-content grid h-10 place-content-center"
            ></div>
            <div
              onClick={() => {
                console.log(
                  `clicked block ${item.name.slice(0, item.name.length - 2)}:30`
                );
              }}
              className="text-accent-content grid h-10 place-content-center"
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TimeSlot;
/*
{

}

*/

/*
[
  {
  user: "Bobby",
  timeslots: {
    {
      "9am": true,
      "9:30am":false,
      "10am": false,
    },
  }
]

"Bobby": {
  {
    "9am": true,
    "9:30am":false,
    "10am": false,
  },
"WR": {
    "9am": true,
    "9:30am":false,
    "10am": false,
  },
}

]


*/

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className=" max-w-[56rem] my-12 flex flex-col items-center container">
      <h2 className="mb-10 font-semibold text-xl lg:text-3xl">Questions? We got you!</h2>
      <Accordion type="multiple" className="w-full flex flex-col gap-6 text-sm lg:text-base">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Gather?</AccordionTrigger>
          <AccordionContent>
            Gather is a simple-to-use scheduling tool that helps small groups of
            3-8 people coordinate their availabilities. Gather is entirely free
            to use and no signups are required!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I use Gather?</AccordionTrigger>
          <AccordionContent>
            Just 3 easy steps!{" "}
            {
              <>
                <br />
                <br />
              </>
            }{" "}
            ✅ Create an event <br />
            ✅ Add your availability <br />✅ Share the event link with your
            friends.
            {
              <>
                <br />
                <br />
              </>
            }{" "}
            That&apos;s it! Gather will automatically find the best time for
            everyone. Common availabilities are displayed using increasingly darker shades of color, indicating a greater number of respondents available for the specific timeslot(s). {" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Where I can provide feedback?</AccordionTrigger>
          <AccordionContent>
            We strongly believe in improving our product through user feedback
            and we value your suggestions. You may reach out to us via [insert
            link to form, email, github etc.].{" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Are there any new features planned?
          </AccordionTrigger>
          <AccordionContent>
            We do have several features in mind for our product roadmap. That
            said, Gather is a passion project and we will strive to work on new
            features where time permits 😊.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default FAQ;

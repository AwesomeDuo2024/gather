import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className=" max-w-[40rem] my-12 container">
      <Accordion type="multiple" className="w-full flex flex-col gap-6">
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Response to Question 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Question 2</AccordionTrigger>
          <AccordionContent>Response to Question 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Question 3</AccordionTrigger>
          <AccordionContent>Response to Question 3</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default FAQ;

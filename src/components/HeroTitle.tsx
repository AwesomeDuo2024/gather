import { FlipWords } from "@/components/ui/flip-words";

const HeroTitle = () => {
  const words = ["simple", "sleek", "modern", "effortless"];

  return (
    <div className="h-[16rem] flex justify-center items-center flex-col lg:-mt-36">
      <div className="text-4xl lg:text-5xl xl:ml-12 mx-auto font-medium text-center text-white">
        Scheduling made
        <br />
        <FlipWords
          words={words}
          className="mt-2 lg:mt-4 text-violet-400"
        />{" "}
        <br />
      <p className="text-gray-400 text-lg text-center mt-8 mb-4 lg:mt-12">
        Create an event and share the link!
      </p>
      </div>
    </div>
  );
};

export default HeroTitle;

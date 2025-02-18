import { Layers, Plus, ArrowRight } from "lucide-react";

const Library = () => {
  return (
    <section className="max-w-[95%] my-0 mx-auto border-amber-50">
      <div className="flex w-full justify-around">
        <div className="flex gap-2">
          <Layers color={"white"} />
          <h2 className="text-white">Your Library</h2>
        </div>
        <div className="flex">
          <Plus color={"white"} />
          <ArrowRight color={"white"} />
        </div>
      </div>
    </section>
  );
};

export default Library;

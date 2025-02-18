import Library from "../Library/Library";
import ResizeableCard from "../ui/ResizeableCard";

const Body = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const leftCardWidth = screenWidth * 0.29;
  const midCardWidth = screenWidth * 0.4;
  const rightCardWidth = screenWidth * 0.29;

  return (
    <main className="flex w-full h-screen">
      <section className="flex gap-2 justify-around">
        <ResizeableCard
          minWidth={screenWidth * 0.2}
          maxWidth={screenWidth * 0.4}
          minHeight={screenHeight}
          maxHeight={screenHeight}
          width={leftCardWidth}
          height={screenHeight}
          className="fixed left-0 top-0"
        >
          <Library />
        </ResizeableCard>

        <div className="flex-1">
          <ResizeableCard
            minWidth={screenWidth * 0.3}
            maxWidth={screenWidth * 0.5}
            minHeight={screenHeight}
            maxHeight={screenHeight}
            width={midCardWidth}
            height={screenHeight}
            className=""
          >
            <div className="bg-[#1a1816] w-full h-full rounded-lg"></div>
          </ResizeableCard>
        </div>

        <ResizeableCard
          minWidth={screenWidth * 0.2}
          maxWidth={screenWidth * 0.4}
          minHeight={screenHeight}
          maxHeight={screenHeight}
          width={rightCardWidth}
          height={screenHeight}
          className="fixed right-0 top-0"
        >
          <div className="bg-[#1a1816] w-full h-full rounded-lg"></div>
        </ResizeableCard>
      </section>
    </main>
  );
};

export default Body;

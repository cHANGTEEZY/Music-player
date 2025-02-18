import { useEffect, useRef } from "react";
import interact from "@interactjs/interactjs";
import { Card } from "@/components/ui/card";

interface ResizableCardProps {
  children: React.ReactNode;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  width?: number;
  height?: number;
  className: string;
}

export default function ResizableCard({
  children,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  width = 300,
  height = 200,
  className,
}: ResizableCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      interact(cardRef.current).resizable({
        edges: { left: true, right: true, top: true, bottom: true },
        listeners: {
          move(event) {
            const { width, height } = event.rect;
            event.target.style.width = `${width}px`;
            event.target.style.height = `${height}px`;
          },
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: minWidth, height: minHeight },
            max: { width: maxWidth, height: maxHeight },
          }),
        ],
      });
    }
  }, [minWidth, maxWidth, minHeight, maxHeight]);

  return (
    <Card
      ref={cardRef}
      style={{ width, height }}
      className={`relative border-[#1a1816] bg-[#1a1816] rounded-lg select-none ${className} relative
      `}
    >
      {children}
      <div className="absolute w-full h-2 top-0 cursor-n-resize bg-transparent" />
      <div className="absolute w-full h-2 bottom-0 cursor-s-resize bg-transparent" />
      <div className="absolute h-full w-2 left-0 cursor-w-resize bg-transparent" />
      <div className="absolute h-full w-2 right-0 cursor-e-resize bg-transparent" />
    </Card>
  );
}

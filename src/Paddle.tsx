import React from "react";
//import useAnimationFrame from "./hooks/useAnimationFrame";

type PaddleProps = {
  width: number;
  height: number;
  owner: "ai" | "player";
};

const Paddle: React.FC<PaddleProps> = ({ height, width, owner }) => {
  const paddleRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (paddleRef.current) {
      const paddle = paddleRef.current;
      paddle.style.height = `${height}px`;
      paddle.style.width = `${width}px`;

      if (owner === "ai") {
        paddle.style.right = `${width}px`;
      } else {
        paddle.style.left = `${width}px`;
      }

      if (owner === "player") {
        document.addEventListener("mousemove", (e) => {
          paddle.style.top = `${e.clientY - height / 2}px`;
        });
      }

      return () => {
        document.removeEventListener("mousemove", (e) => {
          paddle.style.top = `${e.clientY - height / 2}px`;
        });
      };
    }
  }, [height, owner, width]);

  // useAnimationFrame((dt) => {
  //   if (paddleRef.current) {
  //     paddleRef.current.style.top = `calc(${y}px - 5vh)`;
  //   }
  // });

  return (
    <div
      ref={paddleRef}
      style={{
        background: "white",
        position: "absolute",
      }}
    />
  );
};

export default Paddle;

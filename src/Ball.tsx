import React, { useCallback } from "react";
import { IBallState } from "./App";
import { ArenaContext } from "./ArenaContext";
import { GameStateContext } from "./GameStateContext";
import useAnimationFrame from "./hooks/useAnimationFrame";
//import useAnimationFrame from "./hooks/useAnimationFrame";

type BallProps = {
  width: number;
  height: number;
  ballState: IBallState;
  setBallState: React.Dispatch<React.SetStateAction<IBallState>>;
};

const Ball: React.FC<BallProps> = ({
  ballState,
  setBallState,
  height,
  width,
}) => {
  const ballRef = React.useRef<HTMLDivElement>(null);
  const { gameState } = React.useContext(GameStateContext);
  const { arena } = React.useContext(ArenaContext);
  const { ballX, ballY, ballDX, ballDY } = ballState;

  const resetBall = useCallback(() => {
    if (arena?.current)
      setBallState({
        ballX: arena.current.offsetWidth / 2,
        ballY: arena.current.offsetHeight / 2,
        ballDX: Math.random() > 0.5 ? 1 : -1,
        ballDY: Math.random(),
      });
  }, [arena, setBallState]);

  const updateBall = (dt: number) => {
    if (ballState.ballY < 0) {
      setBallState({
        ...ballState,
        ballY: 0,
        ballDY: -ballState.ballDY,
      });
    } else if (
      arena?.current &&
      ballState.ballY > arena.current.offsetHeight - height
    ) {
      setBallState({
        ...ballState,
        ballY: arena.current.offsetHeight - height,
        ballDY: -ballState.ballDY,
      });
    } else {
      setBallState({
        ...ballState,
        ballX: Math.floor(ballState.ballX + ballState.ballDX * dt),
        ballY: Math.floor(ballState.ballY + ballState.ballDY * dt),
      });
    }
  }

  React.useLayoutEffect(() => {
    if (gameState === "ready") {
      window.addEventListener("resize", resetBall);
      resetBall();
    } else {
      window.removeEventListener("resize", resetBall);
    }
    return () => {
      window.removeEventListener("resize", resetBall);
    };
  }, [gameState, resetBall]);

  useAnimationFrame((dt) => {
    if (gameState === "playing") {
      updateBall(dt)
    }
  });

  return (
    <div
      ref={ballRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        right: `${ballX}px`,
        top: `${ballY}px`,
        background: "white",
        position: "absolute",
      }}
    />
  );
};

export default Ball;

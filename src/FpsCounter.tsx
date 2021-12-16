import { useRef, useContext } from "react";
import { GameStateContext } from "./GameStateContext";
import useAnimationFrame from "./hooks/useAnimationFrame";

const FpsCounter = () => {
    
  const fpsCounter = useRef<HTMLDivElement>(null);
  const { gameState } = useContext(GameStateContext);
  useAnimationFrame((dt) => {
    if (fpsCounter.current) {
      fpsCounter.current.innerText = `${Math.floor(1000 / dt)} fps\n\n${gameState}`;
    }
  });

  return (
    <div
      ref={fpsCounter}
      style={{
        userSelect: "none",
        position: "absolute",
        color: "white",
        fontSize: "11px",
        top: "20px",
        left: "60px",
        textAlign: "left",
      }}
    >
      0
    </div>
  );
};
export default FpsCounter;

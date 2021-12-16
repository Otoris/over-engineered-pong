import { useRef, useContext } from "react";
import { ArenaContext } from "./ArenaContext";
import { GameStateContext } from "./GameStateContext";

const Arena: React.FC = ({ children }) => {
  const arenaRef = useRef<HTMLDivElement>(null);
  const { gameState, setGameState } = useContext(GameStateContext);

  const handleAnyClick = () => {
    if (arenaRef.current) {
      if (gameState === "playing") {
        setGameState("ready");
        // setBallState({
        //   ballX: arena.current.offsetWidth / 2,
        //   ballY: arena.current.offsetHeight / 2,
        //   ballDX: Math.random() > 0.5 ? 1 : -1,
        //   ballDY: Math.random(),
        //   // ballSpeed: 0,
        //   // collision: false,
        // });
      } else {
        setGameState("playing");
      }
    }
  };

  return (
    <div
      ref={arenaRef}
      className="App"
      style={{ width: "100vw", height: "100vh" }}
      onClick={() => handleAnyClick()}
    >
      <ArenaContext.Provider
        value={{arena: arenaRef}}
      >
        {children}
      </ArenaContext.Provider>
    </div>
  );
};

export default Arena;

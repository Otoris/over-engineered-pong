import { createContext } from "react";

export const GameStateContext = createContext({ gameState: "ready", setGameState: (value: string) => {} });

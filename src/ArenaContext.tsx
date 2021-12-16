import { createContext, RefObject } from "react";

type ArenaContextType = {
  arena: RefObject<HTMLDivElement> | null;
};
export const ArenaContext = createContext<ArenaContextType>({
  arena: null
});

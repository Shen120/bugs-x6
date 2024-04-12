import {createContext} from "react";
import {GraphCtx} from "../types";

export const GraphContext = createContext<GraphCtx>({
  expandOption: {
    expand: {},
  }
})
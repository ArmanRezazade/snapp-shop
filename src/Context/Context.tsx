import { createContext } from "react";
import { ContextInterface } from "../Interface/Interfaces";

const Context = createContext<ContextInterface>({
  selectedItem: null,
  selectItem: () => {},
  deleteItem: () => {},
  editItem: () => {},
});

export default Context;

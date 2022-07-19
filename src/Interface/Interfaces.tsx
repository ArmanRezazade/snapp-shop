export interface ItemInterface {
  id: number;
  name: string;
}

export interface ContextInterface {
  selectedItem: ItemInterface | null;
  selectItem: (data: ItemInterface) => void;
  deleteItem: (id: number) => void;
  editItem: (data: ItemInterface) => void;
}

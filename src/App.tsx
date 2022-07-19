import React, { useState, useEffect, useRef } from "react";
import Item from "./Item";
import { ItemInterface } from "./Interface/Interfaces";
import Context from "./Context/Context";
import ItemModel from "./Model_Service/ItemModel";

function App() {
  const itemInputRef = useRef<HTMLInputElement>(null);

  const [dataSource, setDataSource] = useState<ItemInterface[]>([]);

  const [selectedItem, setSelectedItem] = useState<ItemInterface | null>(null);

  useEffect(() => {
    getAllItems();

    window.addEventListener("keydown", addItem);

    return () => {
      window.removeEventListener("keydown", addItem);
    };
  }, []);

  const getAllItems = () => {
    ItemModel.getAllItems().then((response: ItemInterface[]) => {
      setDataSource(response);
    });
  };

  const addItem = (event: any) => {
    const Enter_Key_Code = 13;
    if (event.keyCode === Enter_Key_Code && itemInputRef.current?.value) {
      ItemModel.insertItem(
        new ItemModel(new Date().getTime(), itemInputRef.current.value)
      ).then(() => {
        getAllItems();
        if (itemInputRef.current?.value) {
          itemInputRef.current.value = "";
        }
      });
    }
  };

  const editItem = (data: ItemInterface) => {
    if (data.name) {
      ItemModel.editItem(data).then(() => {
        getAllItems();
        setSelectedItem(null);
      });
    }
  };

  const deleteItem = (id: number) => {
    ItemModel.deleteItem(id).then(() => {
      getAllItems();
    });
  };

  return (
    <div className="app">
      <div id="to-do-list-container">
        <input
          id="to-do-list-input"
          placeholder="What needs to be done ?"
          ref={itemInputRef}
        />
        <ul id="to-do-list-items-container">
          <Context.Provider
            value={{
              selectedItem: selectedItem,
              selectItem: (data: ItemInterface) => {
                setSelectedItem(data);
              },
              deleteItem: deleteItem,
              editItem: editItem,
            }}
          >
            {dataSource.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </Context.Provider>
        </ul>
        <div id="to-do-list-actions-container">
          <div id="to-do-list-counter">
            <span className="to-do-list-action">
              {dataSource.length} items left
            </span>
          </div>

          <div id="to-do-list-all">
            <span className="to-do-list-action">All</span>
          </div>

          <div id="to-do-list-active">
            <span className="to-do-list-action">Active</span>
          </div>

          <div id="to-do-list-clear">
            <span className="to-do-list-action">Clear Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

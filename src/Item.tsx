import React, { useState, useContext } from "react";
import { ItemInterface } from "./Interface/Interfaces";
import Context from "./Context/Context";
import ItemModel from "./Model_Service/ItemModel";

function Item(props: { item: ItemInterface }) {
  const [itemNameValue, setItemNameValue] = useState<any>(props.item.name);

  const [showDelete, setShowDelete] = useState<Boolean>(false);

  const { selectedItem, selectItem, editItem, deleteItem } =
    useContext(Context);

  return (
    <li
      className="item-container"
      onDoubleClick={() => {
        selectItem(props.item);
      }}
      onMouseOver={() => {
        if (selectedItem?.id === props.item.id) {
          setShowDelete(false);
        } else {
          setShowDelete(true);
        }
      }}
      onMouseLeave={() => {
        setShowDelete(false);
      }}
    >
      {selectedItem?.id === props.item.id ? (
        <>
          <div className="itemAction">
            <div
              className="tick-mark"
              onClick={() => {
                editItem(new ItemModel(props.item.id, itemNameValue));
              }}
            ></div>
          </div>
          <input
            className="item-input"
            value={itemNameValue}
            onChange={(event) => {
              setItemNameValue(event.target.value);
            }}
          />
        </>
      ) : (
        <div className="item">
          <span>{props.item.name}</span>
        </div>
      )}
      <div
        className="itemAction endAlign"
        style={{ display: showDelete ? "block" : "none" }}
      >
        <div
          className="cross-mark"
          onClick={() => {
            deleteItem(props.item.id);
          }}
        >
          x
        </div>
      </div>
    </li>
  );
}

export default Item;

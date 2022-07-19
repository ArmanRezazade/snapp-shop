import { ItemInterface } from "../Interface/Interfaces";

const Item_Base_Url = "http://localhost:3001/Items/";

export default class ItemModel {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public static async getAllItems(): Promise<ItemInterface[]> {
    return new Promise((resolve, reject) => {
      fetch(Item_Base_Url)
        .then((data) => data.json())
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          reject(new Error(e));
        });
    });
  }

  public static async insertItem(data: ItemInterface): Promise<ItemInterface> {
    return new Promise((resolve, reject) => {
      fetch(Item_Base_Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          reject(new Error(e));
        });
    });
  }

  public static async editItem(data: ItemInterface): Promise<ItemInterface> {
    return new Promise((resolve, reject) => {
      fetch(Item_Base_Url + data.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          reject(new Error(e));
        });
    });
  }

  public static async deleteItem(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(Item_Base_Url + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          reject(new Error(e));
        });
    });
  }
}

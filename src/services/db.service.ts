export default class DBService {
  private storageKey: string;

  constructor(storageKey: string) {
      this.storageKey = storageKey;
  }

  find(): any {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
  }

  create(item: any): void {
      const data = this.find() || [];
      data.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  update(updatedItem: any): void {
      const data = this.find();
      if (data) {
          const index = data.findIndex((item: any) => item.id === updatedItem.id);
          if (index !== -1) {
              data[index] = updatedItem;
              localStorage.setItem(this.storageKey, JSON.stringify(data));
          }
      }
  }

  delete(itemId: any): void {
      const data = this.find();
      if (data) {
          const newData = data.filter((item: any) => item.id !== itemId);
          localStorage.setItem(this.storageKey, JSON.stringify(newData));
      }
  }
}
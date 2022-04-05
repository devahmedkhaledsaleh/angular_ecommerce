import { Injectable } from '@angular/core';
import { IProduct } from '../../models/i-product';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  items: IProduct[] = [];
  compare: any;
  keepGoing: boolean = true;
  constructor() {}

  addToCompare(product: IProduct) {
    if (localStorage.getItem('compare')) {
      this.compare = localStorage.getItem('compare');
      this.items = JSON.parse(this.compare);
      if (!this.items.find((item) => item._id === product._id)) {
        this.items.push(product);
      }
      localStorage.setItem('compare', JSON.stringify(this.items));
    } else {
      this.items = [];
      this.items.push(product);
      localStorage.setItem('compare', JSON.stringify(this.items));
    }
  }

  countCompareNumber() {
    this.compare = localStorage.getItem('compare');
    this.items = JSON.parse(this.compare);
    if (this.items) {
      return this.items.length;
    } else {
      return 0;
    }
  }

  getItems() {
    this.compare = localStorage.getItem('compare');
    this.items = JSON.parse(this.compare);
    return this.items;
  }

  deleteFromCompare(id: string) {
    this.keepGoing = true;
    this.compare = localStorage.getItem('compare');
    this.items = JSON.parse(this.compare);
    this.items.forEach((item, index) => {
      if (this.keepGoing) {
        if (item._id == id) this.items.splice(index, 1);
      }
    });
    localStorage.removeItem('compare');
    localStorage.setItem('compare', JSON.stringify(this.items));
    return this.items;
  }

  clearCompare() {
    localStorage.removeItem('compare');
    this.items = [];
    return this.items;
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor(public http: Http) {
    let items = [
      {
         "name": "Privacy",
         "profilePic": "assets/img/categories/1.png",

       },
       {
         "name": "Encryption",
         "profilePic": "assets/img/categories/2.png",

       },
       {
         "name": "Trust",
         "profilePic": "assets/img/categories/3.png",

       },
       {
         "name": "Freedom of Speech",
         "profilePic": "assets/img/categories/4.png",

       },
       {
         "name": "Intellectual Property",
         "profilePic": "assets/img/categories/5.png",

       },
       {
         "name": "Ethics in Practice",
         "profilePic": "assets/img/categories/6.png",

       },

     ];

     for(let item of items) {
       this.items.push(new Item(item));
     }
  }

  query(params?: any) {
    if(!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for(let key in params) {
        let field = item[key];
        if(typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if(field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}

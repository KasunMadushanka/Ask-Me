import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { PostService } from '../../providers/post-service';

@Component({
    selector: 'page-item-detail',
    templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
    item: any;
    cardItems: any;
    cat:any;

    constructor(public navCtrl: NavController, navParams: NavParams, items: Items,public postService:PostService) {
        this.item = navParams.get('item') || items.defaultItem;
        this.cat=this.item.short;

        this.postService.getcategoryDetails(this.cat).then((result) => {

              console.log("success");
              //this.navCtrl.push(Catdetails,result);
              this.cardItems=result;
          }, (err) => {

              console.log("error");
          });


        //
        // this.cardItems = [
        //     {
        //         user: {
        //             avatar: 'assets/img/users/1.jpg',
        //             name: 'Marty McFly'
        //         },
        //         date: 'March 5, 2017',
        //         image: 'assets/img/posts/privacy/1.jpg',
        //         content: 'While IT security seeks to protect our physical assets—networked computers, databases, servers, etc.—encryption protects the data that lives on and between those assets. It’s one of the most powerful ways to keep your data safe, and while it isn’t impenetrable, it’s a major deterrent to hackers. Even if data does end up getting stolen, it will be unreadable and nearly useless if it’s encrypted.',
        //     },
        //     {
        //         user: {
        //             avatar: 'assets/img/users/2.png',
        //             name: 'Sarah Connor'
        //         },
        //         date: 'March 3, 2017',
        //         image: 'assets/img/posts/privacy/2.jpg',
        //         content: 'If you send an encrypted email, only the person with the encryption key can read it. If you’re using an encrypted internet connection to shop online, your information and credit card number are hidden from unauthorized users, like hackers, illegal surveillance, or identity thieves.'
        //     },
        //     {
        //         user: {
        //             avatar: 'assets/img/users/3.png',
        //             name: 'Dr. Ian Malcolm'
        //         },
        //         date: 'March 2, 2017',
        //         image: 'assets/img/posts/privacy/3.jpg',
        //         content: 'Encryption can be simple, like secret-key, or incredibly complex, like the Advanced Encryption Standard (AES), depending on the algorithm and the length of the key. The longer the key, the more protection, but also the more processing power required to handle the encrypting and decrypting process.'
        //     }
        // ];
    }

}

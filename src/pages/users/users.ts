import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostService } from '../../providers/post-service';
/*
Generated class for the Users page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-users',
    templateUrl: 'users.html'
})
export class UsersPage {

    users:any;

    constructor(public navCtrl: NavController, public navParams: NavParams,public postService:PostService) {
        this.getUsers();
    }

    getUsers(){

        this.postService.getUserDetails().then((result) => {

            this.users=result;
        }, (err) => {

            console.log("error");
        });

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersPage');
    }

}

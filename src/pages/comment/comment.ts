import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostService } from '../../providers/post-service';

/*
  Generated class for the Comment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {
  post_id:any;
  comments:any;
  cmnt:any;
  com:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public postService:PostService) {
    this.post_id=this.navParams.get('postId');
    console.log(this.post_id);

    this.postService.getcommentDetails(this.post_id).then((result) => {

          console.log("comments");
          //this.navCtrl.push(Catdetails,result);
          this.comments=result;
          console.log(this.comments);
      }, (err) => {

          console.log("error");
      });


  }
  //add comment
  addComment(){
    this.com={comment:this.cmnt,postid:this.post_id};
    //console.log(this.waste);
                this.postService.addComment(this.com).then((result) => {
                        this.comments=result;
                      }, (err) => {
                          //this.loading.dismiss();
                          console.log("not allowed");
                      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}

import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController,ViewController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { Camera } from 'ionic-native';
import { PostService } from '../../providers/post-service';
import { TabsPage } from '../tabs/tabs';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';


/*
  Generated class for the ItemCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;

@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;
  category:string;
  description:string;
  post:any;
  posts:any;
  lastImage: string = null;
  loading: Loading;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,private transfer: Transfer,public loadingCtrl: LoadingController, public viewCtrl: ViewController,public platform: Platform,private file: File,private filePath: FilePath, formBuilder: FormBuilder, public postService:PostService) {
    this.form = formBuilder.group({
      profilePic: [''],
      category: [''],
      description: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }


     addpost(){
      this.post={category:this.category,description:this.description,img:this.lastImage};

      //console.log(this.waste);
                  this.postService.createpost(this.post).then((result) => {
                          //  this.loading.dismiss();
                            this.posts = result;
                            //console.log(this.posts);
                            this.navCtrl.setRoot(TabsPage);
                            //console.log("waste created");
                          //  this.showAlert();
                        }, (err) => {
                            //this.loading.dismiss();
                            console.log("not allowed");
                        });

    }

  getPicture() {
    //console.log("ok");
    if (Camera['installed']()) {
        Camera.getPicture({
          targetWidth: 96,
          targetHeight: 96
        }).then((data) => {
          this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' +  data });
          this.lastImage = "data:image/jpeg;base64," + data;


        }, (err) => {
          alert('Unable to take photo');
        })
      } else {

        this.fileInput.nativeElement.click();
      }
  }




  processWebImage(event) {
    console.log("okz");
    let input = this.fileInput.nativeElement;

    var reader = new FileReader();
    reader.onload = (readerEvent) => {
      input.parentNode.removeChild(input);

      var imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */


}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

/*
  Generated class for the PostService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostService {

  //  private  BASE_URI:String="http://askme07.azurewebsites.net/";
    private  BASE_URI:String="http://localhost:8081/";

  constructor(public http: Http, public storage:Storage) {
    console.log('Hello PostService Provider');
  }

  public createpost(post){
      return new Promise((resolve, reject) => {
       this.storage.get('token').then((value) => {

       let id=value;
       post.user=id;
       let data=post;

       this.http.post(this.BASE_URI+'addPost', data)
         .map(res => res.json())
         .subscribe(res => {
           resolve(res);
         }, (err) => {
           reject(err);
         });

     });

   });

  }


  getcategoryDetails(category){

        return new Promise((resolve,reject)=>{


          let data={cat:category}
          this.http.post(this.BASE_URI+'catposts', data)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res);
              //console.log(res);
            }, (err) => {
              reject(err);
            });


      });

      }

}

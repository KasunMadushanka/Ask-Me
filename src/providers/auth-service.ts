import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../pages/login/login';

export class User {

    id:number;
    name: string;

    constructor(id:number,name: string) {
        this.id=id;
        this.name = name;

    }
}

@Injectable()
export class AuthService {

    currentUser: User;
    public tok:any;
   private  BASE_URI:String="http://askme07.azurewebsites.net/";
    // private  BASE_URI:String="http://localhost:8081/";

    constructor(private http: Http,public storage: Storage) {

    }

    public checkAuthentication(){
      //console.log("inside service");
      return new Promise((resolve, reject) => {
           //Load token if exists
           this.storage.get('token').then((value) => {
               this.tok = value;
               console.log(value);
               let link = this.BASE_URI+'checkAuth';
               let data={token:this.tok};

               this.http.post(link,data)
                   .subscribe(res => {
                     //console.log();
                     if(res.json().content=="Success"){
                       resolve(res);
                     }
                       reject(res);
                   }, (err) => {
                       reject(err);
                   });
           });
       });
    }

    public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {

                let link = this.BASE_URI+'login';
                let data={email:credentials.email,password:credentials.password};

                let access=false;

                this.http.post(link, data)
                .subscribe(data => {

                    if (data.json()[0]!='invalid') {
                        access=true;
                        this.storage.set('token',data.json()[0].customer_id);
                        console.log(data.json()[0]);
                        this.currentUser = new User(data.json()[0].con_id,data.json()[0].first_name);
                        observer.next(access);
                        observer.complete();
                    }else{
                        observer.next(access);
                        observer.complete();
                    }

                },
                err => {
                    console.log('we got an error:', err);
                });



            });
        }
    }

    public register(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {

            let link = this.BASE_URI+'signup';
            let data={first_name:credentials.first_name,last_name:credentials.last_name,email:credentials.email,password:credentials.password};

            this.http.post(link, data)
            .subscribe(data => {
                console.log("success");

            },
            err => {
                console.log('we got an error:', err);
            });

            return Observable.create(observer => {
                observer.next(true);
                observer.complete();
            });
        }
    }

    public getUserInfo() : User {
        return this.currentUser;
    }

    public logout() {
      //
      //   this.navCtrl.setRoot(LoginPage);
        return new Promise((resolve, reject) => {
          this.storage.set('token', '345436');
          resolve();
        });



    }

}

import { Injectable } from '@angular/core';
import {Usuario} from '../intefices/usuario'
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from 'src/app/app.component'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string;
  headers : any;
  token : string;


  constructor(
    private storage: Storage,
    private http: HttpClient,
    private appComponent  : AppComponent,
    private router: Router,
  ) {
    this.url = '/api/AuthManagment';
  }


  getLogin(usr : Usuario){

    this.http.post<any>(this.url, usr).subscribe(
      (val) => {
          this.storage.set("user",val)
      },
      response => {
      },
      () => {
          this.appComponent.reload()
      });
  }

}

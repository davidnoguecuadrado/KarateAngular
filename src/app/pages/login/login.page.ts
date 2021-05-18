import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service'


import {Usuario} from '../../intefices/usuario'
import {ToastrService} from 'ngx-toastr'
import {TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class LoginPage implements OnInit {
  private _appComponent : AppComponent;
  public correo : string ="";
  public password : string = "";
  public color : string = "transparent";

  public isValidEmail : boolean = true ;

  constructor(
    private storage: Storage ,
    private appComponent  : AppComponent,
    private router: Router,
    private translate :TranslateService,

    private login : LoginService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {

  }

  emailValid(){
    var regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g ;
    if ( regex.test(this.correo)){
      this.isValidEmail = true;
      this.color = "transparent";
    }
    else{
      this.isValidEmail = false;
      this.color = "red";
    }
  }
  onLogin(){
    var usr : Usuario;
    usr =
    {
      id: 0,
      nombre: "",
      apellido: "",
      correo: this.correo,
      password: this.password
    }
    if(this.isValidEmail && usr.correo !== "" && usr.password !== ""){
      this.login.getLogin(usr);
      setTimeout(() => {
        this.appComponent.reload();
      }, 50);
    }
    else if(!this.isValidEmail){
      this.toastr.error(this.translate.instant("Mail")  , "Error")
    }
    else if(usr.correo === "" || usr.password === ""){
      this.toastr.error(this.translate.instant("ErrorDatosIns")  , "Error")
    }
  }
}

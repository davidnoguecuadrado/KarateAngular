import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../service/register.service'
import {Usuario} from '../../intefices/usuario'
import {ToastrService} from 'ngx-toastr'
import {TranslateService} from '@ngx-translate/core'
import { LoginService } from '../../service/login.service'
import { AppComponent } from 'src/app/app.component'
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  public nombre : string;
  public lastName : string;
  public email : string;
  public password : string;
  public consfirmPassowrd : string;
  public color : string = "transparent";

  public isValidEmail : boolean = true ;

  constructor(
    private storage: Storage,
    private regiser : RegisterService,
    private translate :TranslateService,
    private toastr: ToastrService,
    private login: LoginService,
    private appComponent  : AppComponent
  ) { }

  ngOnInit() {

  }

  clearParams(){
    this.nombre = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.consfirmPassowrd ="";
  }
  register(){
    var usr : Usuario;
    usr =
    {
      id: 0,
      nombre: this.nombre,
      apellido: this.lastName,
      correo: this.email,
      password: this.password,
    }
    if(!this.isValidEmail){
      this.toastr.error(this.translate.instant("Mail")  , "Error")
      this.clearParams()
    }else if(usr.nombre === "" || usr.nombre == undefined || usr.apellido === "" || usr.apellido == undefined || usr.correo === "" ||  usr.correo == undefined ||  usr.password === "" ||  usr.password == undefined){
      this.toastr.error(this.translate.instant("ErrorDatosIns") , "Error")
      this.clearParams()
    }
    else if(this.password.length < 6){
      this.toastr.error(this.translate.instant("PassWordLenght") , "Error")
      this.clearParams()
    }
    else if(this.password != this.consfirmPassowrd){
      this.toastr.error(this.translate.instant("PaswordMatch") , "Error")
      this.clearParams()
    }
    else{
      setTimeout(() => {
        this.regiser.Register(usr);
        setTimeout(() => {
          this.login.getLogin(usr);
          setTimeout(() => {
            this.appComponent.reload();
          }, 50);
        }, 50);
      }, 50);
    }
  }

  emailValid(){
    var regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g ;
    if ( regex.test(this.email)){
      this.isValidEmail = true;
      this.color = "transparent";
    }
    else{
      this.isValidEmail = false;
      this.color = "red";
    }
  }

}

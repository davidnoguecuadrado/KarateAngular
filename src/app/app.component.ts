import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import { Router } from '@angular/router';
import { DeportistaService } from '../app/service/deportista.service'
import { Usuario } from '../app/intefices/usuario'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'warning' }
  ];


  private _storage: Storage | null = null;
  public login : boolean;
  public usuario : Usuario;

  public logi : any ;
  langs : string[] = [] ;

  constructor(
      private storage: Storage,
      private translate :TranslateService,
      private router: Router,
      private deportista : DeportistaService

  ) {
    this.translate.setDefaultLang('esp');
    this.translate.addLangs(['en','esp']);
    this.langs = this.translate.getLangs();

  }

  changeLang(lang : string){
    this.translate.use(lang);
  }

  ngOnInit() {
    this.init();
    this.readLogin();
  }

  public readLogin(){
    this.storage.get("user")
    .then((data)=>{
      if (data != null ){
        if(data.jwt != ""){
          this.usuario = data;
          this.login = true;
        }
      }
      else{
        this.login = false;
      }
    });

  }

public reload(){
    setTimeout(() => {
      this.storage.get("user")
      .then((data)=>{
        if (data != null ){
          if(data.jwt != ""){
            setTimeout(() => {
              this.deportista.GetDeportista(data.jwt,data.id)
              setTimeout(() => {
                this.router.navigate(['/home'])
                window.location.reload();
              }, 80);
            }, 20);
          }
          }
          else{
            this.login = false;
          }
      })
   }, 50);
}

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
}

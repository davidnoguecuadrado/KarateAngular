import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeportistaService {


  url:string;
  token : string;
  headers : HttpHeaders = new HttpHeaders();
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router
  ) {

  }

  GetDeportista(jwt: string,id : number){

    console.log("SE EJECUTA")
    this.Cargar(jwt,id);

  }
  Cargar(jwt: string,id : number){
      this.http.get<any>("/api/Deportista/"+ id,{ headers: new HttpHeaders({'Authorization': 'Bearer '+ jwt})}).subscribe(
        (val) => {
          this.storage.set("deportista",val)
      },
        response => {

        },
        () => {
        });
  }
}


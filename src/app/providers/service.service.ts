import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private URL: string = 'https://animedataset2-default-rtdb.firebaseio.com/Collection.json';

  constructor(private http:HttpClient) { 
    
  }
  
   //Método con la petición HTTP
   getResponse() {
    return this.http.get(this.URL);
  }

}

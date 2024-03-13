import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.apiUrl);
  }

saveUserdata(data:object){
  console.log(data);
  return this.http.post(this.apiUrl,data);
}
  
    
  }

 

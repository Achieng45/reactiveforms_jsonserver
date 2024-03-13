import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  api="http://localhost:3000/users";

  constructor(private http:HttpClient) {

   }
   getEmployees(){
    return this.http.get(this.api);
   }
   createUser(data:object){
    return this.http.post(this.api,data);
   }
   updateEmployee(id:number,data:object){
    return this.http.put(this.api + '/' + id,data);
   }
   deleteEmployee(id:object){
    return this.http.delete(this.api + '/' + id);
  }
 
}

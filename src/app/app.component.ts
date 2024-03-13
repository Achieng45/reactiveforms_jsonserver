import { CommonModule } from '@angular/common';
import {  HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


import { RouterOutlet } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { FormServiceService } from './form-service.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NgbModule,
  
    ReactiveFormsModule,
    
    HttpClientModule,
    CommonModule,
    FormsModule
    
  ],
  providers:[],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})

export class AppComponent {
//   getUser: any;
//   myForm !:FormGroup

  
  
//   constructor(private dataService: FormServiceService) {
//     this.dataService.getUsers().subscribe((data)=>{
//       this.getUser= data;
//    }
//     )
//   this.myForm = new FormGroup({
//     name:new FormControl(null),
//     email:new FormControl(null)
//   });

//   }
// submit(){
//   console.log(this.myForm.value)
//   this.dataService.saveUserdata(this.myForm.value).subscribe((result)=> 
//   console.log("Post was successful",result))
// }
  
  
  

}


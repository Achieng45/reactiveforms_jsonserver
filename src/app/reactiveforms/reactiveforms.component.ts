import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormServiceService } from '../form-service.service';

import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reactiveforms',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './reactiveforms.component.html',
  styleUrl: './reactiveforms.component.css'
})
export class ReactiveformsComponent {
  getUser: any;
  myForm:FormGroup;

  constructor(private dataService: FormServiceService) {
    this.dataService.getUsers().subscribe((data)=>{
      this.getUser=data
   }
    )

  
    this.myForm = new FormGroup({
      name:new FormControl(''),
      email:new FormControl(''),
    });
  }

  SaveData(){
    this.dataService.saveUserdata(this.myForm.value).subscribe((result)=>console.log("post was successful",result)
    ) 
    this.myForm.reset
  }
  // );
  // }
  
}
  
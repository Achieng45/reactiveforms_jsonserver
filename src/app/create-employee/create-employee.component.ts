import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { ModalDismissReasons,NgbActiveModal,NgbDatepickerModule, NgbModal, NgbModalRef, NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { response } from 'express';
import { error } from 'console';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,NgbModule,NgxPaginationModule,ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  employeeForm!: FormGroup;

 




  newEmployee: any = {
     firstname: '',
    lastname: '',
    email: ''
  };
  selectedEmployee: any = {
    firstname: '',
    lastname: '',
    email: ''
  };

 employees:any[]=[];
 
 employeeData={
  firstname:this.newEmployee.firstname,
  lastname:this.newEmployee.lastname,
  email:this.newEmployee.email
 };
 
 isAddingEmployee:boolean=false;
 modalRef!: NgbModalRef;

 currentPage=1;
 itemsPerPage=2;
 totalItems=5;
 active=1;
 page=1;
 action:string='add';
 
 closeResult = '';
  content!: TemplateRef<any>;
updateEmployeeModal!: TemplateRef<any>;
deleteEmployeeModal!: TemplateRef<any>;
  firstnameCtrl: any;
  emailCtrl: any;
  lastnameCtrl: any;


 // myform:FormGroup;

  constructor(  private modalService: NgbModal,private employeeservice: EmployeeServiceService  , private fb: FormBuilder ){

  

    

  }
  ngOnInit() {
    this.FetchEmployees();
  
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.firstnameCtrl = this.employeeForm.get('firstname');
    this.lastnameCtrl = this.employeeForm.get('lastname');
    this.emailCtrl = this.employeeForm.get('email');


  }

  get f() {
    return this.employeeForm.controls;
  }


  // handleEmployee(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   const value = target.value;
  
  //   if (this.action === 'add') {
  //     this.newEmployee.firstname = value;
  //   } else {
  //     this.selectedEmployee.firstname = value;
  //   }
  // }



 

  FetchEmployees(){
    
   
    this.employeeservice.getEmployees().subscribe((data:any)=>{
    this.employees=data;
    
      
      
    },
    (error: any)=>{
      console.error("error fetching",error);
    }
    ); 
  }
  onPageChange(page:number){
    this.currentPage=page;
    this.FetchEmployees();

  }






  AddEmployee(){
   

    this.employeeservice.createUser(this.employeeForm.value).subscribe((response)=>{
      
      this.employees.push(response);
      this.employeeForm.reset();
      
      
      this.modalRef.close();
      this.totalItems++;
    
    },
    (error) => {
      console.error("Error adding employee:", error);
    }
    );
  }

 openAddEmployeeModal(AddorupdateEmployeeModal:TemplateRef<any>){
  this.isAddingEmployee = true;
   this.selectedEmployee={}
   this.employeeForm.reset();
   this.action='add'
  this.modalRef=this.modalService.open(AddorupdateEmployeeModal,{ariaLabelledBy:'modal-basic-title'});
 }
  
    employeeDetails(arg0: any) {
    throw new Error('Method not implemented.');
    }

    openViewEmployeeModal(viewEmployeeModal: TemplateRef<any>, employee: any) {
      this.selectedEmployee = { ...employee }; // Make a copy of the selected employee
      this.modalService.open(viewEmployeeModal, { ariaLabelledBy: 'modal-basic-title' });
    }









    DeleteEmployee() {
      
      this.employeeservice.deleteEmployee(this.selectedEmployee.id).subscribe((response)=>{
        this.employees=this.employees.filter((employee: { id: any; })=>employee.id!==this.selectedEmployee.id);
        this.modalRef.close();
      },
      (error)=>{
        console.log("error deleting employee:",error);
      }

      );
    
    }



    openDeleteEmployeeModal(deleteEmployeeModal: TemplateRef<any>, employee: any) {
      this.isAddingEmployee = false;
      this.selectedEmployee = { ...employee }; // Make a copy of the selected employee
      this.action='add';
      this.modalService.open(deleteEmployeeModal, { ariaLabelledBy: 'modal-basic-title' });
      
    }



    Updateemployee() {
      this.employeeservice.updateEmployee(this.selectedEmployee.id,this.employeeForm.value).subscribe((response)=>{
        console.log('Employee updated successfully:', response);
        const index = this.employees.findIndex((emp:any) => emp.id === this.selectedEmployee.id);
        if (index !== -1) {
          this.employees[index] = response; 
        }
        this.modalRef.close();

      }
);
   
    }


    openUpdateEmployeeModal(AddorupdateEmployeeModal: TemplateRef<any>, employee: any) {
      this.isAddingEmployee = false;
      this.selectedEmployee = { ...employee }; 
      this.action='update'

      this.employeeForm.patchValue({
        firstname: this.selectedEmployee.firstname,
        lastname: this.selectedEmployee.lastname,
        email: this.selectedEmployee.email
      });









       this.modalService.open(AddorupdateEmployeeModal, { ariaLabelledBy: 'modal-basic-title' });
      
    }
   
 

	

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}


	 }


    }

  



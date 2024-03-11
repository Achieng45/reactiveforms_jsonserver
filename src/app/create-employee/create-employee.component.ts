import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ɵInternalFormsSharedModule } from '@angular/forms';
import { ModalDismissReasons,NgbActiveModal,NgbDatepickerModule, NgbModal, NgbModalRef, NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { response } from 'express';
import { error } from 'console';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,NgbModule,NgxPaginationModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {

 employees:any
 newEmployee:any={}
 selectedEmployee:any={}
 isAddingEmployee:boolean=false;
 modalRef!: NgbModalRef;

 currentPage=1;
 itemsPerPage=2;
 totalItems=5;
 active=1;
 
 closeResult = '';
  content!: TemplateRef<any>;
updateEmployeeModal!: TemplateRef<any>;
deleteEmployeeModal!: TemplateRef<any>;
page: any;

 // myform:FormGroup;

  constructor( private modalService: NgbModal,private employeeservice: EmployeeServiceService){

  }
  ngOnInit() {
    this.FetchEmployees();

  }
 

  FetchEmployees(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
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
    this.employeeservice.createUser(this.newEmployee).subscribe((response)=>{
      this.employees.push(response)
      this.newEmployee={};
      this.modalRef.close();
      this.isAddingEmployee=false;
    });
  }
 toggleAddEmployeeForm(){
  this.isAddingEmployee=!this.isAddingEmployee;
  if(!this.isAddingEmployee){
    this.newEmployee={}
  }

 }
 openAddEmployeeModal(AddEmployeeModal:TemplateRef<any>){
  this.newEmployee={}
  this.modalRef=this.modalService.open(AddEmployeeModal,{ariaLabelledBy:'modal-basic-title'});
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
        console.log("error deletng employee:",error);
      }

      );
    
    }



    openDeleteEmployeeModal(deleteEmployeeModal: TemplateRef<any>, employee: any) {
      this.selectedEmployee = { ...employee }; // Make a copy of the selected employee
      this.modalService.open(deleteEmployeeModal, { ariaLabelledBy: 'modal-basic-title' });
      
    }



    Updateemployee() {
      this.employeeservice.updateEmployee(this.selectedEmployee.id,this.selectedEmployee).subscribe((response)=>{
        console.log('Employee updated successfully:', response);
        const index = this.employees.findIndex((emp:any) => emp.id === this.selectedEmployee.id);
        if (index !== -1) {
          this.employees[index] = response; 
        }
        this.modalRef.close();

      }
);
   
    }

    openUpdateEmployeeModal(updateEmployeeModal: TemplateRef<any>, employee: any) {
      this.selectedEmployee = { ...employee }; 
       this.modalService.open(updateEmployeeModal, { ariaLabelledBy: 'modal-basic-title' });
      
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

  



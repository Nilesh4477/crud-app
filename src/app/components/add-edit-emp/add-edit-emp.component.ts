
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss']
})
export class AddEditEmpComponent implements OnInit{
  empForm:FormGroup;
  educations: String[]=[
    "BE",
    "BCA",
    "MCA",
    "BSC"
]
constructor(private _fb:FormBuilder,private empSevice:EmployeeService,private _dialogRef:MatDialogRef<AddEditEmpComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _coreService:CoreService){
  this.empForm=this._fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:''
  })
}

ngOnInit(): void {
  this.empForm.patchValue(this.data)
}
postData(){
  if(this.empForm.valid){
    // console.log(this.empForm.value);
    if(this.data){
      this.empSevice.editEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any)=>{
          this._coreService.openSnackBar("Data updated")
          this._dialogRef.close(true)
        },
        error:(err)=>{
          console.log(err); 
        }
    })
    }else{
      this.empSevice.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          this._coreService.openSnackBar("Data added successfully")
          this._dialogRef.close(true)
        },
        error:(err)=>{
          console.log(err); 
        }
    })
    }
  }
}
}

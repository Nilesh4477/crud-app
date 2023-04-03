import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddEditEmpComponent } from './components/add-edit-emp/add-edit-emp.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'experience', 'package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private empService: EmployeeService,private _coreService:CoreService) { }

  ngOnInit(): void {
    this.getEmployeeDetails()
  }

  addEditEmployeeForm() {
   const _dialogRef= this._dialog.open(AddEditEmpComponent)
   _dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeeDetails()
      }
    }
   })
  }


  getEmployeeDetails() {
    this.empService.getEmployeeList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: () => console.log()

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteData(id:any){
    this.empService.deleteEmployeeData(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar("Employee Deleted","Done")
        this.getEmployeeDetails()
      },
      error:()=>{
          console.log();          
      }
    })
  }


  openEditForm(data:any) {
   const dialogRef=this._dialog.open(AddEditEmpComponent,{
    data,
   })
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeeDetails()
      }
    }
   })
    
   }

}

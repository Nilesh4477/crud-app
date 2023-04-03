import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }
  addEmployee(data:any){
    return this._http.post("http://localhost:3000/employees",data)
  }
  getEmployeeList(){
    return this._http.get("http://localhost:3000/employees")
  }
  deleteEmployeeData(id:any){
    return this._http.delete(`http://localhost:3000/employees/${id}`)
  }

  editEmployee(id:any,data:any){
    return this._http.patch(`http://localhost:3000/employees/${id}`,data)
  }
}

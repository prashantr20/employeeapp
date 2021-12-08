import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employee: EmployeeService) { }

  employeeList:any
  searchText:any= ""
  model:any={}
 

  addEmployee(formdata:any){
    console.log(formdata)
  let id=this.employeeList.length+1
  let newlist:any={id:id,name:this.model.employeeName,email:this.model.employeeEmail,phone:this.model.employeePhoneNo}
  this.employeeList=[...this.employeeList,newlist]
  alert("added sucessfully") 
    
  }
  editEmployeeList(id:any){
    let [data] = this.employeeList.filter((current:any)=>{
      return current.id == id
    })
    this.model.employeeName = data.name
    this.model.employeeEmail = data.email
    this.model.employeePhoneNo = data.phone
    this.model.listid = data.id
    console.log(data)
  }
  editData(){
    let id = this.model.listid
    let name = this.model.employeeName
    let email = this.model.employeeEmail
    let phone = this.model.employeePhoneNo
    console.log(id)
     let newlist = this.employeeList.map((current:any)=>
     current.id == id ? {...current,name:name,email:email,phone:phone} : current
     
    )
    this.employeeList = newlist
  }

  deleteEmployeeList(id:any){
    let newEmployeelist= this.employeeList.filter((employeeList:any)=>{
      return employeeList.id != id
    })
    console.log(this.employeeList)
    this.employeeList=newEmployeelist
    alert("deleted sucessfully")
  }

  ngOnInit(): void {
    this.employee.getList().subscribe((result)=>{
      console.log(result)
    this.employeeList=result   
  });
  this.employee.deleteEmployeeList().subscribe((result)=>{
    console.log("deleted",result)
    this.employeeList=result
  })

  }

}

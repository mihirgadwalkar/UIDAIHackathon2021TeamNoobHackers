import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AadhaarService } from '../aadhaar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:AadhaarService,private router:Router) { }

  ngOnInit(): void {
  
  }

  onUpdate(ref:any){
    let obj=ref;
    this.us.createUser(obj).subscribe(
      res=>{
        if(res.message==="New user created successfully"){
          alert("User Address created")
          //navigate to login component
          this.router.navigateByUrl("/update")

        }
        else{
          alert(res.message)
        }
    },
    err=>{
      console.log(err)
      alert("Something went wrong! Please try again!")
    })
  }


}
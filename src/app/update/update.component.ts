import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AadhaarService } from '../aadhaar.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private us:AadhaarService,private router:Router) { }

  ngOnInit(): void {
  }
  ans:any;
  onChange(ref:any){
    let obj=ref;
    console.log(obj.Aadhaar)
    this.us.getUser(obj.Aadhaar).subscribe(
      res=>{
        this.ans=res['message']
        console.log(this.ans)
        if(this.ans==="User does not exist! Please Register yourself for AADHAAR"){
          alert(this.ans)
        }
         
    },
    err=>{
      console.log(err)
      alert("Something went wrong. Please try again!")
    })
  }

}

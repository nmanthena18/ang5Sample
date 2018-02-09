import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  form:FormGroup;
  isErrors :any = {};
  constructor() { 

    this.form = new FormGroup({
      first: new FormControl('', Validators.required),
      pnumber: new FormControl('', [Validators.required ]),
      address: new FormControl('', [Validators.required, Validators.minLength(20)]),
    });
  }

  ngOnInit() {
    console.log(this.form)
  }

  // shippingForm(){
  //   for(let v in this.form.value){
  //     if(this.form.value[v] == "") {
  //       this.isErrors[v] = false;
  //     }
  //     console.log(this.isErrors, v)
  //     this.isErrors[v] = true;
  //     console.log(this.isErrors, v)
  //   }
  // }
}

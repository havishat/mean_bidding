import { Component, OnInit } from '@angular/core';
import { TasksService } from './../tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginobject = {
    name: '',
  }
  updatedlogin;
  constructor(private _taskService: TasksService, private _router: Router) { }

 
  ngOnInit() {
    this._taskService.retrieveid((a) => {
      this.updatedlogin = a;
      // this._router.navigateByUrl('/bids');
      console.log("id",this.updatedlogin._id)  
    }) 
  }

  onSubmit() {
    this._taskService.createNote(this.loginobject, (hi) => {
      this._taskService.retrieveid((a) => {
        console.log("will this work??")
        this.updatedlogin = a;
        this._taskService.session = a
        this._router.navigateByUrl('/bids');
        console.log("login",this.updatedlogin) 
        console.log("id",this._taskService.session._id)  
      })  
      })

  }

}

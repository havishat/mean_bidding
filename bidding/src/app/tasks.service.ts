import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'; // <— Imported
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

  constructor(private _http: Http) { }

  session;
  products = [
    'MacBook',
    'Porsche 911',
    'Gold Watch',
  ];

  bids = [{
      amount:0,
      product:'',
      _userName: '',
    }]

    oneQuestion;
    allUsers;

  // dashboad logout 
  logout() {
    return this._http.get('/login/logout')
    .map((response: Response) => response.json())
    .toPromise();
}

// login page created
  createNote(user, callback) {
    console.log("in taskserv",user)
    return this._http.post('/login', user).subscribe(
      (response) => {
        console.log("login sent to response", response);
        this.session = response
        callback()
      },
      (error) => {
        console.log("could not login", error);
      }
    );
  }

//get the user names 
  retrieveid(callback) {
    this._http.get('/login/one').subscribe(
      (response) => {
        callback(response.json());      
      },
      (error) => {
        console.log("could not retrive all data", error)
      }
    );
  }

//create bids
  createBids(bid, callback){
    console.log('at service, question',bid)
    this._http.post('/Bids', bid).subscribe(
      (response) => {  
        console.log("created bid", response)
        callback()
      },
      (error) => {
        console.log("could not create bid", error)
      }
    );
  }

//display all bids
  displayBids(callback) {
    this._http.get('/Bids').subscribe(
      (response) => {
        callback(response.json());      
      },
      (error) => {
        console.log("could not display bids", error)
      }
    );
  }

  deleteAllBids(){
    return this._http.delete('/deleteAllBids')
      .map((response: Response) => response.json())
      .toPromise();
  }

}



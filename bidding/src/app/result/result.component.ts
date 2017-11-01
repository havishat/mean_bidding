import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService} from '../tasks.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private user: TasksService, private _router: Router) { }

  session = this.user.session.creator
  private products;
  private winner1;
  private winner2;
  private winner3;

  ngOnInit() {
    this.products = this.user.products
    if(this.user.session == null){
      this._router.navigateByUrl('/')
    }

    this.user.displayBids((data) => {
      this.getHighestBids(data)
    });
  }


  getHighestBids(data){
    console.log('all bids at resulst',data)
    var user1=data[0];
    var user2=data[0];
    var user3=data[0];
    for(let i of data){
      if(Number(i.product1.amount) > Number(user1.product1.amount)){
        user1 = i
        console.log('max1',user1)
      }
      if(Number(i.product2.amount) > Number(user2.product2.amount)){
        user2 = i
        console.log('max2',user2)
      }
      if(Number(i.product3.amount) > Number(user3.product3.amount)){
        user3 = i
        console.log('max3',user3)
      }
    }
    this.winner1 = user1
    this.winner2 = user2
    this.winner3 = user3

    console.log('winner1',this.winner1)
    console.log('winner2',this.winner2)
  }

startBid() {
   this.user.deleteAllBids()
    .then(data => {
      this._router.navigateByUrl('/bids')
    })
    .catch(err => console.log(err));
}

logout() {
  this.user.logout()
  .then(data => this._router.navigateByUrl('/'))
  .catch(err => console.warn(err));
}

}
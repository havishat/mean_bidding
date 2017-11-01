import { Component, OnInit } from '@angular/core';
import { TasksService} from '../tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  constructor(private user: TasksService, private _router: Router) { }

  private name;

  session = this.user.session
  private products;
  private winner1;
  private winner2;
  private winner3;

  product = {
    product1: { amount: Number, product:'MacBook'},
    product2: { amount: Number, product:'Watch'},
    product3: { amount: Number, product:'Car' },
    creator: '',
  }
  private allBids;

  ngOnInit() {
    
    this.products = this.user.products;
    if(this.user.session == null){
      this._router.navigateByUrl('/')
    }
    this.retrieveid();
    this.user.displayBids((data) => {
      // console.log("data",data)
      this.allBids = data
      this.getHighestBids(data)
    });
  }

  logout() {
    this.user.logout()
    .then(data => this._router.navigateByUrl('/'))
    .catch(err => console.warn(err));
  }

  bidding() {
    this.product.creator = this.user.session.name;
    console.log("in bidding", this.product.product1.amount)
    this.user.createBids(this.product, () => {
      this.user.displayBids((data) => {
        // console.log("data",data)
        this.allBids = data
        this.getHighestBids(data)
        console.log("all bids", this.allBids)
      });
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

  retrieveid() {
    this.user.retrieveid((data) => {
    this.name = data.name;
    })
  }

  endBid() {
    this._router.navigateByUrl('/result');
  }

}

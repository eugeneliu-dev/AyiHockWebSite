import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderGet } from 'src/app/model/order-model';
import { OrderUtilsService } from 'src/app/service/order-utils.service';

@Component({
  selector: 'app-user-orderlist',
  templateUrl: './user-orderlist.component.html',
  styleUrls: ['./user-orderlist.component.css']
})
export class UserOrderlistComponent implements OnInit {

  receivedOrderList!: Observable<OrderGet[]>;

  constructor(private orderUtils: OrderUtilsService ) { }

  ngOnInit(): void {
    this.receivedOrderList = this.orderUtils.getReceivedOrderList();
  }

  getStatusName(status: number): string {
    switch (status)
    {
      case 1:
        return "待確認";
      case 2:
        return "處理中";
      case 3:
        return "已完成";
      default:
        return "無法讀取.."
    }
  }

}

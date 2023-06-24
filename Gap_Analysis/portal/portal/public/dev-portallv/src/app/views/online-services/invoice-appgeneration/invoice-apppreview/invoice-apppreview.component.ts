import { Component, OnInit } from '@angular/core';
import { InvoiceAppgenerationComponent } from '../invoice-appgeneration.component';

@Component({
  selector: 'app-invoice-apppreview',
  templateUrl: './invoice-apppreview.component.html',
  styleUrls: ['./invoice-apppreview.component.css']
})
export class InvoiceApppreviewComponent extends InvoiceAppgenerationComponent implements OnInit {

  ngOnInit() {
      this.funcLoadApplicationInvDetails();
  }

}

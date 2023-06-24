import { ChangeDetectorRef, Component, OnInit, NgModule } from '@angular/core';
import { ConfigurationsService } from '../../../services/shared/configurations.service';
import persons from './data-table-demo1-data';
import { Subject } from 'rxjs';
import { Http } from '@angular/http';
import { data } from 'jquery';
@Component({
  selector: 'app-prohibited-products',
  templateUrl: './prohibited-products.component.html',
  styleUrls: ['./prohibited-products.component.css']
})

export class ProhibitedProductsComponent implements OnInit {
  items: any = []
  persons: any = persons;
  title:string= "Prohibitted Products/Withdrawn Products"
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  
  
 
  constructor(private http: Http, private cdr: ChangeDetectorRef, private configService: ConfigurationsService) {

  }
  ngOnInit() {

    



  }
  
  funcEditDetails(record_id){
    console.log(record_id);
  }
  private extractData(res: Response) {
    const body = res.json();
    //return body.data || {};
  }

}

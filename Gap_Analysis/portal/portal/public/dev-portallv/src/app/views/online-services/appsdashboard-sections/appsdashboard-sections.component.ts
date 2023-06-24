import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appsdashboard-sections',
  templateUrl: './appsdashboard-sections.component.html',
  styleUrls: ['./appsdashboard-sections.component.css']
})
export class AppsdashboardSectionsComponent implements OnInit {
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
 
  @Input() isPreviewApplicationProcessing: boolean = false;
  @Input() productApplicationProcessingData: any;
  @Input() printReportTitle: string;
  @Input() isPrintReportVisible: boolean = false;
  @Input() isApplicationRejectionVisible: boolean = false;
  @Input() applicationRejectionData: any;
  @Input() isPreviewProductsDetails: boolean = false;
 
  @Input() frmPreviewProductsDetails: FormGroup;
 
  constructor() { }

  ngOnInit() {
  }

}

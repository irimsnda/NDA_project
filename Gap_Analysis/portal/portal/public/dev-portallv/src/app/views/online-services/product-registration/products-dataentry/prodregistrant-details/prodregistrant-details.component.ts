import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';

@Component({
  selector: 'app-prodregistrant-details',
  templateUrl: './prodregistrant-details.component.html',
  styleUrls: ['./prodregistrant-details.component.css']
})
export class ProdregistrantDetailsComponent   implements OnInit {
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() trader_title: string;
  
  @Input() localagent_optionDisabled: boolean;
  @Input() isRegistrantDetailsWinshow: boolean;

  
  @Input() traderAccountsDetailsData: any;
  @Input() registrantOptionsData: any;
  @Input() confirmDataParam: any;

  
  @Input() applicationApplicantdetailsfrm: FormGroup;
  
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public modalDialogue: ModalDialogService, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ProductApplicationService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {
  
    console.log(this.localagent_optionDisabled);

  }
  ngOnInit() {

  }

}

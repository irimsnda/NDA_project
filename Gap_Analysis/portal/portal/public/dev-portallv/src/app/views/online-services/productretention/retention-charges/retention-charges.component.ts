import { Component, OnInit, Renderer, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { RetentionSharedclassComponent } from '../retention-sharedclass/retention-sharedclass.component';

@Component({
  selector: 'app-retention-charges',
  templateUrl: './retention-charges.component.html',
  styleUrls: ['./retention-charges.component.css']
})
export class RetentionChargesComponent extends RetentionSharedclassComponent implements OnInit {


  ngOnInit() {

    this.OnloadProductRetetentionDetails({});

  }
 
}

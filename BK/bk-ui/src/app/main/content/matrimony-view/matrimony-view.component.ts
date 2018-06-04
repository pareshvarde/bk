import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { bkAuthService } from '../../services/auth-service';
import { bkDataService } from '../../services/bk-data.service';

@Component({
  selector: 'app-matrimony-view',
  templateUrl: './matrimony-view.component.html',
  styleUrls: ['./matrimony-view.component.scss']
})
export class MatrimonyViewComponent implements OnInit {

  memberId: number;
  model: any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public authService: bkAuthService) {
      this.route.params.subscribe(params => {
        
        if (params.memberId > 0)
          this.memberId = params.memberId;
        else
          this.memberId = null;          

        if (this.memberId > 0)
          this.loadMatrimony();
      });    
  }

  ngOnInit() {
  }

  loadMatrimony(){
    return this.dataService.getViewOnlyMatrimony(this.memberId).subscribe(
      (res) => {
        this.model = res.result;        
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }
}

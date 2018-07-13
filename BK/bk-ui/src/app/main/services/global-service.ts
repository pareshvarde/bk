import { Injectable, OnDestroy } from '@angular/core';
import { bkDataService } from './bk-data.service';
import { bkAuthService } from './auth-service';
import { ReplaySubject, Observable, Observer } from 'rxjs';
import { debug } from 'util';

@Injectable()
export class GlobalService implements OnDestroy {
    public avatarUrl: string;
    private avatarLoaded: boolean = false;    
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private dataService: bkDataService) {
        this.resetAvatar();        
    }

    public alertOptions ={
        overlay: true,
        overlayClickToClose: true,
        showCloseButton: false,
        confirmText: 'OK',
        declineText: 'No'
    }

    setAvatarUrl() {        

        if (this.avatarLoaded){            
            return;
        }

        this.dataService.profilePhoto().takeUntil(this.destroyed$).subscribe(
            (res) => {
                this.avatarUrl = res.result;                
                this.avatarLoaded = true;                
            },
            (err) => {
                this.avatarUrl = null;
            }
        );        
    }
    
    resetAvatar(){        
        this.avatarUrl = "assets/images/avatars/profile.jpg";
        this.avatarLoaded = false;
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
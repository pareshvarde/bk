import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { fuseAnimations } from '../../animations';
import { CATEGORIES_DATA } from '../../../main/data/categories';
import { NUKHS_LOOKUP_DATA } from '../../../main/data/nukhsLookup';
import { MemberSearchParameter } from '../../../main/models/memberSearchParameter';


@Component({
    selector   : 'matrimony-search-options',
    templateUrl: './matrimony-search-options.component.html',
    styleUrls  : ['./matrimony-search-options.component.scss'],
    animations : fuseAnimations
})
export class MatrimonySearchOptionsComponent implements OnInit
{
    @ViewChild('openButton') openButton;
    @ViewChild('panel') panel;
    @ViewChild('overlay') overlay: ElementRef;

    searchParameter: MemberSearchParameter;
    @Output() performSearch = new EventEmitter<MemberSearchParameter>();
    @Output() clearSearch = new EventEmitter<MemberSearchParameter>();
    readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
    readonly CATEGORIES_DATA_LOCAL = CATEGORIES_DATA;
    
    public player: AnimationPlayer;

    @HostBinding('class.bar-closed') barClosed: boolean;

    constructor(
        private animationBuilder: AnimationBuilder,        
        private renderer: Renderer2
    )
    {
        this.barClosed = true;         
        this.searchParameter = new MemberSearchParameter(); 
    }

    ngOnInit()
    {
        this.renderer.listen(this.overlay.nativeElement, 'click', () => {
            this.closeBar();
        });
    }

    closeBar()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({transform: 'translate3d(0,0,0)'}),
                    animate('400ms ease', style({transform: 'translate3d(100%,0,0)'}))
                ]).create(this.panel.nativeElement);

        this.player.play();

        this.player.onDone(() => {
            this.barClosed = true;
        });
    }

    openBar()
    {
        this.barClosed = false;

        this.player =
            this.animationBuilder
                .build([
                    style({transform: 'translate3d(100%,0,0)'}),
                    animate('400ms ease', style({transform: 'translate3d(0,0,0)'}))
                ]).create(this.panel.nativeElement);

        this.player.play();
    }

    search(){        
        this.performSearch.emit(this.searchParameter);
    }

    clear(){
        this.searchParameter = new MemberSearchParameter();        
        this.clearSearch.emit(this.searchParameter);
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nb-spinner',
    template: `
    <div class="spinner-wrapper">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>`,
    styles: [`
    .spinner-wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 998;
    }
    `]
})
export class NbSpinnerComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}
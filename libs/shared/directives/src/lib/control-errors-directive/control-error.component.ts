import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";

@Component({
    template: `<small class="form-text text-danger" [class.hide]="_hide">{{_text}}</small>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        small {
            margin-top: -1px;
            padding-top: 0;
        }
    `]
})
export class ControlErrorComponent {
    _text: string;
    _hide = true;

    @Input() set text(value) {
        if (value !== this._text) {
            this._text = value;
            this._hide = !value;
            this.cdr.detectChanges();
        }
    };

    constructor(private cdr: ChangeDetectorRef) { }

}
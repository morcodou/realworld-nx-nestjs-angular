import { NgModule } from "@angular/core";
import { SharedCommonModule } from "@realworld/shared/common";
import { AuthContainerComponent } from "./auth-container.component";

@NgModule({
    imports: [SharedCommonModule],
    declarations: [AuthContainerComponent],
    exports: [AuthContainerComponent],
})
export class AuthContainerModule {

}
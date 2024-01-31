import { FormGroup } from "@angular/forms";

export class TestForm{
    id : string = "";
    type : string = "";
    label : string = "";
    placeholder : string = "";
    description? : string = "";
    choices? : any;
    required? : boolean;
    extends? : boolean;
    extended? : boolean;
    errorMessage : string = "";
    error : boolean = false;
    picked? : boolean = false;
    formGroup: FormGroup = new FormGroup({});
}

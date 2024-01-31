import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestForm } from './models/testForm';
import { FormService } from './services/formService.service';
import { Subscription, elementAt } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  formGroup : FormGroup = new FormGroup({});
  formElementArray : TestForm[] = [];
  answer: string = "";
  disabled: boolean = true;
  formSubsription: Subscription;

  constructor(private FormService: FormService ){
    this.formGroup.valueChanges.subscribe(data => {
      this.disabled = this.isDisabled();
    })
  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.formSubsription = this.FormService.getForm().subscribe((data) => {
      data.forEach(item => {
        this.formElementArray.push({
          id: item.id,
          type: item.type,
          label: item.label,
          placeholder: item.placeholder,
          errorMessage: item.errorMessage,
          error : false,
          required: item.required ? item.required : undefined,
          description: item.description ? item.description : "",
          choices: item.choices ? item.choices : null,
          extends: item.extends ? item.extends : undefined,
          formGroup: this.formGroup,
        });
        if(item.type === 'select-box'){
          this.formGroup.addControl(item.id, new FormControl(`${item.choices[0]}`,[Validators.required]))
        }
        else{
          this.formGroup.addControl(item.id, new FormControl('',[Validators.required]))
        }
      })
    })
    
  }

  onAdd = (item: any) => {
    let index = this.formElementArray.findIndex(element => element.id === item.id)
    this.formElementArray.splice(index+1, 0, {
      id: `${item.id}+`,
      type: item.type,
      label: '',
      placeholder: item.placeholder,
      errorMessage: item.errorMessage,
      error : false,
      required: item.required ? item.required : undefined,
      description: item.description ? item.description : "",
      choices: item.choices ? item.choices : null,
      extends: item.extends ? item.extends : undefined,
      extended: true,
      formGroup: this.formGroup,
    });
    this.formGroup.addControl(`${item.id}+`, new FormControl('',[Validators.required]))
    console.log(this.formElementArray)
  }

  onDelete = (item: any) => {
    let index = this.formElementArray.findIndex(element => element.id === item.id);
    this.formElementArray.splice(index,1);
  }

  onFormSubmit() : void{
    const item :{[key:string]:string} = {};
    this.formElementArray.forEach(element=>{
        if(element.type === "check-box-group"){
          let picked = element.choices.filter((item : any) => item.picked === true).map((item : any) => item.label)
          item[element.id] = picked.join(', ');
        }
        else{
          item[element.id] =this.formGroup.get(element.id)?.value;
        }
    });
    this.answer = JSON.stringify(item);
    this.FormService.postAnswer(this.answer)
    this.formElementArray.splice(0, this.formElementArray.length);
    this.formGroup.reset();
    this.initForm();
  }

  isDisabled(){
    let required: any = [];
    this.formElementArray.forEach((element: any) => {
      if(element.required === true){
        required.push(this.formGroup.get(element.id)?.valid)
      }
    })
    let disabled = !required.every((el: any) => el === true)
    return disabled;
  }

  changeNumberUp = (element: any) => {
    let id = element.id;
    let value = this.formGroup.get(id)?.value;
    this.formGroup.patchValue({age: +value + 1});
  }

  changeNumberDown = (element: any) => {
    let id = element.id;
    let value = this.formGroup.get(id)?.value;
    this.formGroup.patchValue({age: value - 1});
  }


}
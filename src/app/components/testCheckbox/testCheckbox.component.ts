import { Component, Input, OnInit} from '@angular/core';
import { TestForm } from '../../models/testForm';

@Component({
  selector: 'app-testCheckbox',
  templateUrl: './testCheckbox.component.html',
  styleUrls: ['./testCheckbox.component.scss']
})
export class TestCheckboxComponent implements OnInit {

  @Input() testForm: TestForm = new TestForm();

  choices: any = [];

  ngOnInit(): void {
    this.testForm.choices.forEach((item: any) => {
      this.choices.push(item)
    })
  }

  onClick(item: any){
    if(item.id === 'select-all-skills'){
      item.picked = !item.picked;
      if(item.picked){
        this.choices.forEach((item: any) => {
          if(item.id !== 'select-all-skills'){
            item.picked = true;
          }
        })
      }
    }
    else{
      item.picked = !item.picked;
    }
  }

}

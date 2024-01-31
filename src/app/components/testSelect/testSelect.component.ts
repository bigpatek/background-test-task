import { Component, Input, OnInit } from '@angular/core';
import { TestForm } from '../../models/testForm';

@Component({
  selector: 'app-testSelect',
  templateUrl: './testSelect.component.html',
  styleUrls: ['./testSelect.component.scss']
})
export class TestSelectComponent implements OnInit {

  constructor() { }

  @Input() testForm: TestForm = new TestForm();

  choices: any = [];
  selected: string;
  

  ngOnInit(): void {
    this.testForm.choices.forEach((item: any) => {
      this.choices.push(item)
    })
    this.selected = this.choices[0];
  }

  onClick(event: any){
    this.selected = event.target.value;
    console.log(this.selected)
  }

  log(item: any){
    console.log(item)
  }

}


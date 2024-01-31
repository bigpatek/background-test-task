import { Component, Input, OnInit} from '@angular/core';
import { TestForm } from '../../models/testForm';

@Component({
  selector: 'app-testInput',
  templateUrl: './testInput.component.html',
  styleUrls: ['./testInput.component.scss']
})
export class TestInputComponent implements OnInit {

  @Input() testForm: TestForm = new TestForm();
  @Input() onAdd: any;
  @Input() onDelete: any;
  @Input() formElementArray: any;

  hasExtended: boolean = false;

  ngOnInit(): void {
    this.formElementArray.forEach((element: any) => {
      if(element.extended){
        this.hasExtended = true;
      }
    })
  }

}

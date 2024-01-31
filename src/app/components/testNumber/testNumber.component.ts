import { Component, Input} from '@angular/core';
import { TestForm } from '../../models/testForm';

@Component({
  selector: 'app-testNumber',
  templateUrl: './testNumber.component.html',
  styleUrls: ['./testNumber.component.scss']
})
export class TestNumberComponent{

  @Input() testForm: TestForm = new TestForm();
  @Input() changeNumberUp: any;
  @Input() changeNumberDown: any;

  
}

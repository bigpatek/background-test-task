import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestForm } from '../models/testForm';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  urlForm: string = "http://localhost:3000/form";
  urlAnswer: string = "http://localhost:3000/answer"

constructor(private http: HttpClient) { }

  getForm(){
    return this.http.get<TestForm[]>(this.urlForm);
  }

  postAnswer(answer: any){
    return this.http.post(this.urlAnswer, answer).subscribe((data : any) => {
      console.log(data)
    } );
  }

}

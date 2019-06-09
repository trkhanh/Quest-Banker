import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() quest;
  constructor() {
    console.log('QuestionComponent !');
   }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-question-underline',
  templateUrl: './question-underline.component.html',
  styleUrls: ['./question-underline.component.scss']
})
export class QuestionUnderlineComponent implements OnInit {
  @Input() quest;
  @Input() index;
  questionToUnderline: Array<any>;
  constructor() { }

  ngOnInit() {
    this.render();
  }

  render(){
    let r =[];
    r= this.quest['quest'].split('/');
    let last =  r.pop();
    // const questionMark= last.split('').pop();
    let sp = last.split('').pop();
    r.push(this.removeAllSpeacialChars(last));
    r.push(sp);
    r =  _.filter(r, (o) => {
      console.log('questionToUnderline o=',o);
      return !_.isNil(o) && o!='' && o!=' ';
    })

    // let lastWordDot = r[r.length-2] + '.';
    // r = _.dropRight(r, 2);
    // r.push(lastWordDot)
    this.questionToUnderline =r; 
    console.log('questionToUnderline',this.questionToUnderline);


  }

  removeAllSpeacialChars(str){
    let newString = str.replace(/[^A-Z0-9]/ig, "");
    return newString;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import utf8 from 'utf8';
import _ from "lodash";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('myPond', { static: false }) myPond: any;

   _fPath = "";
   _content: JSON;
  constructor() { }

  ngOnInit() {
  }

  private decode(d): JSON {
    return JSON.parse(utf8.decode(JSON.stringify(d)));
  }

  groupByTypeOfQuestion(d): JSON {
    const type = 'Dạng câu hỏi';
    return _.groupBy(d, type);
  }

  mixRandomQuestionByType(d): JSON {
    const t = this;
    const data : Object = d;
    const limitOfQuestionByType = 3;
    const result : Object = {}

    Object.keys(data).forEach(key=>{
      let value = data[key];
      result[key] = t.getRandom(value,limitOfQuestionByType);
    })
    
    return JSON.parse(JSON.stringify(result));
  }

  getRandom(bucket, numbers) : Array<object> {
    let i = 0;
    let r = [];
    while (i < numbers) {
      let thing = bucket[Math.floor(Math.random() * bucket.length)];
      r.push(thing);
      i++
    }
    return r;
  }

  onUpload(event: { type: string, data: any }) {
    const t = this;
    if (event.type === 'success') {
      const decodeResult = this.decode(event.data);
      const groupResult = t.groupByTypeOfQuestion(decodeResult);
      console.log('BEFORE randomzieQuestionResult',groupResult)
      const randomzieQuestionResult = t.mixRandomQuestionByType(groupResult);
      console.log('AFTER randomzieQuestionResult',randomzieQuestionResult)
      t._content = randomzieQuestionResult;
      console.log('t.content', t._content);
    } else {
      console.log(event.data); // error
    }
  }


}

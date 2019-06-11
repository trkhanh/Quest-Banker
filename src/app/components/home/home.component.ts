import { Component, OnInit, ViewChild } from '@angular/core';
import utf8 from 'utf8';
import _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('myPond', { static: false }) myPond: any;

  _fPath = '';
  _content: JSON;
  file: any;
  constructor() {}

  ngOnInit() {}

  private decode(d): JSON {
    return JSON.parse(utf8.decode(JSON.stringify(d)));
  }

  groupByTypeOfQuestion(d): JSON {
    const type = 'Dạng câu hỏi';
    return _.groupBy(d, type);
  }

  mixRandomQuestionByType(d): JSON {
    const t = this;
    const data: Object = d;
    const limitOfQuestionByType = 3;
    const result: Object = {};

    Object.keys(data).forEach(key => {
      result[key] = t.getRandom(data[key], limitOfQuestionByType);
    });

    return JSON.parse(JSON.stringify(result));
  }

  getRandom(bucket, numbers): Array<object> {
    let i = 0;
    const r = [];
    while (i < numbers) {
      r.push(bucket[Math.floor(Math.random() * bucket.length)]);
      i++;
    }
    return r;
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    this.uploadDocument(this.file);
  }

  uploadDocument(file) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.fileHandler(fileReader.result);
    };
    fileReader.readAsText(this.file);
  }

  fileHandler(fileContent) {
    const t = this;
    const jsonF = t.csvJSON(fileContent);
    const groupResult = t.groupByTypeOfQuestion(jsonF);
    console.log('BEFORE randomzieQuestionResult', groupResult);
    const randomzieQuestionResult = t.mixRandomQuestionByType(groupResult);
    console.log('AFTER randomzieQuestionResult', randomzieQuestionResult);
    t._content = randomzieQuestionResult;
    console.log('t.content', t._content);
  }

  onUpload(event: { type: string; data: any }) {
    const t = this;
    if (event.type === 'success') {
      const decodeResult = this.decode(event.data);
      const groupResult = t.groupByTypeOfQuestion(decodeResult);
      console.log('BEFORE randomzieQuestionResult', groupResult);
      const randomzieQuestionResult = t.mixRandomQuestionByType(groupResult);
      console.log('AFTER randomzieQuestionResult', randomzieQuestionResult);
      t._content = randomzieQuestionResult;
      console.log('t.content', t._content);
    } else {
      console.log(event.data); // error
    }
  }

  csvJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);

    }
    // return result; //JavaScript object
    return result;
  }
}

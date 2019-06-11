import { Component, OnInit, ViewChild } from '@angular/core';
import utf8 from 'utf8';
import _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  _fPath = '';
  content: any = {
    'l1':[],
    'l2':[]
  }

  limitOfQuestionByType:number;
  
  file: any;
  constructor() { }

  ngOnInit() { }
  
  private decode(d): JSON {
    return JSON.parse(utf8.decode(JSON.stringify(d)));
  }

  groupByTypeOfQuestion(d): JSON {
    const type = 'typeQ';
    return _.groupBy(d, type);
  }

  mixRandomQuestionByType(d): JSON {
    const t = this;
    const data: Object = d;
    const result: Object = {};

    Object.keys(data).forEach(key => {
      result[key] = t.getRandom(data[key], this.limitOfQuestionByType);
    });

    return JSON.parse(JSON.stringify(result));
  }

  onClick(e:Event){
    console.log(this.file);
    this.fileChanged(this.file);
    console.log(e);
    console.log('content',this.content)
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
    console.log('setFile',this.file);
    this.uploadDocument(this.file);
  }

  render(){

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
    t.content = randomzieQuestionResult;
    console.log('t.content', t.content);
  }

  onUpload(event: { type: string; data: any }) {
    const t = this;
    if (event.type === 'success') {
      const decodeResult = this.decode(event.data);
      const groupResult = t.groupByTypeOfQuestion(decodeResult);
      console.log('BEFORE randomzieQuestionResult', groupResult);
      const randomzieQuestionResult = t.mixRandomQuestionByType(groupResult);
      console.log('AFTER randomzieQuestionResult', randomzieQuestionResult);
      t.content = randomzieQuestionResult;
      console.log('t.content', t.content);
    } else {
      console.log(event.data); // error
    }
  }

  csvJSON_l = csv => {
    const [firstLine, ...lines] = csv.split('\n');
    const keys = firstLine.split(',');
    return lines.map(line => ((values) =>
      keys.reduce(
        (curr, next, index) => ({
          ...curr,
          [next]: values[index],
        }),
        {}
      )
    )(line.split(',')));
  };

  questionModel(_no, _question, _a, _b, _c, _d, _typeQ) {
    return {
      no: _no,
      quest: _question,
      a: _a,
      b: _b,
      c: _c,
      d: _d,
      typeQ: _typeQ
    }
  };

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
      let keys = Object.keys(obj);
      if (obj[keys[0]] &&
        obj[keys[1]] &&
        obj[keys[2]] &&
        obj[keys[3]] &&
        obj[keys[4]] &&
        obj[keys[5]] &&
        obj[keys[8]]) {
        result.push(this.questionModel(
          obj[keys[0]],
          obj[keys[1]],
          obj[keys[2]],
          obj[keys[3]],
          obj[keys[4]],
          obj[keys[5]],
          obj[keys[8]],
        ));
      }

    }
    // return result; //JavaScript object
    return result;
  }
}

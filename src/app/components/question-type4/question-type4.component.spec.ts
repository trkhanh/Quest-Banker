import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionType4Component } from './question-type4.component';

describe('QuestionType4Component', () => {
  let component: QuestionType4Component;
  let fixture: ComponentFixture<QuestionType4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionType4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionType4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

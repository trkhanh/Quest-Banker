import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUnderlineComponent } from './question-underline.component';

describe('QuestionUnderlineComponent', () => {
  let component: QuestionUnderlineComponent;
  let fixture: ComponentFixture<QuestionUnderlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionUnderlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionUnderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

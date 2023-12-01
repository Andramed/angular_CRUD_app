import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAuthComponent } from './form-auth.component';

describe('FormAuthComponent', () => {
  let component: FormAuthComponent;
  let fixture: ComponentFixture<FormAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAuthComponent]
    });
    fixture = TestBed.createComponent(FormAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWindowAddManagerComponent } from './dialog-window-add-manager.component';

describe('DialogWindowAddManagerComponent', () => {
  let component: DialogWindowAddManagerComponent;
  let fixture: ComponentFixture<DialogWindowAddManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogWindowAddManagerComponent]
    });
    fixture = TestBed.createComponent(DialogWindowAddManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

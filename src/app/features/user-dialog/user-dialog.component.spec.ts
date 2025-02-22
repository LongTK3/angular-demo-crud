import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialog } from './user-dialog.component';

describe('UserDialog', () => {
  let component: UserDialog;
  let fixture: ComponentFixture<UserDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDialog]
    });
    fixture = TestBed.createComponent(UserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

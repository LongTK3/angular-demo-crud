import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDialog } from './edit-user-dialog.component';

describe('EditUserDialog', () => {
  let component: EditUserDialog;
  let fixture: ComponentFixture<EditUserDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserDialog]
    });
    fixture = TestBed.createComponent(EditUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

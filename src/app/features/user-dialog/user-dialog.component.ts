import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.services';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialog {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [this.data.user.firstName || '', Validators.required],
      lastName: [this.data.user.lastName || '', Validators.required],
      email: [this.data.user.email || '', [Validators.required, Validators.email]],
      phoneNumber: [this.data.user.phoneNumber || '', Validators.required],
      zipCode: [this.data.user.zipCode || '', Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.services';
import { User } from '../../core/models/user-model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialog {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-ZÀ-ỹ ]+$")]
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-ZÀ-ỹ ]+$")]
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      phoneNumber: [
        '',
        [Validators.pattern("^(\\+\\d{1,3}[- ]?)?\\d{10}$")]
      ],
      zipCode: [
        '',
        [Validators.pattern("^[0-9]{5,6}$")]
      ]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const user: User = { id: this.data.user.id || 0, ...this.userForm.value };
    this.apiService.updateUser(user.id, user).subscribe(() => this.dialogRef.close(true));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

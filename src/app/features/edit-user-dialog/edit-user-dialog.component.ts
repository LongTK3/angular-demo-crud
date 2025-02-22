import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.services';
import { User } from '../../core/models/user-model';
import { DialogData } from '../../core/interface/dialog-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [this.data.user.firstName, [Validators.required, Validators.pattern("^[a-zA-ZÀ-ỹ ]+$")]],
      lastName: [this.data.user.lastName, [Validators.required, Validators.pattern("^[a-zA-ZÀ-ỹ ]+$")]],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      phoneNumber: [this.data.user.phoneNumber, [Validators.pattern("^(\\+\\d{1,3}[- ]?)?\\d{10}$")]],
      zipCode: [this.data.user.zipCode, [Validators.pattern("^[0-9]{5,6}$")]]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const user: User = { id: this.data.user.id, ...this.userForm.value };

    this.apiService.updateUser(user.id, user).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error updating user:', err)
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}


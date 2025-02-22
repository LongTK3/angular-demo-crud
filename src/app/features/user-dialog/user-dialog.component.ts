import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.services';
import { DialogData } from '../../core/interface/dialog-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    const user = this.data?.user || { firstName: '', lastName: '', email: '', phoneNumber: '', zipCode: '' };

    this.userForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      phoneNumber: [user.phoneNumber, Validators.required],
      zipCode: [user.zipCode, Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

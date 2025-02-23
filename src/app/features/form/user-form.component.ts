import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.services';
import { User } from 'src/app/core/models/user-model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
    userForm!: FormGroup;
    private userSubscription: Subscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private router: Router
    ) { }

    ngOnInit() {
        console.log("AAAAAAAAAAAA, ", this.userForm);

        this.userForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ỹ\s]+$/)]],
            lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ỹ\s]+$/)]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.pattern(/^\d{10,15}$/)]],
            zipCode: ['', [Validators.pattern(/^\d{5,10}$/)]]
        });
    }

    onSubmit() {
        if (this.userForm.invalid) {
            console.log("XXXXXXXXXXX, ", this.userForm);

            return;
        }
        console.log("YYYYYYYYYYYYYY, ", this.userForm);

        const user: User = { id: 0, ...this.userForm.value };

        this.userSubscription.add(
            this.apiService.createUser(user).subscribe({
                next: () => {
                    this.router.navigate(['/users']);
                },
                error: (err) => {
                    console.error('Error creating user:', err);
                }
            })
        );
    }

    cancel() {
        this.router.navigate(['/users']);
    }

    ngOnDestroy() {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.services';
import { User } from 'src/app/core/models/user-model';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    userForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private router: Router
    ) { }

    ngOnInit() {
        this.userForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ỹ\s]+$/)]],
            lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ỹ\s]+$/)]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.pattern(/^\d{10,15}$/)]],
            zipCode: ['', [Validators.pattern(/^\d{5,10}$/)]]
        });
    }

    onSubmit() {
        if (this.userForm.invalid) return;

        const user: User = { id: 0, ...this.userForm.value };

        this.apiService.createUser(user).subscribe(() => {
            this.router.navigate(['/users']);
        });
    }

    cancel() {
        this.router.navigate(['/users']);
    }
}

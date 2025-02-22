import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../../core/models/user-model';
import { ApiService } from 'src/app/core/services/api.services';
import { UserFormComponent } from '../form/user-form.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { EditUserDialog } from '../edit-user-dialog/edit-user-dialog.component';
import { UserDialog } from '../user-dialog/user-dialog.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    animations: [
        trigger('transitionMessages', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-out', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class UserListComponent implements OnInit {
    displayedColumns: string[] = ['lastName', 'firstName', 'email', 'phoneNumber', 'zipCode', 'actions'];
    dataSource = new MatTableDataSource<User>([]);
    loading = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private apiService: ApiService, private dialog: MatDialog, private router: Router) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.loading = true;
        this.apiService.getUsers().subscribe({
            next: (users) => {
                this.dataSource.data = users;
                setTimeout(() => {
                    if (this.paginator) this.dataSource.paginator = this.paginator;
                    if (this.sort) this.dataSource.sort = this.sort;
                });
                this.loading = false;
            },
            error: (err) => {
                console.error('Loading error:', err);
                this.loading = false;
            }
        });
    }

    openDialog(user: User | null, mode: String) {
        if (mode === 'add') {
            this.router.navigate(['/users/new']);
        } else if (mode === 'edit') {
            const dialogRef = this.dialog.open(EditUserDialog, {
                width: '400px',
                height: '100%',
                panelClass: 'edit-custom-modal',
                hasBackdrop: true,
                data: {
                    user: user,
                    mode: mode
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) this.loadUsers();
            });
        } else if (mode === 'details') {
            const dialogRef = this.dialog.open(UserDialog, {
                width: '400px',
                height: '100%',
                panelClass: 'details-modal',
                hasBackdrop: true,
                data: {
                    user: user,
                    mode: mode
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) this.loadUsers();
            });
        }

    }


    deleteUser(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.apiService.deleteUser(id).subscribe({
                next: () => this.loadUsers(),
                error: (err) => console.error('Delete error:', err)
            });
        }
    }
}

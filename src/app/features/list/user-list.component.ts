import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../../core/models/user-model';
import { ApiService } from 'src/app/core/services/api.services';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { Subscription } from 'rxjs';
import { DIALOG_SIZES } from 'src/app/core/interface/dialog-size';
import { UserDialogMode } from 'src/app/core/interface/dialog-mode';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class UserListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'zipCode', 'actions'];
    dataSource = new MatTableDataSource<User>([]);
    loading = true;
    private subscriptions: Subscription = new Subscription();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private apiService: ApiService, private dialog: MatDialog, private router: Router) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.loading = true;
        this.subscriptions.add(
            this.apiService.getUsers().subscribe({
                next: (users) => {
                    this.dataSource.data = users;
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.loading = false;
                },
                error: (err) => {
                    console.error('Loading error:', err);
                    this.loading = false;
                }
            })
        );
    }

    openDialog(user: User | null, mode: UserDialogMode) {
        let dialogWidth = DIALOG_SIZES.small;
        if (mode === 'add') {
            this.router.navigate(['users/add-user']);
        } else if (mode === 'edit') {
            const dialogRef = this.dialog.open(EditUserDialogComponent, {
                width: dialogWidth,
                height: '100%',
                panelClass: 'edit-custom-modal',
                hasBackdrop: true,
                data: { user, mode }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) this.loadUsers();
            });
        } else if (mode === 'details') {
            const dialogRef = this.dialog.open(UserDialogComponent, {
                width: dialogWidth,
                height: '100%',
                panelClass: 'details-modal',
                hasBackdrop: true,
                data: { user, mode }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) this.loadUsers();
            });
        }
    }

    deleteUser(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.subscriptions.add(
                this.apiService.deleteUser(id).subscribe({
                    next: () => this.loadUsers(),
                    error: (err) => console.error('Delete error:', err)
                })
            );
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}

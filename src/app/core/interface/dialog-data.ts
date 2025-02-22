import { User } from "src/app/core/models/user-model";

export interface DialogData {
    user: User;
    mode: 'edit' | 'details';
}

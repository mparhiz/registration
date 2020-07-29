import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

// actions
//----- Login
export const LoginAction = createAction(
    '[User] Login Request',
    props<{ email: string; password: string }>()
);
export const LoginSuccessAction = createAction(
    '[User] Login Success',
    props<{ token: string }>()
);
export const LoginFailedAction = createAction(
    '[User] Login Failed',
    props<{ error: any }>()
);

//----- Register User
export const UserRegisterAction = createAction(
    '[User] Register Request',
    props<{ email: string; password: string }>()
);
export const UserRegisterSuccessAction = createAction(
    '[User] Register Success',
    props<{ userId: number }>()
);
export const UserRegisterFailedAction = createAction(
    '[User] Register Failed',
    props<{ error: any }>()
);

//----- Fetch User
export const UserFetchAction = createAction(
    '[User] Fetch Request',
    props<{ userId: number }>()
);
export const UserFetchSuccessAction = createAction(
    '[User] Fetch Success',
    props<{ user: User }>()
);
export const UserFetchFailedAction = createAction(
    '[User] Fetch Failed',
    props<{ error: any }>()
);

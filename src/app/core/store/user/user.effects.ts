import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as userActions from './user.actions';
import { UserService } from 'src/app/core/services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.UserRegisterAction),
        mergeMap((action) => this.userService.registerUser(action.email, action.password)
            .pipe(
                map(data => userActions.UserRegisterSuccessAction({userId: data['id']})),
                catchError(e => {
                    const err = e['error']['error'];
                    return of(userActions.UserRegisterFailedAction({error: err}))
                })
            )
        )
    ));

    userLogin$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.LoginAction),
        mergeMap((action) => this.userService.userLogin(action.email, action.password)
            .pipe(
                map(data => userActions.LoginSuccessAction({token: data['token']})),
                catchError(e => {
                    const err = e['error']['error'];
                    return of(userActions.LoginFailedAction({error: err}))
                })
            )
        )
    ));

    fetchUserInfo$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.UserFetchAction),
        mergeMap((action) => this.userService.getUser(action.userId)
            .pipe(
                map(user => userActions.UserFetchSuccessAction({user: user['data']})),
                tap(() => this.router.navigate(["profile"])),
                catchError(e => {
                    const err = e['error']['error'];
                    return of(userActions.UserFetchFailedAction({error: e}))
                })
            )
        )
    ));

    constructor(
        private userService: UserService,
        private actions$: Actions,
        private router: Router
    ) { }
}

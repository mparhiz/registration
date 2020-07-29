import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap, exhaustMap, concatMap } from 'rxjs/operators';
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
                map(user => {
                    const userId = user['id'];
                    return userActions.UserRegisterSuccessAction({userId})
                }),
                catchError(e => {
                    const errorMsg = e['error']['error'];
                    return of(userActions.LoginFailedAction({error: errorMsg}))
                })
            )
        )
    ));

    userLogin$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.LoginAction),
        mergeMap((action) => this.userService.userLogin(action.email, action.password)
            .pipe(
                map(token => userActions.LoginSuccessAction({token})),
                tap(() => this.router.navigate(["profile"])),
                catchError(e => {
                    const errorMsg = e['error']['error'];
                    return of(userActions.LoginFailedAction({error: errorMsg}))
                })
            )
        )
    ));

    // userLogin$ = createEffect(() => this.actions$.pipe(
    //     ofType(userActions.UserRegisterAction),
    //     mergeMap((action) => this.userService.registerUser(action.email, action.password)
    //         .pipe(
    //             map(user => userActions.UserRegisterSuccessAction({user})),
    //             switchMap((action) => this.userService.getUser(action.user['id'])
    //                 .pipe(
    //                     map(user => userActions.UserFetchSuccessAction({user})),
    //                     tap(() => this.router.navigate(["profile"])),
    //                     catchError(e => {
    //                         const errorMsg = e['error']['error'];
    //                         return of(userActions.UserFetchFailedAction({error: errorMsg}))
    //                     })
    //                 )
    //             ),
    //             catchError(e => {
    //                 const errorMsg = e['error']['error'];
    //                 return of(userActions.UserRegisterFailedAction({error: errorMsg}))
    //             })
    //         )
    //     )
    // ));

    fetchUserInfo$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.UserFetchAction),
        mergeMap((action) => this.userService.getUser(action.userId)
            .pipe(
                map(user => userActions.UserFetchSuccessAction({user})),
                catchError(e => {
                    const errorMsg = e['error']['error'];
                    return of(userActions.LoginFailedAction({error: errorMsg}))
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

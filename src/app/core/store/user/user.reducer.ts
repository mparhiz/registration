import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as userActions from './user.actions';
import { User } from '../../models/user.model';

export const userFeatureKey = 'user';

export interface UserState {
  user: User;
  userId: number;
  token: string;
  serverError: any;
}
const initialUserState: UserState = {
  user: undefined,
  userId: undefined,
  token: undefined,
  serverError: undefined
}

const userReducer = createReducer(
  initialUserState,
  on(userActions.LoginSuccessAction, (state: UserState, action) => {
    return { ...state, token: action.token, serverError: undefined };
  }),
  on(userActions.LoginFailedAction, (state: UserState, action) => {
    return { ...state, serverError: action.error };
  }),
  on(userActions.UserRegisterSuccessAction, (state: UserState, action) => {
    return { ...state, userId: action.userId, serverError: undefined };
  }),
  on(userActions.UserRegisterFailedAction, (state: UserState, action) => {
    return { ...state, serverError: action.error };
  }),
  on(userActions.UserFetchSuccessAction, (state: UserState, action) => {
    return { ...state, user: action.user, serverError: undefined }
  }),
  on(userActions.UserFetchFailedAction, (state: UserState, action) => {
    return { ...state, serverError: action.error };
  })
);
  
export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];

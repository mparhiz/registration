import {
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
  registrationError: any;
  loginError: any;
  serverError: any;
}
const initialUserState: UserState = {
  user: undefined,
  userId: undefined,
  token: undefined,
  registrationError: undefined,
  loginError: undefined,
  serverError: undefined
}

const userReducer = createReducer(
  initialUserState,
  on(userActions.LoginSuccessAction, (state: UserState, action) => {
    return { ...state, token: action.token, loginError: undefined };
  }),
  on(userActions.LoginFailedAction, (state: UserState, action) => {
    return { ...state, loginError: action.error };
  }),
  on(userActions.UserRegisterSuccessAction, (state: UserState, action) => {
    return { ...state, userId: action.userId, registrationError: undefined };
  }),
  on(userActions.UserRegisterFailedAction, (state: UserState, action) => {
    return { ...state, registrationError: action.error };
  }),
  on(userActions.UserFetchSuccessAction, (state: UserState, action) => {
    return { ...state, user: action.user, serverError: undefined }
  }),
  on(userActions.UserFetchFailedAction, (state: UserState, action) => {
    return { ...state, serverError: action.error };
  }),
  on(userActions.UserLogoutAction, (state: UserState, action) => {
    return { ...initialUserState };
  })
);
  
export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

export const selectFeature = createFeatureSelector<UserState>(userFeatureKey);
 
export const selectFeatureUser = createSelector(
  selectFeature,
  (state: UserState) => state.user
);
export const selectFeatureUserId = createSelector(
  selectFeature,
  (state: UserState) => state.userId
);
export const selectFeatureToken = createSelector(
  selectFeature,
  (state: UserState) => state.token
);
export const selectFeatureRegError = createSelector(
  selectFeature,
  (state: UserState) => state.registrationError
);
export const selectFeatureLoginError = createSelector(
  selectFeature,
  (state: UserState) => state.loginError
);
export const selectFeatureServerError = createSelector(
  selectFeature,
  (state: UserState) => state.serverError
);

export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];

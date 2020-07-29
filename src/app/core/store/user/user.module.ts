import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducers, { metaReducers: fromUser.metaReducers })
  ]
})
export class UserModule { }

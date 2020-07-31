import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Store, select } from '@ngrx/store';
import * as fromReduser from 'src/app/core/store/user/user.reducer';
import * as userActions from 'src/app/core/store/user/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  user: User;

  constructor(private store: Store<fromReduser.UserState>, private router: Router) { 
    this.user$ = this.store.pipe(select(fromReduser.selectFeatureUser));
  }

  ngOnInit(): void {
    this.user$.subscribe(x => {
      if(x) this.user = x
    });
  }
  onBackToHomePage() {
    this.store.dispatch(userActions.UserLogoutAction());
    this.router.navigate(['/']);
  }
}

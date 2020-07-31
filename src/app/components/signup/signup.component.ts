import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'src/app/core/helpers/validators';
import { Store, select } from '@ngrx/store';
import * as userActions from 'src/app/core/store/user/user.actions';
import * as fromReduser from 'src/app/core/store/user/user.reducer';
import { Tel } from 'src/app/core/shared/tel-input/tel-input.component';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/core/shared/dialog/dialog.component';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  titles = [
    { key: 'Mr.', value: 1 },
    { key: 'Mrs.', value: 2 },
    { key: 'Prof.', value: 3 },
  ];
  signupForm = null;
  userId: number;
  userId$: Observable<number>;
  token$: Observable<string>;
  regError$: Observable<any>;
  loginError$ : Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromReduser.UserState>,
    private userServices: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, CustomValidators.validateLettersPattern]],
      lastName: ['', [Validators.required, CustomValidators.validateLettersPattern]],
      emails: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
      }, { validator: this.emailMatcher }),
      password: ['', [Validators.required, CustomValidators.validatePasswordPattern]],
      dob: [null, Validators.required],
      phone: [new Tel('', '', ''), Validators.required]
    });

    this.userId$ = this.store.pipe(select(fromReduser.selectFeatureUserId));
    this.regError$ = this.store.pipe(select(fromReduser.selectFeatureRegError));
    this.loginError$ = this.store.pipe(select(fromReduser.selectFeatureLoginError));
    this.token$ = this.store.pipe(select(fromReduser.selectFeatureToken));

    this.userId$.subscribe(x => {if(x) this.userId = x});
    this.token$.subscribe(x => {
      if(x && this.userId) {
        this.store.dispatch(userActions.UserFetchAction({userId: this.userId}));
      }
    });
    this.regError$.subscribe(x => {
      if(x) {
        this.userId = null;
        this.displayDialog('Error', x, null, null);
      }
    });
    this.loginError$.subscribe(x => {
      if(x && this.userId) {
        const email = this.signupForm.controls.emails.controls.email.value;
        this.displayDialog(
        'Error',
        `The user with ID ${this.userId} and email ${email} cannot be loggedin.`,
        null, null);
      }
    });
  }

  getTextErrorMessage(fieldName) {
    return  this.signupForm.controls[fieldName].hasError('pattern') && 
            !this.signupForm.controls[fieldName].hasError('required') ? 
            'Please enter letters only' : 
            this.signupForm.controls[fieldName].hasError('required') ? 
            (fieldName === 'firstName' ? 'First name' : 'Last name') + ' is required' : '';
  }

  getEmailErrorMessage(fieldName) {
    let fg = this.signupForm.controls.emails;
    return fg.controls[fieldName].hasError('required') ? 'Email is required' :
      fg.controls[fieldName].hasError('email') ? 'Please enter a valid email address' : '';
  }

  emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
    const email = control.get('email');
    const confirm = control.get('confirmEmail');
    if (!email || !confirm) return null;
    return email.value !== confirm.value ? { nomatch: true } : null;
  };

  getPasswordErrorMessage() {
    return  this.signupForm.controls.password.hasError('pattern') && 
            !this.signupForm.controls.password.hasError('required') ? 
            'Please enter at least 8 alphanumeric characters' : 
            this.signupForm.controls.password.hasError('required') ? 
            'Password is required' : '';
  }

  onKeyPressPhone(event) {
    return event.charCode>=48 && event.charCode<=57;
  }

  displayDialog(title, message, data, buttons) {
    let dialogData: DialogData = {
      title: title,
      message: message,
      data: data,
      buttons: buttons
    };
    
    this.dialog.open(DialogComponent, {data: dialogData});
  }

  onSubmit() {
    let userEmail = this.signupForm.controls.emails.controls.email.value;
    this.userServices.emailCheck(userEmail).subscribe(result => {
      if (result) {
        this.displayDialog(
          null,
          'This Email exists!',
          null,
          [{title: 'Ok', return: 'true'}]
        );
      } else {
        this.store.dispatch(userActions.UserRegisterAction({
          email: userEmail,
          password: this.signupForm.controls.password.value
        }));

        this.store.dispatch(userActions.LoginAction({
          email: userEmail,
          password: this.signupForm.controls.password.value
        }));

      }
    })
  }
}

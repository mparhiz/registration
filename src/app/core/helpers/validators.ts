import { AbstractControl  } from '@angular/forms';

export class CustomValidators {
  static validatePasswordPattern(c: AbstractControl) {
    const regexPassword = new RegExp('^[a-zA-Z0-9]{8,}$');
    if (c.value && !regexPassword.test(c.value)) {
      return { pattern: true };
    }
    return null;
  }
  
  static validateLettersPattern(c: AbstractControl) {
    const regexLetter = new RegExp('^[a-zA-Z]$');
    let inValid = null;
    [...c.value].forEach((item) => {
      if (!regexLetter.test(item)) {
        inValid = {pattern: true};
      }
    });
    return inValid;
  }

}

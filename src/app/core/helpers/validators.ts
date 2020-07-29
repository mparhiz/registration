import { AbstractControl  } from '@angular/forms';

export class CustomValidators {
  static validatePasswordPattern(c: AbstractControl) {
    const regexPassword = new RegExp('^[a-zA-Z0-9]{8,}$');
    if (c.value && !regexPassword.test(c.value)) {
      return { pattern: true };
    }
    return null;
  }

  static validateNumbers(c: AbstractControl) {
    const regexNumber = new RegExp('^-?[0-9]*$');
    let inValid = null;
    c.value.forEach((item) => {
      if (!regexNumber.test(item)) {
        inValid = {number: true};
      }
    });
    return  inValid;
  }

  static validateNumber(c: AbstractControl) {
    const regexNumber = new RegExp('^-?[0-9]*$');
    let inValid = null;
    if (!regexNumber.test(c.value)) {
      inValid = { number: true };
    }
    return inValid;
  }

  static validateDecimals(c: AbstractControl) {
    const regexDesimal = new RegExp('^-?([0-9]+(\.([0-9]{1,10})?)?|)$');
    let inValid = null;
    c.value.forEach((item) => {
      if (!regexDesimal.test(item)) {
        inValid = { decimal: true };
      }
    });
    return inValid;
  }

  static validateDecimal(c: AbstractControl) {
    const regexDesimal = new RegExp('^-?([0-9]+(\.([0-9]{1,10})?)?|)$');
    let inValid = null;
    if (!regexDesimal.test(c.value)) {
      inValid = { decimal: true };
    }
    return inValid;
  }

  static validateRequired(c: AbstractControl) {
    if (c.value.length === 0) {
      return {required: true};
    } else {
      return null;
    }
  }
}

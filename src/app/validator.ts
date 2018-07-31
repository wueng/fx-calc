import { AbstractControl } from '@angular/forms';

export function ValidInput(control: AbstractControl) {
    if (control.value != "") {
        return { validField: true };
    }
    return null;
}

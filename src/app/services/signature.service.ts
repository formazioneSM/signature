import { Injectable, linkedSignal, signal, Signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SignatureForm, SignatureFormValues } from '../models/signatureForm.model';
import { Signature } from '../models/signature.model';

@Injectable({
  providedIn: 'root',
})
export class SignatureService {
  private _formValue = signal<Partial<SignatureFormValues> | undefined>(undefined);
  formValue: Signal<Partial<SignatureFormValues> | undefined> = this._formValue;

  linkForm(form: SignatureForm) {
    // Inizializzo il segnale con i valori attuali della form
    this._formValue.set(form.getRawValue());
    
    // Aggiorno il segnale ogni volta che cambia la form
    form.valueChanges.subscribe(value => {
      this._formValue.set(value);
    });
  }
  
    signature = linkedSignal<
      Partial<SignatureFormValues> | undefined,
      Partial<Signature>
    >({
      source: () => this.formValue(),
      computation: (source) => {
        return source as Partial<Signature>;
      },
    });
}

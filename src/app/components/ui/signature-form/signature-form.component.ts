import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Company } from '../../../models/company.model';
import { Workplace } from '../../../models/signature.model';
import { Control, SignatureForm, SignatureFormValues } from '../../../models/signatureForm.model';
import { getAreas } from '../../../services/areas.service';
import { getCompanies } from '../../../services/companies.service';
import { getRoles } from '../../../services/roles.service';
import { SignatureService } from '../../../services/signature.service';
import { StepperService } from '../../../services/stepper.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { InputComponent } from '../input/input.component';
import { Option, SelectComponent } from '../select/select.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signature-form',
  imports: [ReactiveFormsModule, SelectComponent, CheckboxComponent, InputComponent, NgScrollbarModule],
  templateUrl: './signature-form.component.html',
  styleUrl: './signature-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignatureFormComponent {
  stepperService = inject(StepperService);
  companies = getCompanies();
  roles = getRoles();
  areas = getAreas();
  signatureService = inject(SignatureService);
 
  workPlaces = linkedSignal<
    Partial<SignatureFormValues> | undefined,
    any[] | null
  >({
    source: () => this.signatureService.formValue(),
    computation: (source: any, prev) => {
      if (
        (prev?.source?.azienda as any)?.name !== null &&
        (prev?.source?.azienda as any)?.name !== undefined &&
        (prev?.source?.azienda as any)?.name !== source?.azienda?.name
      ) {
        return null;
      }
      return ((source?.azienda as Option)?.value as Company)?.workplace || null;
    },
  });
  versions = linkedSignal<
    Partial<SignatureFormValues> | undefined,
    any[] | null
  >({
    source: () => this.signatureService.formValue(),
    computation: (source: any, prev) => {
      if (
        (prev?.source?.azienda as any)?.name !== null &&
        (prev?.source?.azienda as any)?.name !== undefined &&
        (prev?.source?.azienda as any)?.name !== source?.azienda?.name
      ) {
        return null;
      }
      return ((source?.azienda as Option)?.value as Company)?.versions || null;
    },
  });
  form!: SignatureForm;
  private _fb = inject(FormBuilder);
  get indirizzo(){
    return this.form.get('indirizzo');
  }
  get versione(){
    return this.form.get('version');
  }
  get interno(){
    return this.form.get('interno');
  }
  get area(){
    return this.form.get('area');
  }
  get ruolo(){
    return this.form?.get('ruolo');
  }
  get nome(){
    return this.form.get('nome');
  }
  get cognome(){
    return this.form.get('cognome');
  }
  get azienda(){
    return this.form.get('azienda');
  }

  constructor() {
    this.form = this._fb.nonNullable.group<SignatureFormValues>({
      azienda: this._fb.control<string | Control>(this.signatureService.formValue()?.azienda ?? {value: '', disabled: false}, [Validators.required]),
      area: this._fb.control<string | Control>(this.signatureService.formValue()?.area ?? '', [Validators.required]),
      version: this.signatureService.formValue()?.version ?? '',
      indirizzo: this._fb.control<string | Control>(this.signatureService.formValue()?.indirizzo ?? '', [Validators.required]),
      mobile: this.signatureService.formValue()?.mobile || '',
      interno: this.signatureService.formValue()?.interno || '',
      nome: this._fb.control<string | Control>(this.signatureService.formValue()?.nome || '', [Validators.required]),
      cognome: this._fb.control<string | Control>(this.signatureService.formValue()?.cognome || '', [Validators.required]),
      disclaimer: this.signatureService.formValue()?.disclaimer || false,
      ruolo:  this._fb.control<string | Control>(this.signatureService.formValue()?.ruolo ?? '', [Validators.required]),
      avvisoambientale: this.signatureService.formValue()?.avvisoambientale || false,
    });

    this.signatureService.linkForm(this.form);

  
  }

  checkInterno(event:Workplace | null){
    if(event === null || event.interno === null){
      this.interno?.disable()
    }else if(event !== null && event?.interno){
      this.interno?.enable()
    }
  }
checkAddressAndVersion(event:Option | null){ 
  if(event === null){
    this.indirizzo?.disable();
  }else{
    this.indirizzo?.enable();
  }
  // if(event !== null && event?.value?.versions?.length === 0){
  //   this.versione?.disable()
  // }else if(event !== null && event?.value?.versions?.length > 0){
  //   this.versione?.enable()
  // }
}
}

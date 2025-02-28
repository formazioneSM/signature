import { Component, inject, linkedSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Company } from '../../../models/company.model';
import { Workplace } from '../../../models/signature.model';
import { SignatureForm, SignatureFormValues } from '../../../models/signatureForm.model';
import { getAreas } from '../../../services/areas.service';
import { getCompanies } from '../../../services/companies.service';
import { getRoles } from '../../../services/roles.service';
import { SignatureService } from '../../../services/signature.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { InputComponent } from '../input/input.component';
import { Option, SelectComponent } from '../select/select.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { StepperService } from '../../../services/stepper.service';

@Component({
  selector: 'app-signature-form',
  imports: [ReactiveFormsModule, SelectComponent, CheckboxComponent, InputComponent, NgScrollbarModule],
  templateUrl: './signature-form.component.html',
  styleUrl: './signature-form.component.scss'
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
  constructor() {
    this.form = this._fb.nonNullable.group<SignatureFormValues>({
      azienda: this.signatureService.formValue()?.azienda ?? {value: '', disabled: false},
      area: this.signatureService.formValue()?.area ?? '',
      version: this.signatureService.formValue()?.version ?? '',
      indirizzo: this.signatureService.formValue()?.indirizzo ?? '',
      mobile: this.signatureService.formValue()?.mobile || '',
      interno: this.signatureService.formValue()?.interno || '',
      nome: this.signatureService.formValue()?.nome || '',
      cognome: this.signatureService.formValue()?.cognome || '',
      disclaimer: this.signatureService.formValue()?.disclaimer || false,
      ruolo: this.signatureService.formValue()?.ruolo ?? {name:'', value: null, id:0},
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
  if(event !== null && event?.value?.versions?.length === 0){
    this.versione?.disable()
  }else if(event !== null && event?.value?.versions?.length > 0){
    this.versione?.enable()
  }
}
}

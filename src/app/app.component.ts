import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SignatureComponent } from './components/signature/signature.component';
import { CheckboxComponent } from './components/ui/checkbox/checkbox.component';
import { InputComponent } from './components/ui/input/input.component';
import {
  Option,
  SelectComponent,
} from './components/ui/select/select.component';
import { Company } from './models/company.model';
import {
  SignatureForm,
  SignatureFormValues,
} from './models/signatureForm.model';
import { getAreas } from './services/areas.service';
import { getCompanies } from './services/companies.service';
import { getRoles } from './services/roles.service';
import { SignatureService } from './services/signature.service';
import { Workplace } from './models/signature.model';
import { ButtonComponent } from "./components/ui/button/button.component";

@Component({
  selector: 'app-root',
  imports: [
    SelectComponent,
    SignatureComponent,
    ReactiveFormsModule,
    InputComponent,
    CheckboxComponent,
    ButtonComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  feedbackCopyMessage = signal(false);
  companies = getCompanies();
  activeConfig = signal(false);
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
  fisrtTime:boolean = true;
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
      azienda: {value: '', disabled: false},
      area: [],
      version: '',
      indirizzo: '',
      mobile: '',
      interno: '',
      nomecognome: '',
      disclaimer: false,
      ruolo: [],
      avvisoambientale: false,
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

copySignature = () => {
  window.getSelection()!.removeAllRanges();
  const body = document.querySelector('#signature');
  const range = document.createRange();
  range.selectNode(body!);
  window.getSelection()!.addRange(range);
  document.execCommand('copy');
  window.getSelection()!.removeAllRanges();
  this.feedbackCopyMessage.set(true);
  setTimeout(() => {
    this.feedbackCopyMessage.set(false);
  }, 3000);
}
  title = 'smSignature';
}

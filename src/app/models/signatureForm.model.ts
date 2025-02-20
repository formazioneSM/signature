import { FormControl, FormGroup } from "@angular/forms";
interface Control {
    value: any, disabled: boolean
}
export type SignatureForm = FormGroup<{
    azienda: FormControl<string | Control>;
    version: FormControl<string | Control>;
    area: FormControl<any[] | Control>;
    ruolo: FormControl<any[] | Control>;
    indirizzo: FormControl<string | Control>;
    mobile: FormControl<string | Control>;
    interno: FormControl<string | Control>;
    nomecognome: FormControl<string | Control>;
    disclaimer: FormControl<boolean | Control>;
    avvisoambientale: FormControl<boolean | Control>;
}>
export type SignatureFormValues = {
    azienda: string | Control;
    area: any[] | Control;
    ruolo: any[] | Control;
    version: string | Control;
    indirizzo: string | Control;
    mobile: string | Control;
    interno: string | Control;
    nomecognome: string | Control;
    disclaimer: boolean | Control;
    avvisoambientale: boolean | Control;
  }
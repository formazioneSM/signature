import { FormControl, FormGroup } from "@angular/forms";
import { Option } from "../components/ui/select/select.component";
export interface Control {
    value: any, disabled: boolean
}
export type SignatureForm = FormGroup<{
    azienda: FormControl<string | Control>;
    version: FormControl<string | Control>;
    area: FormControl<string | Control>;
    ruolo: FormControl<string | Control>;
    indirizzo: FormControl<string | Control>;
    mobile: FormControl<string | Control>;
    interno: FormControl<string | Control>;
    nome: FormControl<string | Control>;
    cognome: FormControl<string | Control>;
    disclaimer: FormControl<boolean | Control>;
    avvisoambientale: FormControl<boolean | Control>;
}>
export type SignatureFormValues = {
    azienda: string | Control;
    area: string | Control;
    ruolo: string | Control;
    version: string | Control;
    indirizzo: string | Control;
    mobile: string | Control;
    interno: string | Control;
    nome: string | Control;
    cognome: string | Control;
    disclaimer: boolean | Control;
    avvisoambientale: boolean | Control;
  }
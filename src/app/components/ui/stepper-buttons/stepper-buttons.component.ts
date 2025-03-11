import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SignatureService } from '../../../services/signature.service';
import { StepperService } from '../../../services/stepper.service';
import { Indirizzo } from '../../../models/signature.model';

@Component({
  selector: 'signature-stepper-buttons',
  imports: [ButtonComponent],
  templateUrl: './stepper-buttons.component.html',
  styleUrl: './stepper-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperButtonsComponent {
  private _signatureService = inject(SignatureService);
  protected stepperService = inject(StepperService);
  signature = this._signatureService.signature;
  disabledButton = computed( () => {
    return this.stepperService.step() === 1 && (
      this.signature().azienda === null || 
      this.signature().azienda === undefined
  ) ||
    this.stepperService.step() === 2 && (
      this.signature().nome === '' ||
          this.signature().cognome === '' ||
          (this.signature().area === null || this.signature().area?.name === '') ||
          (this.signature().ruolo === null || this.signature().ruolo?.name === '')
    ) ||
    this.stepperService.step() === 3 && (
      (this.signature().indirizzo as any) === '' || this.signature().indirizzo === null || (this.signature().indirizzo as Indirizzo)?.name === ''
    )
  })
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StepperService } from '../../../services/stepper.service';

@Component({
  selector: 'signature-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent {
  protected stepperService = inject(StepperService);
}

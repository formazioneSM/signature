import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal
} from '@angular/core';
import { SignatureComponent } from './components/signature/signature.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { SignatureFormComponent } from './components/ui/signature-form/signature-form.component';
import { StepperButtonsComponent } from './components/ui/stepper-buttons/stepper-buttons.component';
import { StepperComponent } from './components/ui/stepper/stepper.component';
import { SignatureService } from './services/signature.service';
import { StepperService } from './services/stepper.service';
import { AlertComponent } from './components/ui/alert/alert.component';
document.ontouchmove = function (event) {
  event.preventDefault();
};

@Component({
  selector: 'app-root',
  imports: [SignatureComponent, ButtonComponent, SignatureFormComponent, StepperComponent, StepperButtonsComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // HostListener per l'evento di resize
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 900) {
      this.stepperService.isMobile.set(true);
    } else {
      this.stepperService.isMobile.set(false);
    }
  }
  feedbackCopyMessage = signal(false);
  stepperService = inject(StepperService);
  placeholders = signal([...new Array(5)].map((a) => this.rndInt()));
  rndInt() {
    return (
      Math.floor(Math.floor(Math.random() * (100 - 20 + 1) + 20)).toString() +
      '%'
    );
  }
  signatureService = inject(SignatureService);
  signature = this.signatureService.signature;

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
  };
}
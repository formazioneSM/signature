import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { SignatureComponent } from './components/signature/signature.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { SignatureFormComponent } from './components/ui/signature-form/signature-form.component';
import { StepperService } from './services/stepper.service';
import { SignatureService } from './services/signature.service';
import { SignatureFormValues } from './models/signatureForm.model';
import { Indirizzo, Signature } from './models/signature.model';
import { JsonPipe } from '@angular/common';
document.ontouchmove = function (event) {
  event.preventDefault();
};

@Component({
  selector: 'app-root',
  imports: [SignatureComponent, ButtonComponent, SignatureFormComponent],
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
  signatureData = this.signatureService.formValue;
  signature = linkedSignal<
    Partial<SignatureFormValues> | undefined,
    Partial<Signature>
  >({
    source: () => this.signatureService.formValue(),
    computation: (source) => {
      return source as Partial<Signature>;
    },
  });
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

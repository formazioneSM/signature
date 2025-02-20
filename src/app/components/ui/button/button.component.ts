import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type buttonAspect =
  | 'default-primary'
  | 'default-secondary'
  | 'default-tertiary'
  | 'destructive-primary'
  | 'destructive-secondary'
  | 'destructive-tertiary';
type buttonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'lieveeto-button',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonComponent),
      multi: true,
    },
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements ControlValueAccessor {
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  type = input<'button' | 'submit'>('button');
  aspect = input<buttonAspect>('default-primary');
  size = input<buttonSize>('medium');
  destructive = input<boolean>(false);
  disabled = model<boolean>(false);
  onClick = output();
  onFocus = output();
  onBlur = output();
  onDisabled = (isDisabled: boolean) => {
    this.disabled.set(isDisabled);
  };
  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.onDisabled(true);
      } else {
        this.onDisabled(false);
      }
    });
  }
}

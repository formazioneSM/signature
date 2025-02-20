import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
  output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lieveeto-radio',
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  value = input<string>('');
  controlValue = model<string | null>(null);

writeValue(value: string | null): void {
  this.controlValue.set(value);
}
handleChange(event: Event) {
  const newValue = (event.target as HTMLInputElement).value;
  this.controlValue.set(newValue);
  this.onChangeValue.emit(newValue);
  this.notifyChange();
}
  disabled = model<boolean>(false);
  label = input<string | undefined>();
  name = input.required<string | undefined>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  onChangeValue = output<string>();
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  private notifyChange(): void {
    this.onChange(this.controlValue());
    this.onTouched();
  }
}

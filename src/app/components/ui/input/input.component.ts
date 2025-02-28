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

@Component({
  selector: 'lieeveto-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  value = model<string>('');
  type= input<'text' | 'submit' | 'number' | 'tel'>('text');
  label= input<string | undefined>();
  labelStyles= input<{[key:string]: any}>()
  helperText= input<string | undefined>();
  placeholder = input<string>('');
  disabled = model<boolean>(false);
  onChangeValue = output<string>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  writeValue(value: string): void {
    this.value.set(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    this.value.set(isDisabled ? '' : this.value())
    this.notifyChange();
  }
  private notifyChange(): void {
    this.onChange(this.value());
    this.onChangeValue.emit(this.value());
    this.onTouched();
  }
  onDisabled = (isDisabled: boolean) => {
    this.disabled.set(isDisabled);
  };
  handleChange(event:Event){
    this.value.set((event as any).target.value);
    this.onChangeValue.emit(this.value());
    this.notifyChange();
  }
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

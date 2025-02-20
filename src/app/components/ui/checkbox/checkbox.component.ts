import { ChangeDetectionStrategy, Component, effect, forwardRef, input, model, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'lieveeto-checkbox',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  /********************************* START FIELDS *****************************************/
  onChangeValue = output<boolean | undefined | null>();
  onClick = output();
  checked = model<boolean | undefined | null>();
  label = input<string | undefined>();
  labelStyles= input<{[key:string]: any}>()
  private onChange: (value: boolean | undefined | null) => void = () => {};
  private onTouched: () => void = () => {};
   disabled = model(false);
  /********************************* END FIELDS *****************************************/
  
  /**********************************START METHODS **************************************/

  writeValue(value: boolean): void {
    this.checked.set(value);
  }
  onDisabled = (isDisabled: boolean) => {
    this.disabled.set(isDisabled);
    
  };
  registerOnChange(fn: (value: boolean | undefined | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }
  onClickIndeterminate(event:Event){
    event.preventDefault();
    event.stopPropagation();
    this.onChangeValue.emit(this.checked());
    this.checked.set(false); 
    this.notifyChange(); 
  }
  onClickCheckbox(event:Event){
    event.preventDefault();
    event.stopPropagation();
    this.onChangeValue.emit(this.checked());
    this.checked.set(!this.checked()); 
    this.notifyChange(); 
  }
  protected notifyChange(): void {
    this.onChange(this.checked());
    this.onTouched();
  }
  registerOnDisabledChange?(fn: (isDisabled: boolean) => void): void {
    effect(() => fn(this.disabled()));
  }
  
  /**********************************END METHODS **************************************/

  /**********************************START LIFECYCLE **********************************/
  constructor(){
    effect(() => {
      if (this.disabled()) {
        this.onDisabled(true);
      } else {
        this.onDisabled(false);
      }
    });
  }
  /**********************************END LIFECYCLE **********************************/
}

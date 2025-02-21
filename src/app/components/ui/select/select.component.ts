import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model,
  output,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { PlatformService } from '../../../services/platform.service';

export interface Option {
  name: string;
  value: any;
  selected?: boolean;
  category?: string;
  icon?: string;
  custom?: boolean;
  noResultOption?: boolean;
}
/**
 * Verifica lo spazio disponibile sopra e sotto un elemento nel viewport.
 *
 * @param {HTMLElement} element - L'elemento da analizzare.
 * @param {number} [minSpace=0] - Soglia minima di spazio (in pixel) per considerare "disponibile" lo spazio.
 * @returns {Object} Un oggetto contenente:
 *  - spaceAbove: lo spazio (in pixel) disponibile sopra l'elemento.
 *  - spaceBelow: lo spazio (in pixel) disponibile sotto l'elemento.
 *  - hasSpaceAbove: true se lo spazio sopra è maggiore di minSpace.
 *  - hasSpaceBelow: true se lo spazio sotto è maggiore di minSpace.
 */
const checkSpaceAboveBelow = (element: HTMLElement, minSpace = 0) => {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  // Spazio sopra: distanza dal top del viewport al top dell'elemento
  const spaceAbove = rect.top;
  // Spazio sotto: distanza dal bottom dell'elemento al fondo del viewport
  const spaceBelow = viewportHeight - rect.bottom;
  return {
    spaceAbove,
    spaceBelow,
    hasSpaceAbove: spaceAbove > minSpace,
    hasSpaceBelow: spaceBelow > minSpace,
  };
};

@Component({
  selector: 'lieveeto-select',
  imports: [NgScrollbarModule, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  //************* START FIELDS ***************/
  private _optionsContainer = viewChild<ElementRef<any>>('optionsElement');
  protected _select = viewChild<ElementRef<any>>('select');
  private _scrollable = viewChild(NgScrollbar);
  private _hiddenSelect = viewChild<ElementRef<any>>('hiddenSelect');
  private searchInput = viewChild<ElementRef<any>>('searchInput');
  private platformService = inject(PlatformService);
  protected isSafariPlatform = this.platformService.isSafariOrIOS();
  private inputSingleValue =
    viewChild<ElementRef<HTMLInputElement>>('inputSingleValue');
  label = input<string | undefined>();
  labelStyles= input<{[key:string]: any}>()
  searchble = input(false, { transform: booleanAttribute });
  withCustomValue = input(false, { transform: booleanAttribute });
  isOpened = model<boolean | null>(null);
  options = model<Option[]>([]);
  multiple = input(false, { transform: booleanAttribute });
  disabled = model(false);
  protected internalOptions = linkedSignal(() =>
    this.getOptions(this.options()!)
  );
  protected filteredOptions: WritableSignal<Option[]> = signal([]);
  selection = output<any>();
  protected selectedIndexOption = linkedSignal(() =>
    this.internalOptions().findIndex((o: Option) => o.selected)
  );
  protected selectedValue = linkedSignal<
    { options: Option[]; multiple: boolean },
    Option[] | string | null
  >({
    source: () => ({
      options: this.internalOptions(),
      multiple: this.multiple(),
    }),
    computation: (source: { options: Option[]; multiple: boolean }) => {
      if (!source.multiple) {
        return source.options.find((o: Option) => o.selected)?.name ?? null;
      } else {
        let filteredOptions = source.options.filter((o: Option) => o.selected);
        return filteredOptions.length === 0 ? null : filteredOptions;
      }
    },
  });
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  //************* END FIELDS ***************/

  //****************************** START LIFECYCLE ***********************************/
  constructor() {
    effect(() => {
      if (
        this.isOpened() === true &&
        this._select()?.nativeElement &&
        this._optionsContainer()?.nativeElement &&
        this._hiddenSelect()?.nativeElement
      ) {
        this._select()?.nativeElement.focus();
      } else if (
        this.isOpened() === false &&
        this._select()?.nativeElement &&
        this._optionsContainer()?.nativeElement
      ) {
        this._select()?.nativeElement.blur();
        this._hiddenSelect()?.nativeElement.focus();
      }
    });
    effect(() => {
      if (this.disabled()) {
        this.onDisabled(true);
      } else {
        this.onDisabled(false);
      }
    });
    effect(() => {
      if (this.options() === null) {
        this.selectValue(null, this._select()?.nativeElement);
      }
    });
    effect(() => {
      if (
        (this.internalOptions().length > 0 &&
          this.selectedValue() !== null &&
          this.selectedValue() !== undefined) ||
        (this.internalOptions().length === 0 && this.selectedValue() === null)
        || (this.multiple() &&
        this.internalOptions().filter((o: Option) => o.selected).length === 0)
      ) {
        this.notifyChange();
      }
    });
  }

  ngAfterViewInit() {
    this._optionsContainer()?.nativeElement.addEventListener('touchstart', (e: Event) => {
      this.handleTouch(e as TouchEvent);
    }, {passive: false});
  }

  //****************************** END LIFECYCLE **************************************/

  //****************************** START METHODS *************************************/
  protected handleMultipleOptionTouch(event: Event, option: Option) {
  // Previeni il comportamento di default
  event.preventDefault();
  event.stopPropagation();

  // Se l'opzione non è selezionabile, esci
  if (option.noResultOption) {
    return;
  }

  // Simula il click sulla checkbox
  if (!this.disabled()) {
    this.selectValue(option, this._select()?.nativeElement, event);
    
    // Mantieni il focus sulla select per permettere selezioni multiple
    // this._select()?.nativeElement.focus();
    
    // Riposiziona il container delle opzioni
    setTimeout(() => {
      this.setOptionsPosition(this._select()?.nativeElement);
    }, 10);
  }
}

protected handleMultipleOptionSelect(event: MouseEvent, option: Option) {
  // Gestione per dispositivi non touch
  if (!this.disabled() && !option.noResultOption) {
    this.selectValue(option, this._select()?.nativeElement, event);
  }
}
  protected handleTouch(event: TouchEvent) {
    // Previeni il comportamento di default del browser
    event.preventDefault();
    
    // Ottieni le coordinate del touch
    const touch = event.touches[0];
    
    // Trova l'elemento option più vicino al punto di touch
    const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
    
    // Verifica se l'elemento toccato è un'opzione della select
    if (element?.closest('.option')) {
      const optionElement = element.closest('.option') as HTMLElement;
      
      // Estrai i dati dell'opzione
      const optionName = optionElement.querySelector('div')?.textContent?.trim();
      const option = this.internalOptions().find(opt => opt.name === optionName);
      
      if (option) {
        // Simula la selezione dell'opzione
        this.selectValue(
          option,
          this._select()?.nativeElement,
          event
        );
      }
    }
    
    // Aggiorna la posizione del container delle opzioni
    this.setOptionsPosition(this._select()?.nativeElement);
  }
  /**
   * @name customTrack
   * @param {number} index
   * @param {Option} option
   * @returns {number}
   * @description restituisce un indice randomico per ottimizzare il tracking del template
   */
  customTrack(index: number, option: Option | string) {
    return (
      `${index}` +
      `${Math.random() * index + 100}`
    );
  }
  writeValue(value: any): void {
    this.internalOptions.update((options: Option[]) => {
      return options.map((o) => {
        return {
          ...o,
          selected: this.multiple()
            ? value?.includes(o.value)
            : o.value === value,
        };
      });
    });
  }
  onDisabled = (isDisabled: boolean) => {
    this.disabled.set(isDisabled);
  };
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  /**
   * @name notifyChange
   * @returns {void}
   * @description notifica il cambiamento di stato al contesto reactiveForms
   */
  private notifyChange(): void {
    let selected = this.internalOptions().filter((o) => o.selected);
    let mappedValue = selected
      .map((s) => ({ name: s.name, value: s }))
      .map((v) => v.value);
    this.onChange(this.multiple() ? mappedValue : mappedValue[0] ?? null);
    this.onTouched();
    this.selection.emit(this.multiple() ? mappedValue : mappedValue[0] ?? null)
  }
  /**
   * @name filterElements
   * @param {Event} event
   * @returns {void}
   * @description dato l'evento della input di ricerca filtra gli elementi tra le options disponibili
   */
  filterElements(event: Event): void {
    let value = (event.target as any).value;
    let filteredValues = this.internalOptions().filter(
      (o: Option) =>
        value.length > 0 && o.name?.toLowerCase().includes(value.toLowerCase())
    );
    if (
      filteredValues.length === 0 &&
      value.length > 0 &&
      this.withCustomValue()
    ) {
      this.filteredOptions.set([
        { name: value, value, category: 'Aggiungi', custom: true },
      ]);
    } else {
      this.filteredOptions.set(
        !this.withCustomValue() &&
          filteredValues.length === 0 &&
          value.length > 0
          ? [{ name: 'nessun elemento disponibile', noResultOption: true }]
          : filteredValues
      );
    }
    setTimeout(() => {
      this.setOptionsPosition(this._select()?.nativeElement);
    }, 10);
  }
  /**
   * @name getOptionName
   * @param {Option | string} option
   * @returns {string}
   * @description data una option in ingresso restituisce il corrispondente nome
   */
  getOptionName(option: Option | string) {
    return (option as Option).name;
  }
  /**
   * @name checkIsArray
   * @returns {void}
   * @description verifica se il parametro passato in ingresso è un array
   */
  checkIsArray(param: any) {
    return Array.isArray(param);
  }
  /**
   * @name handleEnterKeyup
   * @param {HTMLButtonElement} select
   * @description gestisce la pressione del tasto enter quando vuoi confermare una option selezionata
   */
  handleEnterKeyup(select: HTMLButtonElement) {
    this.selectValue(
      this.internalOptions()[this.selectedIndexOption()],
      select
    );
    select.blur();
    this._hiddenSelect()?.nativeElement.focus();
  }
  /**
   * @name navigateSelectedOption
   * @param {boolean} down se la freccia è giù
   * @description gestisce la navigazione tra le options con le frecce da tastiera
   */
  navigateSelectedOption(down: boolean = false) {
    if (this.multiple()) return; //TODO: implementare la navigazione tra le option a selezione multipla
    if (this.selectedIndexOption() !== -1) {
      this.internalOptions.update((options: Option[]) =>
        options.map((o: Option, index: number) => {
          o.selected = index === this.selectedIndexOption() + (down ? 1 : -1);
          return o;
        })
      );
    } else {
      this.internalOptions.update((options: Option[]) =>
        options.map((o: Option, index: number) => {
          return {
            ...o,
            selected: index === (down ? 0 : this.options().length - 1),
          };
        })
      );
    }
    let nativeOptions = Array.prototype.slice.call(
      this._optionsContainer()?.nativeElement.children[0].children[0].children
    );
    nativeOptions = nativeOptions.filter(
      (el) => !el.children[0]?.classList?.contains('category')
    );
    this._scrollable()!.scrollToElement(
      nativeOptions.find((el) =>
        el.textContent === !this.multiple()
          ? (this.selectedValue() as string)
          : (this.selectedValue() as Option[]).find(
              (o: Option) => o.name === el.textContent
            )
      )?.name
    );
  }
  /**
   * @name selectValue
   * @param {Option | string} option - option selezionata
   * @param {HTMLButtonElement} select - elemento nativo che rappresenta la select
   * @param {Event=} event - evento di click
   * @description imposta il valore selezionato, emette l'evento con la option selezionata, scatena il blur alla select
   */
  protected selectValue(
    option: Option | string | null,
    select: HTMLButtonElement,
    event?: Event
  ) {
  
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (option === null) {
      this.internalOptions.update((options: Option[]) =>
        options.map((o: Option) => ({
          ...o,
          selected: false,
        }))
      );
      this.filteredOptions.set([]);
      this.selection.emit(option);
      this.notifyChange();
      select.blur();
      
      return;
    }
    if (!this.multiple()) {
      //se non si tratta di una select multipla e se l'opzione cliccata è custom
      if ((option as Option)?.custom) {
        //metto a selected: false tutte le option e solo quella custom cliccata a selected:true
        this.internalOptions.update((options: Option[]) => [
          ...options
            .slice(0, options.length)
            .map((o: Option) => ({ ...o, selected: false })),
          {
            value: (option as Option).name,
            category: 'Aggiungi',
            name: (option as Option).name,
            selected: true,
          },
        ]);
        //riordino le option raggruppando quelle sotto la stessa category
        this.internalOptions.set(this.getOptions(this.internalOptions()));
      } else {
        //se non si tratta di una select multipla e se l'opzione cliccata non è custom
        //seleziono quella cliccata
        this.internalOptions.update((options: Option[]) =>
          options.map((o: Option) => ({
            ...o,
            selected: o.name === (option as Option).name,
          }))
        );
      }
      //emetto il valore cliccato
      this.selection.emit(option);
      //chiudo la dropdown
      select.blur();
      //imposto come value appena selezionato all'input di riferimento
      if (
        this.inputSingleValue() !== undefined &&
        this.inputSingleValue()?.nativeElement !== undefined
      ) {
        this.inputSingleValue()!.nativeElement.value =
          this.selectedValue() as string;
      }
      //metto in focus il button nascosto per permettere di riaprire la select se si preme il tasto enter
      this._hiddenSelect()?.nativeElement.focus();
    } else {
      //se si tratta di una select multipla
      event?.stopPropagation();
      if ((option as Option).custom) {
        //se si tratta di una select multipla e se l'opzione cliccata è custom
        //aggiungo l'option custom a quelle preesistenti
        this.internalOptions.update((options: Option[]) => [
          ...options.slice(0, options.length),
          {
            value: (option as Option).name,
            category: 'Aggiungi',
            name: (option as Option).name,
            selected: true,
          },
        ]);
        //riordino le options raggruppando quelle custom sotto una cateogia comune
        this.internalOptions.set(this.getOptions(this.internalOptions()));
      } else {
        // se si tratta di una select multipla e se la option cliccata non è custom metto il selected a true per quella cliccata
        this.internalOptions.update((options: Option[]) =>
          options.map((o: Option) => ({
            ...o,
            selected:
              o.name === (option as Option).name ? !o.selected : o.selected,
          }))
        );
      }
      //emetto l'array di valori selezionati
      this.selection.emit(
        this.internalOptions().filter((o: Option) => o.selected)
      );
      //se non ci sono più option selezionate chiudo la dropdown
      if (
        this.internalOptions().filter((o: Option) => o.selected).length === 0
      ) {
        this._hiddenSelect()?.nativeElement.focus();
        this.searchInput()?.nativeElement.focus();
      } else {
        // se ci sono ancora option selezionate tengo in focus la select per non farla chiudere
        select.focus();
      }
    }
    //imposto le options filtrate ad array vuoto
    this.filteredOptions.set([]);
    if (this.multiple()) {
      //se si tratta di una select multipla
      setTimeout(() => {
        //riposiziono il container delle options dopo un piccolo timeout
        this.setOptionsPosition(this._select()?.nativeElement);
      }, 10);
    }
    //notifico il cambiamento all'eventuale form che mi renderizza
    // this.notifyChange();
  }

  handleInputFocus(event: Event) {
    // if(this.selectedValue() === null){
    //   this._select()?.nativeElement.blur();
    //   return
    // }
    this._select()?.nativeElement.focus();
    (event.target as any).focus();
    
  }
  /**
   * @name setOptionsPosition
   * @param {HTMLButtonElement} select
   * @description imposta la posizione del contenitore delle options
   * considerando che il suo posizionamento dovrà essere fisso rispetto agli
   * altri elementi del DOM e che deve distanziarsi rispetto alla select di un certo
   * gap. Calcola eventuale spazio sopra e sotto la dropdowm per posizionarsi correttamente
   */
  protected setOptionsPosition(select: HTMLButtonElement, event?: Event) {
    if (this.isOpened() === false) {
      event?.preventDefault();
      event?.stopPropagation();
      return;
    }
    let selectDimensions = select.getBoundingClientRect();
    let optionsDimensions =
      this._optionsContainer()!.nativeElement.getBoundingClientRect();
    if (
      checkSpaceAboveBelow(select, optionsDimensions.height).hasSpaceAbove &&
      !checkSpaceAboveBelow(select, 250).hasSpaceBelow
    ) {
      this._optionsContainer()!.nativeElement.style.top =
        selectDimensions.top - optionsDimensions.height - 10 + 'px';
    } else {
      this._optionsContainer()!.nativeElement.style.top =
        selectDimensions.top + selectDimensions.height + 10 + 'px';
    }
    this._optionsContainer()!.nativeElement.style.left =
      selectDimensions.left + 'px';
    this._optionsContainer()!.nativeElement.style.minWidth =
      selectDimensions.width + 'px';
  }

  protected getOptions(originalOptions: Option[] | null) {
    const result: any[] = [];
    if (originalOptions !== null && originalOptions !== undefined) {
      const groupedMap: Record<string, any> = (
        originalOptions as Option[]
      )?.reduce((acc, item) => {
        const key = item.category || 'no-category';
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {} as Record<string, any[]>);
      // Processiamo i gruppi e aggiungiamo la proprietà "last" all'ultimo elemento di ciascun gruppo con category
      Object.entries(groupedMap)?.forEach(([category, group]) => {
        group.forEach((item: any, index: number) => {
          let newItem = { ...item };
          // Se non è il primo elemento del gruppo, rimuoviamo la proprietà "category"
          if (index !== 0) {
            delete newItem.category;
          }
          newItem.last = false;
          // Se è l'ultimo elemento di un gruppo con category, aggiungiamo la proprietà "last: true"
          if (category !== 'no-category' && index === group.length - 1) {
            newItem.last = true;
          }
          // newItem.selected = false;
          result.push(newItem);
        });
      });
    }
    return result;
  }
  //****************** END METHODS ***************************/
}

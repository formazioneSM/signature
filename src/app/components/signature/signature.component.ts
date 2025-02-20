import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { companies, imgBasePath } from '../../constants';
import { Signature } from '../../models/signature.model';
import { SignatureFormValues } from '../../models/signatureForm.model';
import { SignatureService } from '../../services/signature.service';

@Component({
  selector: 'app-signature',
  imports: [],
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignatureComponent {



  getNames(param:any[] | undefined | null, fallBackValue:string = ''){
    if(!param ||param === null || param.length === 0 ) return fallBackValue;
    return param?.map(a => a.name).join(', ')
  }

  signatureService = inject(SignatureService);
  signatureData = this.signatureService.formValue;
  signature = linkedSignal<Partial<SignatureFormValues> | undefined,Partial<Signature>>({
    source: () => this.signatureService.formValue(),
    computation: (source) => {
      return source as Partial<Signature>
    }
})
;

  selectedBanner!:number | undefined;


  banners:any = [
    {
      name: 'Forum Retail',
      image: `${imgBasePath}forum_retail.png`
    },
    // {
    //   name: 'Forum PA ITA',
    //   image: `${imgBasePath}banner_forum_pa_ita.png`
    // },
    // {
    //   name: 'Forum PA ENG',
    //   image: `${imgBasePath}banner_forum_pa_eng.png`
    // }
  ]

  companies = companies;



  onSetBanner(index: number) {
    if (this.selectedBanner === index) {
      this.selectedBanner = undefined;
    } else {
      this.selectedBanner = index;
    }
  }



}

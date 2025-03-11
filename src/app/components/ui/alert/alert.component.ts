import { Component, input } from '@angular/core';

@Component({
  selector: 'lieeveto-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  title = input<string>('')

}

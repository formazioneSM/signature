
import { Injectable,
signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StepperService {
    step = signal(1);
    isMobile = signal(window.innerWidth < 900);
}
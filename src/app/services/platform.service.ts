// platform.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private userAgent = navigator.userAgent.toLowerCase();

  isSafari(): boolean {
    return /^((?!chrome|android).)*safari/i.test(this.userAgent);
  }

  isIOS(): boolean {
    return /iphone|ipad|ipod/.test(this.userAgent);
  }

  isSafariOrIOS(): boolean {
    return this.isSafari() || this.isIOS();
  }
}
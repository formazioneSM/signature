import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private userAgent: string = navigator.userAgent.toLowerCase();

  isChromeMobile(): boolean {
    return /chrome/.test(this.userAgent) && /android|iphone|ipad|ipod/.test(this.userAgent);
  }

  isChromeDesktop(): boolean {
    return /chrome/.test(this.userAgent) && !/android|iphone|ipad|ipod/.test(this.userAgent);
  }

  isSafariMacOS(): boolean {
    return /safari/.test(this.userAgent) && !/chrome/.test(this.userAgent) && /macintosh/.test(this.userAgent);
  }

  isSafariIOS(): boolean {
    return /safari/.test(this.userAgent) && !/chrome/.test(this.userAgent) && /iphone|ipad|ipod/.test(this.userAgent);
  }

  getBrowserType(): string {
    if (this.isChromeMobile()) return 'Chrome Mobile';
    if (this.isChromeDesktop()) return 'Chrome Desktop';
    if (this.isSafariMacOS()) return 'Safari MacOS';
    if (this.isSafariIOS()) return 'Safari iOS';
    return 'Unknown Browser';
  }
}

import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  readonly isMobile$: Observable<boolean>;
  readonly isTablet$: Observable<boolean>;
  readonly isDesktop$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {

    this.isMobile$ = this.breakpointObserver
      .observe('(max-width: 576px)')
      .pipe(
        map(result => result.matches),
        shareReplay({ bufferSize: 1, refCount: true })
      );

    this.isTablet$ = this.breakpointObserver
      .observe('(min-width: 577px) and (max-width: 991px)')
      .pipe(
        map(result => result.matches),
        shareReplay({ bufferSize: 1, refCount: true })
      );

    this.isDesktop$ = this.breakpointObserver
      .observe('(min-width: 992px)')
      .pipe(
        map(result => result.matches),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }
}
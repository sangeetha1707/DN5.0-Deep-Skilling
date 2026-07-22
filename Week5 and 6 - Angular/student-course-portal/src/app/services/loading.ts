import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  show() {
    setTimeout(() => this.isLoading$.next(true), 0);
  }

  hide() {
    setTimeout(() => this.isLoading$.next(false), 0);
  }
}
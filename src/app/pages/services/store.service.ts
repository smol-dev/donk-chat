import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UiUser, TwitchService } from './twitch.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  searchTerm$ = new BehaviorSubject<string>('');

  private _streamer$ = new BehaviorSubject<UiUser | null>(null);

  public get streamer$(): Observable<UiUser | null> {
    return this._streamer$.asObservable();
  }

  constructor(private service: TwitchService) {
    this.searchTerm$
      .pipe(
        filter((term) => term.length > 2),
        switchMap((term) => this.service.getUser(term))
      )
      .subscribe((streamer) => {
        this._streamer$.next(streamer);
      });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, empty, forkJoin, Observable, switchMap } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { EmoteService } from './emote.service';
import { UiEmote, UiUser } from '../models/models';
import { TwitchService } from './twitch.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  searchTerm$ = new BehaviorSubject<string>('greekgodx');
  private _streamer$ = new BehaviorSubject<UiUser | null>(null);

  private emoteMap = new Map<string, UiEmote>();

  private _emoteMap$ = new BehaviorSubject<Map<string, UiEmote>>(new Map());

  public get emoteMap$(): Observable<Map<string, UiEmote>> {
    return this._emoteMap$.asObservable();
  }

  constructor(private service: TwitchService, private emotes: EmoteService) {
    this.searchTerm$
      .pipe(
        filter((term) => term.length > 2),
        switchMap((term) => this.service.getUser(term))
      )
      .subscribe((streamer: UiUser) => {
        this._streamer$.next(streamer);
      });

    this._streamer$
      .pipe(
        filter((user) => user !== null),
        tap(user => this.connectToChat(user)),
        switchMap((user) => {
          if (user)
            return forkJoin([
              this.emotes.getBttv(user.id),
              this.emotes.getSevenTv(user?.id),
              this.emotes.getFfz(user.name),
            ]);
          return EMPTY;
        })
      )
      .subscribe(([bttv, seventv, ffz]) => {
        console.debug({ bttv, seventv, ffz });

        bttv.forEach((emote) => this.emoteMap.set(emote.name, emote));
        ffz.forEach((emote) => this.emoteMap.set(emote.name, emote));
        seventv.forEach((emote) => this.emoteMap.set(emote.name, emote));

        this._emoteMap$.next(this.emoteMap);
        console.debug(this.emoteMap);
      });
  }

  connectToChat(user: UiUser | null): void {
    // throw new Error('Method not implemented.');
  }

  getEmote(name: string): UiEmote | undefined {
    console.log(name);
    return this.emoteMap.get(name);
  }

  get emoteList(): string[] {
    return Array.from(this.emoteMap.keys());
  }

  public get streamer$(): Observable<UiUser | null> {
    return this._streamer$.asObservable();
  }
}

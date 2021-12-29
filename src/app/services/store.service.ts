import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  empty,
  forkJoin,
  interval,
  Observable,
  switchMap,
} from 'rxjs';
import {
  debounce,
  filter,
  map,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { EmoteService } from './emote.service';
import { ChatLog, UiEmote, UiUser } from '../models/models';
import { TwitchService } from './twitch.service';
import { ChatClient } from '@twurple/chat';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  searchTerm$ = new BehaviorSubject<string>('itssliker');
  private _streamer$ = new BehaviorSubject<UiUser | null>(null);
  private emoteMap = new Map<string, UiEmote>();
  private _emoteMap$ = new BehaviorSubject<Map<string, UiEmote>>(new Map());

  chatClient = new ChatClient();
  private _messages$ = new BehaviorSubject<string[]>([]);

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
        bttv.forEach((emote) => this.emoteMap.set(emote.name, emote));
        ffz.forEach((emote) => this.emoteMap.set(emote.name, emote));
        seventv.forEach((emote) => this.emoteMap.set(emote.name, emote));
        this._emoteMap$.next(this.emoteMap);
      });

    this.streamer$.subscribe((streamer) => {
      // console.log('STREAMEW CHANGE', streamer);
      if (streamer?.name) {

        this.chatClient.quit();
        this._messages$.next([]);

        this.loadChat(streamer);
      }
    });
  }

  async loadChat(streamer: UiUser) {
    console.log('loadChat');
    if (streamer?.name) {
      this.chatClient = new ChatClient({
        channels: [streamer?.name],
      });
    }
    await this.chatClient.connect();

    this.chatClient.onMessage((channel, user, message) => {
      this._messages$.pipe(take(1)).subscribe((old) => {
        this._messages$.next([message, ...old]);
      });
    });
  }

  get messages$(): Observable<ChatLog[]> {
    return this._messages$.pipe(map((str) => this.strToChatLog(str)));
  }

  get series$(): Observable<Array<[string, number]>> {
    return this.messages$.pipe(
      debounce(() => interval(500)),
      map((logs) => this.chatLogsToSeries(logs))
    );
  }

  chatLogsToSeries(logs: ChatLog[]): Array<[string, number]> {
    // console.log('logs', logs);
    const retval = new Map<string, number>();
    // todo refactor
    logs.forEach((el) => {
      el.emotes.forEach((emote) => {
        const oldCount = retval.get(emote.name);
        if (oldCount !== undefined) {
          retval.set(emote.name, oldCount + 1);
        } else {
          retval.set(emote.name, 1);
        }
      });
    });
    return Array.from(retval.entries()).sort((a, b) => b[1] - a[1]);
    // .slice(0, 20);
  }

  strToChatLog(list: string[]): ChatLog[] {
    return list.map((text) => ({ text, emotes: this.tokenize(text) }));
  }

  tokenize(message: string): UiEmote[] {
    return ' '
      .concat(message)
      .split(' ')
      .filter((word) => this.emoteMap?.has(word))
      .map((word) => this.emoteMap?.get(word)!);
  }

  getEmote(name: string): UiEmote {
    return this.emoteMap.get(name) ?? ({} as UiEmote);
  }

  get emoteList(): string[] {
    return Array.from(this.emoteMap.keys());
  }

  public get streamer$(): Observable<UiUser | null> {
    return this._streamer$.asObservable();
  }
}

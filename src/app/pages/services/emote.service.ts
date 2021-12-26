import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Emoticon,
  FFZResponse,
  RoomEmotes,
} from '../models/ffz.model';
import { Emote7Tv } from '../models/7tv.model';
import { BttvResponse } from '../models/bttv.model';
import { UiEmote } from '../models/models';

export const FFZ_URL = 'https://api.frankerfacez.com/v1';
export const BTTV_URL = 'https://api.betterttv.net/3/cached';
export const SEVENTV_URL = 'https://api.7tv.app/v2';

@Injectable({
  providedIn: 'root',
})
export class EmoteService {
  ffz$ = new BehaviorSubject<unknown>(null);
  channel: any;
  uid: any;

  constructor(private http: HttpClient) {
    const emotes = [];

    const ffzGlobal$ = this.http.get<FFZResponse>(`${FFZ_URL}/set/global`);
    const bttvGlobal$ = this.http.get(`${BTTV_URL}/emotes/global`);
    const bttv$ = this.http.get(`${BTTV_URL}/users/twitch/${this.uid}`);
    const sevenTV$ = this.http.get(`${SEVENTV_URL}/users/${this.channel}`);
    const sevenTVGlobal = this.http.get(`${SEVENTV_URL}/emotes/global`);

    console.log('constructor');

    // ffz$.subscribe((ffz) => this.ffz$.next(ffz));
    // ffzGlobal$.subscribe((ffzGlobal) => console.log({ ffzGlobal }));
  }

  getFfz(channel: string): Observable<UiEmote[]> {
    return this.http.get<FFZResponse>(`${FFZ_URL}/room/${channel}`).pipe(
      map((res: FFZResponse) => res.sets),
      map((sets: { [key: string]: RoomEmotes }) => {
        const res: Emoticon[] = [];
        Object.keys(sets).forEach((el) => {
          let emoticons = sets[el].emoticons;
          res.push(...emoticons);
        });
        return res;
      }),
      map((res) => this.mapFfzEmotes(res))
    );
  }

  getSevenTv(channel: string): Observable<UiEmote[]> {
    return this.http
      .get<Emote7Tv[]>(`${SEVENTV_URL}/users/${channel}/emotes`)
      .pipe(map((res) => this.map7tvEmotes(res)));
  }

  getBttv(id: string): Observable<UiEmote[]> {
    return this.http
      .get<BttvResponse>(`${BTTV_URL}/users/twitch/${id}`)
      .pipe(map((res) => this.mapBttvEmotes(res)));
  }

  mapBttvEmotes({ channelEmotes, sharedEmotes }: BttvResponse): UiEmote[] {
    return channelEmotes
      .concat(sharedEmotes)
      .map<UiEmote>((emote) => ({ type: 'bttv', name: emote.code, emote }));
  }

  mapFfzEmotes(res: Emoticon[]): UiEmote[] {
    return res.map<UiEmote>((emote) => ({
      type: 'ffz',
      name: emote.name,
      emote,
    }));
  }

  map7tvEmotes(res: Emote7Tv[]): UiEmote[] {
    return res.map<UiEmote>((emote) => ({
      type: '7tv',
      name: emote.name,
      emote,
    }));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwitchService {
  constructor(private http: HttpClient) {}

  // GET https://api.twitch.tv/helix/users?login=<login name>&id=<user ID>...
  getUser(username: string): Observable<unknown> {
    const params = { login: username };

    return this.http.get('https://api.twitch.tv/helix/users', {
      params,
      headers: {
        'Client-Id': 'q79kgrjpevbehxs99mogbmzt7c0kub',
      },
    });
  }

}

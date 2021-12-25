import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { ApiClient, HelixUser } from '@twurple/api';
import { ChatClient } from '@twurple/chat';
import { UiUser } from './models';

const clientId = 'ti1zdur1zl1qho6j27fctfea04u39k';
const clientSecret = 'sopr4t4g8rt3heui6ploici5cz4f82';

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });
@Injectable({
  providedIn: 'root',
})
export class TwitchService {
  username?: string;
  chatClient? = new ChatClient();
  messages: string[] = [];

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<UiUser> {
    this.username = username;
    return from(apiClient.users.getUserByName(username)).pipe(
      map((user) => this.fromHelixToUiUser(user))
    );
  }

  async connectToChat() {
    if (this.username) {
      this.chatClient = new ChatClient({
        channels: [this.username],
      });

      await this.chatClient.connect();

      // this.chatClient?.onMessage((channel, user, message) => {
      //   console.log(message);

      //   this.messages.push(message);
      // });
    }
  }

  // helpers
  getUsers(users: string[]): Observable<UiUser[]> {
    return from(apiClient.users.getUsersByIds(users)).pipe(
      map((users) => this.fromHelixToUiUserArray(users))
    );
  }
  fromHelixToUiUserArray(users: HelixUser[]): UiUser[] {
    return users.map(this.fromHelixToUiUser);
  }
  fromHelixToUiUser(helixUser: HelixUser | null): UiUser {
    if (helixUser) {
      return {
        id: helixUser?.id ?? '',
        name: helixUser?.name ?? '',
        displayName: helixUser?.displayName ?? '',
        description: helixUser?.description ?? '',
        type: helixUser?.type ?? '',
        broadcasterType: helixUser?.broadcasterType ?? '',
        profilePictureUrl: helixUser?.profilePictureUrl ?? '',
        offlinePlaceholderUrl: helixUser?.offlinePlaceholderUrl ?? '',
        views: helixUser?.views ?? -1,
        creationDate: helixUser?.creationDate ?? new Date(),
      };
    }
    return {} as UiUser;
  }
}

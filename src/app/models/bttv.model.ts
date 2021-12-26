export interface ChannelEmote {
  id: string;
  code: string;
  imageType: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  displayName: string;
  providerId: string;
}

export interface SharedEmote {
  id: string;
  code: string;
  imageType: string;
  user: User;
}

export type EmoteBTTV = SharedEmote | ChannelEmote;

export interface BttvResponse {
  id: string;
  bots: any[];
  avatar: string;
  channelEmotes: EmoteBTTV[];
  sharedEmotes: EmoteBTTV[];
}

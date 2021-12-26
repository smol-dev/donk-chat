import { Emote7Tv } from './7tv.model';
import { EmoteBTTV } from './bttv.model';
import { EmoteFFZ } from './ffz.model';

export interface UiUser {
  id: string;
  name: string;
  displayName: string;
  description: string;
  type: string;
  broadcasterType: string;
  profilePictureUrl: string;
  offlinePlaceholderUrl: string;
  views: number;
  creationDate: Date;
}

export interface UiEmote {
  name: string;
  type: 'bttv' | 'ffz' | '7tv';
  emote: Emote7Tv | EmoteBTTV | EmoteFFZ;
}

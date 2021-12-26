export interface UserBadges {
  2: string[];
}

export interface UserBadgeIds {
  2: number[];
}

export interface Room {
  _id: number;
  twitch_id: number;
  youtube_id?: any;
  id: string;
  is_group: boolean;
  display_name: string;
  set: number;
  moderator_badge?: any;
  vip_badge?: any;
  mod_urls?: any;
  user_badges: UserBadges;
  user_badge_ids: UserBadgeIds;
  css?: any;
}

export interface Owner {
  _id: number;
  name: string;
  display_name: string;
}

export interface Urls {
  1: string;
  2: string;
  4: string;
}

export type EmoteFFZ = Emoticon;

export interface Emoticon {
  id: number;
  name: string;
  height: number;
  width: number;
  public: boolean;
  hidden: boolean;
  modifier: boolean;
  offset?: any;
  margins?: any;
  css?: any;
  owner: Owner;
  urls: Urls;
  status: number;
  usage_count: number;
  created_at: Date;
  last_updated: Date;
}

export interface RoomEmotes {
  id: number;
  _type: number;
  icon?: any;
  title: string;
  css?: any;
  emoticons: Emoticon[];
}

export interface FFZResponse {
  room: Room;
  sets: { [key: string]: RoomEmotes };
}

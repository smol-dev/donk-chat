export interface Role {
  id: string;
  name: string;
  position: number;
  color: number;
  allowed: number;
  denied: number;
  default: boolean;
}

export interface Owner {
  id: string;
  twitch_id: string;
  login: string;
  display_name: string;
  role: Role;
  profile_picture_id: string;
}

export interface Emote7Tv {
  id: string;
  name: string;
  owner: Owner;
  visibility: number;
  visibility_simple: string[];
  mime: string;
  status: number;
  tags: string[];
  width: number[];
  height: number[];
  urls: string[][];
}

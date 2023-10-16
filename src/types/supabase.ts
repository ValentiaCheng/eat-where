import type { LatLng } from "./location";

export type TrackData = {
  upvoted: string[];
  location?: LatLng;
  address?: string;
};

export type Photo = {
  width: number;
  height: number;
  html_attribution: string[];
  photo_reference: string;
};

export type Restaurant = {
  place_id: string;
  name: string;
  photos: Photo[];
  rating: number;
  user_ratings: number;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  upvote_count?: number;
};

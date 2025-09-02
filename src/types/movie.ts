export interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  durationInMinutes: number;
  genres: string[];
  releaseDate: Date;
  description: string;
  rating: number;
}

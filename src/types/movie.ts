export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  runtime: number;
  genres: string[];
  release_date: Date;
  overview: string;
  vote_average: number;
};
export const mapMovie = (apiMovie): Movie => {
  return {
    id: apiMovie.id,
    title: apiMovie.title,
    genres: apiMovie.genres ?? [],
    poster_path: apiMovie.poster_path,
    vote_average: apiMovie.vote_average,
    overview: apiMovie.overview,
    release_date: new Date(apiMovie.release_date),
    runtime: apiMovie.runtime,
  };
}

export enum MovieSort {
  RELEASE_DATE = "Release Date",
  TITLE = "Title",
}
export type SortOption = MovieSort.RELEASE_DATE | MovieSort.TITLE;

export enum MovieDialogType {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
}

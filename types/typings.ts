export interface Genre {
  id: number,
  name: string
}

export interface Movie {
  title: string,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  media_type?: string,
  release_date?: string,
  first_air_date: string,
  name: string,
  origin_country: string[],
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number,
}

export interface Element {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}
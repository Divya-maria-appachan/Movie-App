import { ReactNode } from "react";

export interface BaseMovie {
    playlists: unknown;
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    playlists?: unknown
  }

  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface BaseMovieList { 
    movies: BaseMovie[];
  } 

  export type FilterOption = "title" | "genre" | "rating"| "year" |"Popularity";

 
  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }

  
  
  export interface MovieT extends BaseMovie {
    genres: {
      id: number;
      name: string;
    }[];
    production_countries:{
        iso_3166_1: string;
        name: string;

    } [];
  }
  export interface ListedMovie extends BaseMovie {
    
    genre_ids: number[];
    
  }

  export interface MovieListPageTemplateProps {
    movies: ListedMovie[];
    title: string;
    action: (m: ListedMovi) => ReactNode;
  }

  

interface MovieT {
  id: number;
  title: string;
  homepage: string;
  tagline: string;
  // Add other properties as needed
}
export interface Review{
  id: string;
  content: string
  author: string
}

export type RatingFilterOption = {
  type: "rating";
  value: number;
};

export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovie[];
}






/////



export interface BaseTv {
  name: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
}

export interface TvReview {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  tvId: number,
}

export interface BaseTvList { 
  Tvs: BaseTv[];
} 

export type TvFilterOption = "name" | "genre" | "rating"| "year";


export interface TvImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}



export interface TvT extends BaseTv {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries:{
      iso_3166_1: string;
      name: string;

  } [];
}
export interface ListedTv extends BaseTv {
  
  genre_ids: number[];
  
}

export interface TvListPageTemplateProps {
  tvs: ListedTv[];
  name: string;
  action: (m: ListedTv) => ReactNode;
}



interface TvT {
id: number;
name: string;
homepage: string;
tagline: string;
// Add other properties as needed
}
export interface TvReview{
id: string;
content: string
author: string
}

export type RatingFilterOption = {
type: "rating";
value: number;
};

export interface TvGenreData {
genres: {
  id: string;
  name: string
}[];
}

interface DiscoverTvs {
page: number;	
total_pages: number;
total_results: number;
results: BaseTv[];
}

export interface TvCredit {
  id: number;
  name: string;
  character: string;
  // Add any other properties you need
}

interface Actor {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  gender: number;
  media_type: string;
  original_language: string;
  original_title: string;
  biography: string;
  profile_path: string | null;
  birthday: string;
  place_of_birth: string;
  name: string;
  video: boolean;
  popularity: number;
  vote_count: number;
  favourite?: boolean;
}

export interface ListedActor extends Actor {
  genre_ids: number[];

}
export interface ActorList { 
  actors: Actor[];
} 
export interface ActorListPageTemplateProps {
  actors: ListedActor[];
  title: string;
  action: (m: ListedActor) => ReactNode;
}
interface DiscoverActors {
  page: number;	
  total_pages: number;
  total_results: number;
  results: Actor[];
}
export interface ActorImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
}

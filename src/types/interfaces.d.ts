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

  export type FilterOption = "title" | "genre" | "rating"| "year";

 
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
    action: (m: MovieT) => void;
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
  action: (m: TvT) => void;
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
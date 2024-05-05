export interface BaseMovie {
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
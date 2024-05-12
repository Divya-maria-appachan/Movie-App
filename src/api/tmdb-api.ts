export const getMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getTrendingMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};


  // export const getTrendingMovies = () => {
  //   return fetch(
  //     `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  //   )
  //     .then(res => res.json())
  //     .then(json => json.results);
  // };
  export const getUpcomingMovies = (page: number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&$page={page}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to fetch upcoming movies. Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data.results)
      .catch((error) => {
        throw error;
      });
  };
  
  export const getMovie = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get movie data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
 

  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };
  export const getMovieReviews = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };
 
  
  
  //////



  export const getTvs = (page: number) => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to fetch tvs. Response status: ${response.status}`);
      }
      return response.json();
    }).catch((error) => {
      throw error;
    });
  };
  
  export const getTrendingTvs = (page: number) => {
    return fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to fetch tvs. Response status: ${response.status}`);
      }
      return response.json();
    }).catch((error) => {
      throw error;
    });
  };
  
  
    // export const getTrendingMovies = () => {
    //   return fetch(
    //     `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    //   )
    //     .then(res => res.json())
    //     .then(json => json.results);
    // };
    export const getUpcomingTvs = (page: number) => {
      return fetch(
        `https://api.themoviedb.org/3/tv/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&$page={page}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Unable to fetch upcoming tvs. Response status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => data.results)
        .catch((error) => {
          throw error;
        });
    };
    
    export const getTv = (id: string) => {
      return fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
      ).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to get tv data. Response status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        throw error
     });
    };
    
    export const getGenre = () => {
      return fetch(
        "https://api.themoviedb.org/3/genre/tv/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
      ).then( (response) => {
        if (!response.ok)
          throw new Error(`Unable to fetch genre. Response status: ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        throw error
     });
    };
   
  
    
    export const getTvImages = (id: string | number) => {
      return fetch(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch images");
        }
        return response.json();
      }).then((json) => json.posters)
        .catch((error) => {
          throw error
        });
    };
    export const getTvReviews = (id: string | number) => {
      return fetch(
        `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
      )
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.results);
          return json.results;
        });
    };

    export const getActors = (id: string | number) => {
      return fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
      )
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.results);
          return json.results;
        });
    };
  
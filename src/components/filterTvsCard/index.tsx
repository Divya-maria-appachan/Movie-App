
import React, { ChangeEvent,useState} from "react";  // useState/useEffect redundant 
import { TvFilterOption, TvGenreData } from "../../types/interfaces"; //include GenreData interface 
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { SelectChangeEvent, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenre } from "../../api/tmdb-api";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9", // Background color
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Box shadow
    color: "#333", // Text color
  },
  formControl: {
    width: "100%",
    marginBottom: "20px", // Added marginBottom for spacing
  },
  title: {
    textAlign: "center",
    
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
  },
  textField: {
    width: "100%",
    marginBottom: "20px",
  },
  select: {
    marginBottom: "20px",
  },
  slider: {
    marginBottom: "20px",
  },
};

interface FilterTvsCardProps {
  onUserInput: (f: TvFilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
  yearFilter: string;
}

const FilterTvsCard: React.FC<FilterTvsCardProps> = (props) => {

  const [rating, setRating] = useState("0");
  const [year, setYears] = useState("1900");
  const { data, error, isLoading, isError } = useQuery<TvGenreData, Error>("genres", getGenre);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }


  const handleChange = (e: SelectChangeEvent, type: TvFilterOption, value: string) => {
    e.preventDefault()
    props.onUserInput(type, value)
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "name", e.target.value)
  }

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value)
  };


  const handleRatingChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    const newRating =
      typeof newValue === "number" ? newValue.toString() : newValue[0].toString();
    setRating(newRating);
    props.onUserInput("rating", newRating);
  };
  const handleYearChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    const newYear =
      typeof newValue === "number" ? newValue.toString() : newValue[0].toString();
    setYears(newYear);
    props.onUserInput("year", newYear);
  };
  
  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1" sx={styles.title}>
          Filter the Tv Shows
        </Typography>
        <TextField
          sx={styles.textField}
          label="Search by Title"
          type="search"
          value={props.titleFilter}
          variant="filled"
          onChange={handleTextChange}
        />
        <FormControl sx={styles.formControl}>
        <Typography variant="h5" component="h1" sx={styles.title}><InputLabel id="genre-label">Select Genre</InputLabel></Typography>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography id="rating-slider" gutterBottom sx={styles.slider}>
          Rating Filter
        </Typography>
        <Slider
          value={parseFloat(rating)}
          onChange={handleRatingChange}
          aria-labelledby="rating-slider"
          step={0.1}
          min={0}
          max={10}
          marks
          valueLabelDisplay="auto"
          sx={{
            color: "purple",
          }}
          
        />
         <Typography id="year-slider" gutterBottom sx={styles.slider}>
          Release Year
        </Typography>
        <Slider
          value={parseFloat(year)}
          onChange={handleYearChange}
          aria-labelledby="year-slider"
          step={1}
          min={1900}
          max={2024}
          marks
          valueLabelDisplay="auto"
          sx={{
            color: "purple",
          }}
          
        />

        
      </CardContent>
    </Card>
  );
};

export default FilterTvsCard;

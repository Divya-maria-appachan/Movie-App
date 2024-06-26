


import React, { useContext} from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";

import img from '../../images/film-poster-placeholder.png';


import { TvsContext } from "../../contexts/tvsContext";
import { ListedTv } from "../../types/interfaces";


import Avatar from "@mui/material/Avatar";




const styles = {
  card: { maxWidth: 445 },
  media: { height: 500 },
  avatar: { backgroundColor: "rgb(255, 0, 0)" },   
  title: {fontWeight: 'bold',fontSize:20 , height: 50 },
};

interface TvListProps {
  tv: ListedTv,
  action: (m: ListedTv) => React.ReactNode;
  
}

const TvCard: React.FC<TvListProps> = (props) => {
  const tv = {...props.tv, favourite: false};
  const { favourites } = useContext(TvsContext);
  
  if (favourites.find((id) => id === tv.id)) 
    tv.favourite = true;
 
  // const handleAddToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   addToFavourites(movie);
  // };
 

  return (
    <Card sx={styles.card}>
       <CardHeader
        avatar={
          tv.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" sx={styles.title}>
            {tv.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          tv.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tv.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tv.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {props.action(tv)}
        <Link to={`/tvs/${tv.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default TvCard;

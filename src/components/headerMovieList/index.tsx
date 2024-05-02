import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
    },
};

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    const title = props.title

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton
                aria-label="go back"
            >
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {title}
            </Typography>
            <IconButton
                aria-label="go forward"
            >
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default Header;


// import React from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import HomeIcon from "@mui/icons-material/Home";
// import FavoriteIcon from "@mui/icons-material/Favorite";
//  import { useHistory } from "react-router-dom";

// interface Movie {
//   id: number;
//   title: string;
//   homepage: string;
//   tagline: string;
//   // Add other properties if needed
// }

// const styles = {
//   root: {  
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     flexWrap: "wrap",
//     padding: 1.5,
//   },
// };

// interface MovieHeaderProps {
//   movie: Movie;
// }

// const MovieHeader: React.FC<MovieHeaderProps> = ({ movie }) => {
//   const history = useHistory();

//   const favorites = JSON.parse(localStorage.getItem("favourites") || "[]");

//   const isFavorite = favorites.some((favMovie: Movie) => favMovie.id === movie.id);

//   const handleGoBack = () => {
//     history.goBack();
//   };

//   return (
//     <Paper component="div" sx={styles.root}>
//       <IconButton aria-label="go back" onClick={handleGoBack}>
//         <ArrowBackIcon color="primary" fontSize="large" />
//       </IconButton>

//       <Typography variant="h4" component="h3">
//         {movie.title}{"   "}
//         <a href={movie.homepage}>
//           <HomeIcon color="primary"  fontSize="large"/>
//         </a>
//         <br />
//         <span>{`${movie.tagline}`} </span>
//       </Typography>
//       <IconButton aria-label="go forward">
//         <ArrowForwardIcon color="primary" fontSize="large" />
//       </IconButton>
//       {isFavorite && (
//         <IconButton aria-label="favorite" color="secondary">
//           <FavoriteIcon />
//         </IconButton>
//       )}
//     </Paper>
//   );
// };

// export default MovieHeader;

import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  title: {
    flexGrow: 1,
  },
  appbar: {
    // background: 'none',
  },
  menuButton: {
    marginRight: "10px",
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const movieMenuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Trending Movies", path: "/movies/trending" },
    { label: "Favorites Movies", path: "/movies/favourites" },
  ];

  const tvMenuOptions = [
    { label: "TV Shows", path: "/tvs" },
    { label: "Trending TV Shows", path: "/tvs/Trending" },
    { label: "Favorites TV Shows", path: "/tvs/favourites" },
  ];

  const myFantasyMovieOption = { label: "My Movie Fantasy", path: "/fantasy" };

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar sx={styles.appbar} position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h5" sx={styles.title}>
            CineScope
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
                sx={styles.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <Typography variant="h6" component="div" sx={{ padding: "10px" }}>
                  Movies
                </Typography>
                {movieMenuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                <Typography variant="h6" component="div" sx={{ padding: "10px" }}>
                  TV Shows
                </Typography>
                {tvMenuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                <MenuItem
                  key={myFantasyMovieOption.label}
                  onClick={() => handleMenuSelect(myFantasyMovieOption.path)}
                >
                  {myFantasyMovieOption.label}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {movieMenuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={styles.menuButton}
                >
                  {opt.label}
                </Button>
              ))}
              {tvMenuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={styles.menuButton}
                >
                  {opt.label}
                </Button>
              ))}
              <Button
                key={myFantasyMovieOption.label}
                color="inherit"
                onClick={() => handleMenuSelect(myFantasyMovieOption.path)}
                sx={styles.menuButton}
              >
                {myFantasyMovieOption.label}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;

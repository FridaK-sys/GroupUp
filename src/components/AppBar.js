// Det som er kommentert ut er kode for mobilversjon.

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logo from "./../images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Popover } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "2%",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorFilter, setAnchorFilter] = React.useState(null);
  const [anchorFilterDesc, setAnchorFilterDesc] = React.useState(null);
  //   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isFilterOpen = Boolean(anchorFilter);
  const isFilterDescOpen = Boolean(anchorFilterDesc);
  //   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //   const handleMobileMenuClose = () => {
  //     setMobileMoreAnchorEl(null);
  //   };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const handleFilterClose = () => {
    setAnchorFilter(null);
  };

  //   const handleMobileMenuOpen = (event) => {
  //     setMobileMoreAnchorEl(event.currentTarget);
  //   };

  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let query = data.get("søkeord");
    let intrests = data.get("interesser");
    let location = data.get("lokasjon");
    let minSize = data.get("min");
    let maxSize = data.get("max");
    navigate("/homepage/search?query=" + query + 
            "&intrests=" + intrests + 
            "&location=" + location +
            "&minSize=" + minSize +
            "&maxSize=" + maxSize);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu // -----------------------------------------------------------ProfileMenu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      style={{ marginTop: "12px" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/userpage");
        }}
      >
        Profil
      </MenuItem>
      <MenuItem
        onClick={() => {
          window.localStorage.removeItem("token");
          window.sessionStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logg ut
      </MenuItem>
    </Menu>
  );

  const renderFilterMenu = (
    <Popover
      anchorEl={anchorFilter}
      keepMounted
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      style={{ marginTop: "11px" }}
      open={isFilterOpen}
      onClose={handleFilterClose}
    >
      <Typography
        sx={{ mt: 2, textAlign: "center" }}
        component="h1"
        variant="h5"
      >
        Avansert søk
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSearch}
        // sx={{ mt: 1, width: "80%"}}
        sx={{
          my: 0,
          mx: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        alignItems="center"
      >
        <TextField
          margin="normal"
          fullWidth
          id="søkeord"
          label="Søkeord"
          name="søkeord"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          name="interesser"
          label="Interesser"
          id="interesser"
        />
        <TextField
          margin="normal"
          fullWidth
          name="lokasjon"
          label="Lokasjon"
          id="lokasjon"
        />
        <Typography sx={{mt: 1}}>
          Størrelse begrensning
        </Typography>
        <div style={{display: "flex",flexDirection: "row"}}>
          <TextField
          margin="normal"
          fullWidth
          type="number"
          name="min"
          label="Min"
          id="min"
          size="small"
          sx={{mx: 1, my: 1, maxWidth: "5vw"}}
        />
        <TextField
          margin="normal"
          type="number"
          fullWidth
          name="max"
          label="Max"
          id="max"
          size="small"
          sx={{mx: 1, my: 1, maxWidth: "5vw"}}
        />
        </div>
        
        {/* <Slider
          sx={{mx: 2, mt: 0, width: "90%"}}
          getAriaLabel={() => 'Temperature range'}
          value={sizeRange}
          onChange={(e, newVal) =>{
            setSizeRange(newVal);
          }}
          valueLabelDisplay="auto"
          // getAriaValueText="test"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Søk
        </Button>
      </Box>
    </Popover>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer" //-------------------------------------------------- Burger-meny | kanskje mer praktisk å ha kun på telefon.
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to="/homepage">
              <img
                alt="logo"
                src={Logo}
                style={{ width: 60, position: "relative", top: "7px" }}
              />
            </Link>
          </Typography>
          <Search sx={{mx: 0}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              style={{ marginLeft: "25%", width: "75%"}}
              placeholder="Søk…"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  console.log(e.target.value);
                  navigate("/homepage/search?query=" + e.target.value);
                }
              }}
            />
          </Search>
          <IconButton 
            onClick={(e) => {
              setAnchorFilter(e.currentTarget);
            }}
            onMouseEnter={(e) => {
              setAnchorFilterDesc(e.currentTarget);
            }}
            onMouseLeave={() => {
              setAnchorFilterDesc(null);
            }}
          >
          <FilterListIcon
            sx={{color: "#FFFFFF"}}
            fontSize="large"          
          />
          </IconButton>
          <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
            mt: "10px"
          }}
          open={isFilterDescOpen}
          anchorEl={anchorFilterDesc}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={() => {setAnchorFilterDesc(null)}}
          disableRestoreFocus
          >
          <Typography sx={{ p: 1 }}>Avansert søk</Typography>
          </Popover>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={1} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderMenu}
      {renderFilterMenu}
    </Box>
  );
}

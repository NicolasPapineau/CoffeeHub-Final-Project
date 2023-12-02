import React, { useContext, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import {
    IconButton,
    Typography,
    Box,
    Avatar,
    Button,
    Tooltip,
    Menu,
    MenuItem,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import CoffeeIcon from "@mui/icons-material/Coffee";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';



const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user, login, logout } = useContext(UserContext);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        
    };


    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#92612F"}}>
            <Container maxWidth="vw" >
                <Toolbar disableGutters>
                    <CoffeeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        CoffeeHub
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography
                                    component={Link}
                                    to="/recipes"
                                    textAlign="center"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    Recipes
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography
                                    component={Link}
                                    to="/roasters"
                                    textAlign="center"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    Local Roasters
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <CoffeeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        CH
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            href="/recipes"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            Recipes
                        </Button>
                        <Button
                            href="/roasters"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            Local roasters
                        </Button>
                    </Box>
                    <SearchBar />
                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar  />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography
                                            component={Link}
                                            to="/favorites"
                                            textAlign="center"
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            Favorites
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography
                                            component={Link}
                                            to="/calendar"
                                            textAlign="center"
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            Calendar
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                    <Typography
                                            component={Link}
                                            to="/"
                                            textAlign="center"
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button component={Link} to="/login" sx={{ color: "white" }}>
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;

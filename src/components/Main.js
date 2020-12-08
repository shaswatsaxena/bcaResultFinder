import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import BookIcon from "@material-ui/icons/Book";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  headerLink: {
    color: "white",
    textDecoration: "none",
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <BookIcon />
          <Typography className={classes.title} variant="h3" noWrap>
            <Link to="/" className={classes.headerLink}>
              BCA Results
            </Link>
          </Typography>
          <div>
            <Button
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.headerLink}
            >
              All Results
            </Button>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2019/2">
                  2019 SECOND SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2019/1">
                  2019 FIRST SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2018/4">
                  2018 FOURTH SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2018/3">
                  2018 THIRD SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2018/2">
                  2018 SECOND SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2018/1">
                  2018 FIRST SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2017/6">
                  2017 SIXTH SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2017/5">
                  2017 FIFTH SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2017/4">
                  2017 FOURTH SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2017/3">
                  2017 THIRD SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2016/6">
                  2016 SIXTH SEM
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.link} to="/results/2016/5">
                  2016 FIFTH SEM
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Main;

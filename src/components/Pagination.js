import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PrevIcon from "@material-ui/icons/NavigateBefore";
import NextIcon from "@material-ui/icons/NavigateNext";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: "20px auto"
  }
});

const Pagination = ({ page, totalPages, prevPage, nextPage }) => {
  const classes = useStyles();

  return (
    <BottomNavigation showLabels className={classes.root}>
      <BottomNavigationAction
        onClick={prevPage}
        label="Previous"
        icon={<PrevIcon />}
        disabled={page < 2 ? true : false}
      />
      <BottomNavigationAction
        label={`${page}/${totalPages}`}
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        onClick={nextPage}
        label="Next"
        icon={<NextIcon />}
        disabled={page === totalPages ? true : false}
      />
    </BottomNavigation>
  );
};

export default Pagination;

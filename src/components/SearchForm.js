import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SearchForm = props => {
  const classes = useStyles();

  const [rollNumber, setRollNumber] = useState();
  const [semester, setSemester] = useState(4);
  const [year, setYear] = useState(2017);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SearchIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Search Results
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();
            props.history.push(`/result/${year}/${rollNumber}/${semester}`);
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={rollNumber}
            onChange={e => setRollNumber(e.target.value)}
            fullWidth
            id="rollNumber"
            label="Roll Number"
            name="rollNumber"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            select
            value={year}
            onChange={e => setYear(e.target.value)}
            required
            fullWidth
            id="year"
            label="Admission Year"
            name="year"
          >
            <MenuItem key={1} value={2016}>
              2016
            </MenuItem>
            <MenuItem key={2} value={2017}>
              2017
            </MenuItem>
            <MenuItem key={3} value={2018}>
              2018
            </MenuItem>
            <MenuItem key={4} value={2019}>
              2019
            </MenuItem>
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            select
            value={semester}
            onChange={e => setSemester(e.target.value)}
            required
            fullWidth
            id="semester"
            label="Semester"
            name="semester"
          >
            <MenuItem key={1} value={1}>
              1st Semester
            </MenuItem>
            <MenuItem key={2} value={2}>
              2nd Semester
            </MenuItem>
            <MenuItem key={3} value={3}>
              3rd Semester
            </MenuItem>
            <MenuItem key={4} value={4}>
              4th Semester
            </MenuItem>
            <MenuItem key={5} value={5}>
              5th Semester
            </MenuItem>
            <MenuItem key={6} value={6}>
              6th Semester
            </MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Get Result
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SearchForm;

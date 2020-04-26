import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import semesters from "../utils/semesters";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const getYear = (rollNumber) => {
  switch (rollNumber.toString().slice(0, 7)) {
    case "8181020": {
      return 2016;
    }
    case "9181020": {
      return 2017;
    }
    case "2181020": {
      return 2018;
    }
    case "2020410": {
      return 2019;
    }
    default:
      console.log("ERROR in finding year");
  }
};

const StudentCard = ({ student }) => {
  const classes = useStyles();
  const {
    name,
    result,
    courseName,
    totalMarks,
    mothersName,
    fathersName,
    rollNumber,
    enrollmentNumber,
  } = student;

  const semester = semesters[courseName];

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {rollNumber}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Semester: {semester}
        </Typography>
        <Typography component="h2">Mother's Name: {mothersName}</Typography>
        <Typography component="h2">Father's Name: {fathersName}</Typography>
        <Typography component="h2">
          Enrollment Number: {enrollmentNumber}
        </Typography>
        <Typography variant="h6" component="h2">
          Result: {result}
        </Typography>
        <Typography variant="h6" component="h2">
          Total Marks: {totalMarks}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link
            href={`/result/${getYear(rollNumber)}/${rollNumber}/${semester}`}
          >
            <a>See Result</a>
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default StudentCard;

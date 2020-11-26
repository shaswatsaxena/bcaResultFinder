import React from "react";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { useFetch } from "../utils/hooks";
import { HorizontalBar } from "react-chartjs-2";

const Result = (props) => {
  const router = useRouter();
  const { semester, rollNumber, year } = props;
  // const { query, semester, year } = props.match.params;
  const url = `https://europe-west1-results-app-react.cloudfunctions.net/server/getResult?rollNumber=${rollNumber}&semester=${semester}&year=${year}`;
  const [response, loading, resStatus] = useFetch(url);

  const studentData = response && response.data;
  const totalMarks =
    studentData &&
    studentData.subjects.reduce(
      (total, subject) =>
        subject.total ? total + +subject.total.split("/")[0] : total,
      0
    );

  return (
    <Grid item xs={12}>
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Container maxWidth="md">
          {loading && <CircularProgress />}
          {!loading && resStatus === 404 && (
            <Dialog
              open="true"
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Result Not Found
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please check that you have entered your roll number, semester
                  and the year of admission correctly.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => router.push("/")} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          )}
          {!loading && resStatus !== 404 && resStatus !== 200 && (
            <Dialog
              open="true"
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Server Error!</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  We are experiencing a server error. Please try again in after
                  30 minutes.
                </DialogContentText>
              </DialogContent>
            </Dialog>
          )}
          {!loading && resStatus === 200 && (
            <React.Fragment>
              <Container>
                <Typography variant="h6" gutterBottom>
                  Name : {studentData.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Roll Number : {studentData.rollNumber}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Enrolment Number : {studentData.enrollmentNumber}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Father's Name :{studentData.fathersName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Mother's Name : {studentData.mothersName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Course Name : {studentData.courseName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Total Marks : {totalMarks}
                </Typography>
              </Container>
              <Container maxWidth="lg">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell>Internal</TableCell>
                      <TableCell>External</TableCell>
                      <TableCell align="right">Total Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentData.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>{subject.internal}</TableCell>
                        <TableCell>{subject.external}</TableCell>
                        <TableCell align="right">{subject.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        Previous Semester Marks
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(studentData)
                      .filter((entry) => entry[0].startsWith("sem"))
                      .map((semester, index) => (
                        <TableRow key={index}>
                          <TableCell>{semester[0]}</TableCell>
                          <TableCell>{semester[1]}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Container>
            </React.Fragment>
          )}

          {!loading && (
            <HorizontalBar
              data={{
                labels: response.data.subjects.map((subject) => subject.name),
                datasets: [
                  {
                    label: "Marks",
                    backgroundColor: [
                      "#FAE8EB",
                      "#F6CACA",
                      "#E4C2C6",
                      "#CD9FCC",
                      "#0A014F",
                      "#7286A0",
                      "#A3BFA8",
                    ],
                    data: response.data.subjects.map((subject) =>
                      parseFloat(subject.total.split("/")[0])
                    ),
                  },
                ],
              }}
              options={{
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  ],
                },
              }}
            />
          )}
        </Container>
      </div>
    </Grid>
  );
};

export default Result;

/*
https://europe-west1-results-app-react.cloudfunctions.net/server/getResult${
    isNaN(+query) ? "ByName?name=" : "?rollNumber="
  }${query}&semester=${semester}&year=${year}
*/

/* 
`https://europe-west1-results-app-react.cloudfunctions.net/server/getResult${
    isNaN(+query) ? "ByName?name=" : "?rollNumber="
  }${query}&semester=${semester}&year=${year}
*/

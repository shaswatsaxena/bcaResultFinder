import React from "react";
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
import { useFetch } from "../hooks";

const Result = props => {
  const { rollNumber, semester, year } = props.match.params;
  const [data, loading, resStatus] = useFetch(
    `https://europe-west1-results-app-react.cloudfunctions.net/server/getResult?rollNumber=${rollNumber}&semester=${semester}&year=${year}`
  );

  const studentData = data.data;
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
                <Button onClick={() => props.history.push("/")} color="primary">
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
              </Container>
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
                    .filter(entry => entry[0].startsWith("sem"))
                    .map((semester, index) => (
                      <TableRow key={index}>
                        <TableCell>{semester[0]}</TableCell>
                        <TableCell>{semester[1]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </React.Fragment>
          )}
        </Container>
      </div>
    </Grid>
  );
};

export default Result;

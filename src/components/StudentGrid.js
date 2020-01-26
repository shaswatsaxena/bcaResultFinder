import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import StudentCard from "./studentCard";
import Pagination from "./Pagination";
import { useFetch } from "../hooks";

const renderStudentCardsRow = students => {
  return students.map(student => (
    <Grid key={student.rollNumber} item xs={12} sm={4}>
      <StudentCard student={student} />
    </Grid>
  ));
};

const renderStudentCardsGrid = students => {
  const noOfStudents = students.length;
  const studentsPerRow = 3;
  let i;
  const studentsRows = [];
  for (i = 0; i < Math.ceil(noOfStudents / studentsPerRow); i++) {
    studentsRows.push(students.splice(0, studentsPerRow));
  }
  return studentsRows.map((row, id) => (
    <Grid key={id} container item xs={12} spacing={3}>
      {renderStudentCardsRow(row)}
    </Grid>
  ));
};

const StudentGrid = ({ year, semester }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState(1);
  const [response, loading, resStatus] = useFetch(
    `https://europe-west1-results-app-react.cloudfunctions.net/server/getStudents?semester=${semester}&year=${year}`
  );

  const prevPage = () => setPage(currentPage => currentPage - 1);
  const nextPage = () => setPage(currentPage => currentPage + 1);

  useEffect(() => {
    if (response && response.data) {
      setStudents(response.data.slice(12 * (page - 1), 12 * page));
      setTotalPages(Math.ceil(response.data.length / 12));
    }
  }, [response, page]);

  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Container maxWidth="xl">
        {loading && <CircularProgress />}
        {!loading && resStatus === 404 && (
          <p>We do not have results for the inputted semester and year.</p>
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
                We are experiencing a server error. Please try again in after 30
                minutes.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
        {!loading && resStatus === 200 && (
          <>
            {renderStudentCardsGrid(students)}
            <Pagination
              page={page}
              totalPages={totalPages}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default StudentGrid;

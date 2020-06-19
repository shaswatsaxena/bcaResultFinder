import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import StudentCard from "./StudentCard";
import Pagination from "./Pagination";
import { useFetch } from "../utils/hooks";

const renderStudentCardsRow = (students) => {
  return students.map((student, index) => (
    <Grid key={`students ${index}`} item xs={12} sm={4}>
      <StudentCard student={student} />
    </Grid>
  ));
};

const renderStudentCardsGrid = (students) => {
  const noOfStudents = students.length;
  const studentsPerRow = 3;
  let i;
  const studentsRows = [];
  for (i = 0; i < Math.ceil(noOfStudents / studentsPerRow); i++) {
    studentsRows.push(students.splice(0, studentsPerRow));
  }
  return studentsRows.map((row, id) => (
    <Grid key={`studentsRows ${id}`} container item xs={12} spacing={3}>
      {renderStudentCardsRow(row)}
    </Grid>
  ));
};

const StudentGrid = ({ response }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState(1);
  // const [response, loading, resStatus] = useFetch(
  //   `https://europe-west1-results-app-react.cloudfunctions.net/server/getStudents?semester=${semester}&year=${year}`
  // );

  const prevPage = () => setPage((currentPage) => currentPage - 1);
  const nextPage = () => setPage((currentPage) => currentPage + 1);

  useEffect(() => {
    if (response && response.data) {
      setStudents(response.data.slice(12 * (page - 1), 12 * page));
      setTotalPages(Math.ceil(response.data.length / 12));
    }
  }, [response, page]);

  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Container maxWidth="xl">
        {response && (
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

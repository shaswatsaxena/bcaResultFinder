import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import StudentCard from "./studentCard";
import Pagination from "./Pagination";

const renderStudentCardsRow = students => {
  return students.map(student => (
    <Grid item xs={3}>
      <StudentCard
        key={student.rollNumber}
        name={student.name}
        rollNumber={student.rollNumber}
        semester={student.courseName}
      />
    </Grid>
  ));
};

const renderStudentCardsGrid = students => {
  const noOfStudents = students.length;
  const studentsPerRow = 4;
  let i;
  const studentsRows = [];
  for (i = 0; i < Math.ceil(noOfStudents / studentsPerRow); i++) {
    studentsRows.push(students.splice(0, studentsPerRow));
  }
  return studentsRows.map(row => (
    <Grid container item xs={12} spacing={3}>
      {renderStudentCardsRow(row)}
    </Grid>
  ));
};

const StudentGrid = props => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    //fetch students from API
    setTimeout(() => {
      setStudents([
        { name: "A", rollNumber: 1, courseName: "BCA" },
        { name: "A", rollNumber: 1, courseName: "BCA" },
        { name: "A", rollNumber: 1, courseName: "BCA" },
        { name: "A", rollNumber: 1, courseName: "BCA" }
      ]);
    }, 1000);
  }, [students, page]);

  useEffect(() => {
    //fetch totalPages from API
    setTimeout(() => {
      setTotalPages(3);
    }, 500);
  }, [totalPages]);

  const prevPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);

  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Container maxWidth="xl">
        {students.length > 0 ? (
          renderStudentCardsGrid(students)
        ) : (
          <CircularProgress />
        )}
        <Pagination
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Container>
    </div>
  );
};

export default StudentGrid;

// importing components
import StudentGrid from "../../components/StudentGrid";

const Results = ({ data: { year, semester } }) => {
  return <StudentGrid year={year} semester={semester} />;
};

export const getServerSideProps = async (context) => {
  const resultProperties = context.params;
  const data = {
    year: resultProperties.slug[0],
    semester: resultProperties.slug[1],
  };

  return {
    props: {
      data,
    },
  };
};

export default Results;

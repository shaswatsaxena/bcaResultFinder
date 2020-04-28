import axios from "axios";

// importing components
import StudentGrid from "../../../components/StudentGrid";

// importing utils
import studentDetails from "../../../utils/studentDetails";

const Results = ({ response }) => {
  return <StudentGrid response={response} />;
};

export const getStaticPaths = () => {
  const path = studentDetails.map((detail) => {
    return {
      params: {
        year: detail.year.toString(),
        semester: detail.semester.toString(),
      },
    };
  });
  return {
    paths: path,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const dataProperties = context.params;

  const response = await axios.get(
    `https://europe-west1-results-app-react.cloudfunctions.net/server/getStudents?semester=${dataProperties.semester}&year=${dataProperties.year}`
  );

  return {
    props: {
      response: response.data,
    },
  };
};

export default Results;

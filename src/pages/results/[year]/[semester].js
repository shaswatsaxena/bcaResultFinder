import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

// importing components
import StudentGrid from "../../../components/StudentGrid";

// importing utils
import studentDetails from "../../../utils/studentDetails";

const Results = ({ response }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${router.query.year} (${router.query.semester})`}</title>
      </Head>
      <StudentGrid response={response} />
    </>
  );
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

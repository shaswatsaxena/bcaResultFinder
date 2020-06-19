import { useRouter } from "next/router";
import Head from "next/head";

// importing components
import Result from "../../../../components/Result";

const ResultData = ({ data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <Head>
        <title>{data.rollNumber}</title>
      </Head>
      <div>{<Result {...data} />}</div>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = (context) => {
  const ctx = context.params;
  const data = {
    year: ctx.year,
    rollNumber: ctx.rollNumber,
    semester: ctx.semester,
  };

  return {
    props: {
      data,
    },
  };
};

export default ResultData;

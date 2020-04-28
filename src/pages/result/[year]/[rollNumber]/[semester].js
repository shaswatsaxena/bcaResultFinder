import Result from "../../../../components/Result";

const ResultData = ({ data }) => {
  return <div>{<Result {...data} />}</div>;
};

export const getServerSideProps = (context) => {
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

import Result from "../../components/Result";

const ResultData = ({ data }) => {
  return <div>{<Result {...data} />}</div>;
};

export const getServerSideProps = (context) => {
  const ctx = context.params;
  const data = {
    year: ctx.slug[0],
    name: ctx.slug[1],
    semester: ctx.slug[2],
  };

  return {
    props: {
      data,
    },
  };
};

export default ResultData;

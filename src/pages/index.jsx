import Head from "next/head";

// importing components
import SearchForm from "../components/SearchForm";

const Index = () => {
  return (
    <div>
      <Head>
        <title>BCA Results</title>
      </Head>
      <SearchForm />
    </div>
  );
};

export default Index;

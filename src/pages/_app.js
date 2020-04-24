import Main from "../components/Main";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Main />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

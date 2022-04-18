import Head from "next/head";
import Header from "../components/Headers/Header";
import Mint from "../components/Mint/Mint";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Oceedee Mint</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header></Header>
      <Mint></Mint>
    </div>

  )
}

import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Twitter Design</title>
        <link rel="icon" href="twitter.svg" />
      </Head>
      <section className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        {/* <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />} */}
      </section>
    </main>
  );
}

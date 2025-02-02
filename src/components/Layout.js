"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const Layout = ({ children, className = "" }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", checkSize);
    checkSize();
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Parmar Rohit K." />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Parmar Rohit K. | Full Stack Developer & Tech Enthusiast"
        />
        <meta
          property="og:description"
          content="Portfolio of Parmar Rohit K., a Full Stack Developer specializing in React, Next.js, Laravel, and more."
        />
        <meta property="og:url" content="https://parmar-rohit-k.vercel.app" />
        <meta property="og:image" content="/light_mode_prk_logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Parmar Rohit K. | Full Stack Developer & Tech Enthusiast"
        />
        <meta
          name="twitter:description"
          content="Portfolio of Parmar Rohit K., a Full Stack Developer specializing in React, Next.js, Laravel, and more."
        />
        <meta name="twitter:image" content="/light_mode_prk_logo.png" />
        <meta name="twitter:site" content="@parmarrohitk_" />

        <link rel="icon" href="/favicon.ico" />
        <meta property="og:locale" content="en_IN"></meta>
      </Head>
      <div
        style={{
          paddingLeft: isDesktop ? "120px" : 0,
          paddingRight: isDesktop ? "120px" : 0,
        }}
        className={`z-0 inline-block h-full w-full bg-light -p-32 dark:bg-dark xl:p-24 lg:p-16 
      md:p-12 sm:p-8 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;

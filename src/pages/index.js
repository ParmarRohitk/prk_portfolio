import AnimatedText from "@/components/AnimatedText";
import { HireMe } from "@/components/HireMe";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TransitionEffect from "@/components/TransitionEffect";
import profilePic from "../../public/images/profile/prk.png";
import Logo from "../../public/light_mode_prk_logo.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>PRK Portfolio</title>
        <meta
          name="description"
          content="Next Portfolio, A open-source portfolio theme built with Nextjs"
        />
      </Head>

      <TransitionEffect />
      <article
        className={`flex min-h-screen items-center text-dark dark:text-light sm:items-start`}
      >
        <Layout className="-!pt-24 md:!pt-16 sm:!pt-28">
          <div className="flex w-full items-start justify-between md:flex-col pt-10 pb-24">
            <div className="w-1/2 lg:hidden md:flex flex self-center max-h-fit">
              {
                <Image
                  priority={true}
                  src={profilePic}
                  alt="image"
                  className="h-auto w-100"
                  height={340}
                  width={340}
                  sizes="33vw"
                />
              }
            </div>
            <div className="flex w-1/2 flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText
                text="Hey, I’m Rohit"
                className="!text-left !text-6xl xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
              />
              <div className="flex w-1/2 w-full items-center items-start lg:w-full  lg:!justify-center  sm:!justify-center  md:!text-center md:inline-block md:w-full">
                <h2 className="animate-text bg-gradient-to-r from-lightGreen via-lightGreen to-slideGreen bg-clip-text text-transparent font-semibold capitalize !text-5xl xl:!text-4xl lg:!text-4xl md:!text-5xl sm:!text-3xl">
                  I create web experiences that connect and inspire.
                </h2>
              </div>

              <p className="my-4 text-base font-medium md:text-sm sm:!text-sm">
                Hello! I'm an MCA student specializing in Computer Science & IT,
                with a strong focus on Full Stack Development and over a year of
                coding experience. My expertise covers both frontend and backend
                development, ensuring seamless project delivery.
              </p>
              <div className="mt-2 flex items-center self-start gap-3 grid-cols-2 lg:self-center">
                <Link
                  href="/about/"
                  target={"_self"}
                  className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base
             `}
                >
                  Get To Know Me
                </Link>
                <Link
                  href="/projects/"
                  target={"_self"}
                  className={`flex items-center rounded-lg border-2 border-solid bg-light p-2.5 px-6 text-lg font-semibold
            capitalize text-dark hover:border-light hover:bg-dark hover:text-light 
            dark:bg-dark dark:text-light dark:hover:bg-light dark:hover:text-dark
            md:p-2 md:px-4 md:text-base
             `}
                >
                  projects
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <div className="fixed right-8 bottom-8 inline-block md:hidden">
          {/* <iframe
            className="iframe"
            title="Noongar Seasonal Calendar"
            width="280"
            height="120"
            src="https://seasonal-au.netlify.app/"
            frameborder="0"
            allowfullscreen
          ></iframe> */}
          <Image
            priority={false}
            src={Logo}
            alt="Logo"
            height={70}
            width={70}
            className={"fill-dark dark:fill-light"}
          />
        </div>
        <HireMe />
      </article>
    </>
  );
}

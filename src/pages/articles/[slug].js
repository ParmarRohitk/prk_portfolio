import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), "src/posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false, // Ensure only pre-generated paths are valid
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src/posts", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: data,
      mdxSource,
      content,
    },
  };
}

export const metadata = ({ frontMatter }) => {
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: frontMatter.title,
      template: `%s | ${siteMetadata.title}`,
    },
    description: frontMatter.description || siteMetadata.description,
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description || siteMetadata.description,
      url: `./${frontMatter.slug}`, // Assuming you have a way to generate the full URL
      siteName: siteMetadata.title,
      images: [frontMatter.socialBanner || siteMetadata.socialBanner],
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `./${frontMatter.slug}`, // Again, assuming you generate full URL for the slug
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: frontMatter.title,
      card: "summary_large_image",
      images: [frontMatter.socialBanner || siteMetadata.socialBanner],
    },
  };
};

const FramerImage = motion(Image);

const FeaturedArticle = ({ img, title, date, summary, link, author }) => {
  return (
    <>
      <Link
        href={link}
        target={"_blank"}
        className="pb-6 inline-block rounded-lg overflow-hidden w-full flex justify-center items-center"
      >
        <div className="relative w-1/2 h-[300px] overflow-hidden border-4 border-gray-700 dark:border-gray-300 rounded-xl">
          <FramerImage
            src={img}
            width={1200}
            height={700}
            alt={title}
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            sizes="100vw"
            priority
          />
        </div>
      </Link>
      <div className="text-center p-2">
        <p className="text-md  mb-2">{summary}</p>
        <p className="text-lg font-medium text-center text-gray-600 dark:text-gray-300 mb-8">
          Published on{" "}
          <span className="text-primary font-semibold dark:text-primaryDark">
            {date}
          </span>{" "}
          by{" "}
          <span className="text-primary font-semibold dark:text-primaryDark">
            {author}
          </span>
        </p>
      </div>
    </>
  );
};

const BlogDetail = ({ frontMatter, mdxSource, content }) => {
  const router = useRouter();

  const jsonLd = {
    "@type": "Person",
    name: frontMatter.author,
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText
            text={frontMatter.title}
            className="!text-8xl !leading-tight mb-6 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <FeaturedArticle
            img={`/images/articles/${frontMatter.slug}.webp`} // Replace with actual image if needed
            title={frontMatter.title}
            summary={frontMatter.desc}
            date={frontMatter.date}
            author={frontMatter.author}
            link={`/`}
          />
          <article className="-max-w-3xl w-full px-4 md:px-8 space-y-8">
            {/* Content Section */}
            {
              <div className="prose lg:prose-xl dark:prose-dark mt-4">
                <MDXRemote
                  compiledSource="content"
                  source={mdxSource}
                  {...mdxSource}
                />
              </div>
            }

            {/* <div className="prose lg:prose-xl dark:prose-dark mt-4">
            <MDXRemote source={content} />
          </div> */}

            {/* Related Posts Section */}
            {/* <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-4">Related Posts</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            </ul>
          </section> */}

            {/* Author Info Section */}
            <section className="mt-16 border-t border-gray-300 dark:border-gray-700 pt-8">
              <h3 className="text-xl font-semibold">About the Author</h3>
              <div className="flex items-center mt-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700">
                  <Image
                    src="/android-chrome-512x512.png"
                    width={1200}
                    height={700}
                    alt="Author Image"
                    className="object-cover rounded-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    sizes="100vw"
                    priority
                  />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">PRK</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Full Stack Web Developer
                  </p>
                </div>
              </div>
            </section>
          </article>
        </Layout>
      </main>
    </>
  );
};

export default BlogDetail;

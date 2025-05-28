import Head from "next/head"

interface MetaTagsProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  keywords?: string[]
}

export default function MetaTags({
  title = "Frontend Developer Portfolio",
  description = "Crafting beautiful, interactive experiences with modern web technologies. Passionate about clean code and innovative design.",
  image = "/og-image.jpg",
  url = "https://akbarkhoja.dev",
  type = "website",
  keywords = ["frontend developer", "web developer", "react", "nextjs", "typescript"],
}: MetaTagsProps) {
  const fullTitle = title.includes("Portfolio") ? title : `${title} | Frontend Developer Portfolio`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="Your Name" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Frontend Developer Portfolio" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@yourusername" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#8B5CF6" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Akbarkhoja",
            jobTitle: "Frontend Developer",
            url: url,
            image: image,
            description: description,
            sameAs: [
              "https://github.com/Joraxajayev",
              "https://linkedin.com/in/Joraxojayev",
              "https://t.me/akbarxojaZ",
            ],
          }),
        }}
      />
    </Head>
  )
}

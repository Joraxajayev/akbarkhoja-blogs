import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const posts = db.collection("blog_posts");

    // Ensure the collection exists
    const collections = await db
      .listCollections({ name: "blog_posts" })
      .toArray();
    if (collections.length === 0) {
      // Create the collection with sample data if it doesn't exist
      await db.createCollection("blog_posts");
      await posts.insertMany([
        {
          title: "Building Scalable React Applications with TypeScript",
          slug: "building-scalable-react-applications-with-typescript",
          content: `
            <h2>Introduction</h2>
            <p>Building scalable React applications requires careful planning and the right tools. TypeScript provides excellent type safety and developer experience that makes maintaining large codebases much easier.</p>
            
            <h2>Key Principles</h2>
            <p>When building scalable React applications, consider these important principles:</p>
            <ul>
              <li><strong>Component Architecture:</strong> Design reusable, composable components</li>
              <li><strong>State Management:</strong> Choose the right state management solution</li>
              <li><strong>Type Safety:</strong> Leverage TypeScript for better code quality</li>
              <li><strong>Performance:</strong> Optimize rendering and bundle size</li>
            </ul>
            
            <h2>Project Structure</h2>
            <p>A well-organized project structure is crucial for scalability. Here's a recommended approach:</p>
            <pre><code>src/
  components/
    ui/
    features/
  hooks/
  utils/
  types/
  pages/</code></pre>
            
            <h2>Conclusion</h2>
            <p>By following these practices and leveraging TypeScript's powerful type system, you can build React applications that scale effectively and are maintainable in the long term.</p>
          `,
          excerpt:
            "Learn how to structure large React applications using TypeScript, focusing on maintainability and developer experience.",
          image: "/placeholder.svg",
          published: true,
          tags: ["React", "TypeScript", "Architecture"],
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-15"),
        },
        {
          title: "The Future of Web Development: Trends to Watch",
          slug: "the-future-of-web-development-trends-to-watch",
          content: `
            <h2>Introduction</h2>
            <p>The web development landscape is constantly evolving. As we look ahead, several exciting trends are shaping the future of how we build and interact with web applications.</p>
            
            <h2>Emerging Technologies</h2>
            <p>Several technologies are gaining momentum in the web development space:</p>
            <ul>
              <li><strong>WebAssembly (WASM):</strong> Bringing near-native performance to web applications</li>
              <li><strong>Progressive Web Apps:</strong> Bridging the gap between web and native apps</li>
              <li><strong>Edge Computing:</strong> Reducing latency with distributed computing</li>
              <li><strong>AI Integration:</strong> Smart features powered by machine learning</li>
            </ul>
            
            <h2>Development Practices</h2>
            <p>Modern development practices are also evolving:</p>
            <blockquote>
              <p>"The future of web development lies in creating more accessible, performant, and user-centric experiences."</p>
            </blockquote>
            
            <h2>What This Means for Developers</h2>
            <p>As these trends continue to develop, developers should focus on continuous learning and adapting to new technologies while maintaining strong fundamentals.</p>
          `,
          excerpt:
            "Exploring emerging technologies and trends that will shape the future of web development in the coming years.",
          image: "/placeholder.svg",
          published: true,
          tags: ["Web Development", "Trends", "Future"],
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-10"),
        },
        {
          title: "Optimizing Performance in Next.js Applications",
          slug: "optimizing-performance-in-nextjs-applications",
          content: `
            <h2>Introduction</h2>
            <p>Performance optimization is crucial for providing excellent user experiences. Next.js provides many built-in optimizations, but there are additional techniques you can employ to make your applications even faster.</p>
            
            <h2>Core Web Vitals</h2>
            <p>Focus on these key metrics:</p>
            <ul>
              <li><strong>Largest Contentful Paint (LCP):</strong> Loading performance</li>
              <li><strong>First Input Delay (FID):</strong> Interactivity</li>
              <li><strong>Cumulative Layout Shift (CLS):</strong> Visual stability</li>
            </ul>
            
            <h2>Optimization Techniques</h2>
            <p>Here are some effective optimization strategies:</p>
            
            <h3>Image Optimization</h3>
            <p>Use Next.js Image component for automatic optimization:</p>
            <pre><code>import Image from 'next/image'

&lt;Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority
/&gt;</code></pre>
            
            <h3>Code Splitting</h3>
            <p>Implement dynamic imports for better bundle splitting:</p>
            <pre><code>const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => &lt;p&gt;Loading...&lt;/p&gt;
})</code></pre>
            
            <h2>Conclusion</h2>
            <p>By implementing these optimization techniques, you can significantly improve your Next.js application's performance and provide better user experiences.</p>
          `,
          excerpt:
            "Advanced techniques for improving performance in Next.js applications, including code splitting and caching strategies.",
          image: "/placeholder.svg",
          published: true,
          tags: ["Next.js", "Performance", "Optimization"],
          createdAt: new Date("2024-01-05"),
          updatedAt: new Date("2024-01-05"),
        },
      ]);
    }

    // Always ensure existing posts have slugs
    const allPostsFromDb = await posts.find({}).toArray();

    for (const post of allPostsFromDb) {
      if (!post.slug) {
        const slug = post.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "");

        await posts.updateOne(
          { _id: post._id },
          {
            $set: {
              slug: slug,
              content:
                post.content ||
                `<p>${post.excerpt}</p><p>This is a sample blog post content. The full content would be stored in the database.</p>`,
              published: post.published !== undefined ? post.published : true,
            },
          }
        );
      }
    }

    const allPosts = await posts
      .find({ published: { $ne: false } })
      .sort({ createdAt: -1 })
      .limit(9)
      .toArray();

    // Log the posts and their slugs for debugging
    console.log(
      "Blog posts with slugs:",
      allPosts.map((p) => ({ title: p.title, slug: p.slug }))
    );

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const client = await clientPromise;
    const posts = client.db("portfolio").collection("blog_posts");

    // Generate slug from title if not provided
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

    const newPost = {
      ...body,
      slug,
      published: body.published !== undefined ? body.published : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await posts.insertOne(newPost);

    return NextResponse.json({ id: result.insertedId, ...newPost });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

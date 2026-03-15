/* ─────────────────────────────────────────
   NotFoundPage.jsx
───────────────────────────────────────── */
import { Link } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900 px-6">
    <div className="text-center max-w-sm">
      <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-white mb-3">
        Page not found
      </h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-10 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-stone-100 transition-colors duration-200"
        >
          <HomeIcon className="w-4 h-4" />
          Homepage
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-dark-600 text-gray-700 dark:text-stone-300 text-sm font-semibold hover:border-stone-400 dark:hover:border-dark-400 transition-all duration-200"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Go back
        </button>
      </div>
    </div>
  </div>
);

export default NotFoundPage;


/* ─────────────────────────────────────────
   BlogPage.jsx
───────────────────────────────────────── */
// import { Helmet } from "react-helmet-async";
// import Blog from "../components/Blog";
//
// const BlogPage = () => (
//   <>
//     <Helmet>
//       <title>Durga Gairhe - Blogs & Development Insights</title>
//       <meta name="description" content="Explore developer blogs, coding tutorials, and tech insights from Durga Gairhe." />
//       <link rel="canonical" href="https://www.durgagairhe.com.np/blog" />
//       <meta property="og:title" content="Durga Gairhe - Blogs & Development Insights" />
//       <meta property="og:url" content="https://www.durgagairhe.com.np/blog" />
//       <meta property="og:type" content="website" />
//     </Helmet>
//     <main><Blog /></main>
//   </>
// );
// export default BlogPage;


/* ─────────────────────────────────────────
   ProjectPage.jsx
───────────────────────────────────────── */
// import { Helmet } from "react-helmet-async";
// import Projects from "../components/Projects";
//
// const ProjectPage = () => (
//   <>
//     <Helmet>
//       <title>Durga Gairhe - Projects & Developer Tools</title>
//       <meta name="description" content="Explore featured projects by Durga Gairhe." />
//       <link rel="canonical" href="https://www.durgagairhe.com.np/projects" />
//     </Helmet>
//     <main><Projects /></main>
//   </>
// );
// export default ProjectPage;
"use client";
import Link from "next/link";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ArticlesErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="fix-height pt-7 text-center">
      <div className="text-3xl text-red-600 font-semibold">
        Something went wrong in Articles
      </div>
      <h2 className="text-gray-700 my-3 text-xl">
        Error Message: {error.message}
      </h2>
      <button
        className="py-2 px-4 rounded-full text-white bg-blue-500 hover:bg-blue-700 font-bold"
        onClick={reset}
      >
        Try Again
      </button>
      <Link className="text-xl underline text-blue-700 block mt-6" href="/">
        Go to Home Page
      </Link>
    </div>
  );
};

export default ArticlesErrorPage;

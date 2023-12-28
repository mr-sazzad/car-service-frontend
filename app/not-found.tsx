"use client";

import Link from "next/link";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error &quot;404&quot;</h1>
        <p className="text-lg mb-4">Sorry, something went wrong.</p>
        <Link href="/">
          <p className="text-blue-500 hover:underline">
            Go back to the homepage
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Error;

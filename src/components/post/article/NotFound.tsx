import Link from "next/link";

import { ROUTES } from "@/utils/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-row justify-evenly bg-white text-center">
      <div className="block w-full flex-auto">
        <div className="block px-4 xl:px-0">
          <div className="mt-20">
            <h1 className="text-4xl font-bold text-gray-800">Article not Found</h1>
            <p className="mt-4 text-lg text-gray-600">
              Oops! The article you’re looking for doesn’t exist.
            </p>
            <p className="mt-2 text-lg text-gray-600">
              Please check the URL or return to the feed to find what you’re looking for.
            </p>
            <div className="mt-8">
              <Link href={ROUTES.root}>
                <span className="cursor-pointer self-center rounded-xl bg-purple-500 px-6 py-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-purple-600">
                  Go Back to Feed
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

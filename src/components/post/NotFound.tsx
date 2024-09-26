export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-row justify-evenly bg-white text-center">
      <div className="block w-full flex-auto">
        <div className="block px-4 xl:px-0">
          <div className="mt-20">
            <h1 className="text-4xl font-bold text-gray-800">No Posts Found</h1>
            <p className="mt-4 text-lg text-gray-600">
              Oops! The post preview you’re looking for doesn’t exist.
            </p>
            <p className="mt-2 text-lg text-gray-600">
              Please check the URL or return to the feed to find what you’re looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

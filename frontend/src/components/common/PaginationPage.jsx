import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export function PaginationPage({
  setPage,
  page,
  totalPages,
  totalResults,
  resultsPerPage,
}) {
  const start = (page - 1) * resultsPerPage + 1;
  const end = Math.min(page * resultsPerPage, totalResults);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile View */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
            page <= 1
              ? "border-gray-300 bg-gray-200 text-gray-400"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Previous
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className={`relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
            page >= totalPages
              ? "border-gray-300 bg-gray-200 text-gray-400"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{start}</span> to{" "}
            <span className="font-medium">{end}</span> of{" "}
            <span className="font-medium">{totalResults}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                page <= 1
                  ? "text-gray-300 hover:bg-gray-50"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setPage(index + 1)}
                className={`relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                  page === index + 1
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                page >= totalPages
                  ? "text-gray-300 hover:bg-gray-50"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

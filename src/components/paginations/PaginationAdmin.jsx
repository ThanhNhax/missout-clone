import { useRouter } from "next/router";
import React from "react";

const PaginationAdmin = ({ to, from, count, pre, next }) => {
  const router = useRouter();

  const handlePre = () => {
    pre && router.push({ query: { ...router.query, page: pre } });
  };

  const handleNext = () => {
    next && router.push({ query: { ...router.query, page: next } });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {to}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {from}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {count}
        </span>{" "}
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        {/* Buttons */}
        <button
          onClick={handlePre}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white  rounded-l ${
            pre ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-500  cursor-not-allowed"
          }`}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Prev
        </button>
        <button
          onClick={handleNext}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white border-0 border-l border-gray-700 rounded-r  ${
            next ? " bg-gray-800 hover:bg-gray-900"  : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Next
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaginationAdmin;

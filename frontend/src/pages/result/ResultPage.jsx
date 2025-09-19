import React, { useEffect, useState } from "react";
import axios from "../../config/axiosconfig"; 

const ResultPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const corrected = JSON.parse(localStorage.getItem("correctedStatements"));

    if (corrected) {
      const sendResults = async () => {
        try {
          const res = await axios.post("/result", { statements: corrected });
          setResults(res.data.results);
        } catch (err) {
          console.error("Error submitting results:", err);
        }
      };

      sendResults();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="bg-gray-700 rounded-2xl p-10 max-w-md w-full text-center">
        {/* Heading */}
        <h1 className="text-base mb-10">
          <span className="text-green-400 font-semibold">Congratulations:</span>{" "}
          <span className="text-white">{}</span>
        </h1>

        {/* Results */}
        {results.length === 0 ? (
          <p className="text-gray-300">No results to display</p>
        ) : (
          <ul className="space-y-8">
            {results.map((r, index) => (
              <li
                key={r.id}
                className="flex items-center justify-between border-b border-gray-400 pb-1"
              >
                {/* Statement text */}
                <span className="text-gray-200 text-sm">
                  {r.isCorrect
                    ? `Corrected statement ${index + 1}`
                    : `Wrong statement ${index + 1}`}
                </span>

                {/* Icon Badge */}
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                    r.isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {r.isCorrect ? "✔" : "✖"}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        {results.length > 0 && (
          <p className="mt-12 text-white font-semibold">
            You successfully corrected{" "}
            <span className="text-green-400">
              {results.filter((r) => r.isCorrect).length}/{results.length}
            </span>{" "}
            errors.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;

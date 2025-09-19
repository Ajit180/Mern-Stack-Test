import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../config/axiosconfig'

function TestEditPage() {
  const navigate = useNavigate();
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const res = await axios.get("/statements/random"); 
        const three = res.data.slice(0, 3); // only 3
        setStatements(three);

        // ✅ Save in localStorage
        localStorage.setItem("selectedStatements", JSON.stringify(three));
      } catch (err) {
        console.error("Error fetching statements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatements();
  }, []);

  if (loading) return <p className="text-white">Loading statements...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="bg-gray-700 shadow-xl rounded-2xl p-10 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-green-400 mb-8 text-center">
          Edit Statements
        </h1>

        {/* Show 3 inputs */}
        <div className="space-y-6">
          {statements.map((s, index) => (
            <input
              key={s._id}
              type="text"
              value={s.text}
              readOnly
              className="w-full bg-transparent border-b-2 border-gray-500 text-white text-center focus:outline-none"
              placeholder={`Statement ${index + 1}`}
            />
          ))}
        </div>

        {/* Redirect Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/test")}
            className="px-8 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestEditPage;

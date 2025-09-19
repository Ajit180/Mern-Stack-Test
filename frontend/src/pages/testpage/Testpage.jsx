import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosconfig"

function TestPage() {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("selectedStatements");
    if (saved) {
      setStatements(JSON.parse(saved));
      setLoading(false);
    } else {
     
      const fetchStatements = async () => {
        try {
          const res = await axios.get("/statements/random");
          setStatements(res.data.slice(0, 3));
        } catch (err) {
          console.error("Error fetching statements:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchStatements();
    }
  }, []);

  const handleChange = (id, value) => {
    setStatements((prev) =>
      prev.map((s) => (s._id === id ? { ...s, text: value } : s))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Save corrected statements in localStorage
      localStorage.setItem("correctedStatements", JSON.stringify(statements));

      // ✅ Update DB if needed
      await Promise.all(
        statements.map((s) =>
          axios.put(`/statements/${s._id}`, { text: s.text })
        )
      );

      navigate("/result");
    } catch (err) {
      console.error("Error submitting statements:", err);
    }
  };

  if (loading) return <p className="text-white">Loading statements...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="bg-gray-700 shadow-xl rounded-2xl p-10 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-green-400 mb-8 text-center">
          Edit
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {statements.map((s, index) => (
            <div key={s._id} className="relative">
              <textarea
                value={s.text}
                onChange={(e) => handleChange(s._id, e.target.value)}
                rows="1"
                className="w-full bg-transparent border-b-2 border-gray-500 text-white text-center resize-none focus:outline-none focus:border-green-400 transition duration-200 placeholder-gray-400"
                placeholder={`Enter statement ${index + 1}`}
              />
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TestPage;

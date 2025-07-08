import { Fragment, useState, useEffect } from "react";
import axios from "axios";

const FactList = () => {
  const [facts, setFacts] = useState<any[]>([]);
  const [factNumber, setFactNumber] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/catFacts", {
        params: {
          limit: factNumber, // Default to 5 if factNumber is 0
        },
      })
      .then((response) => {
        console.log("Cat facts fetched:", response.data);
        setFacts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cat facts:", error);
      });
  }, [factNumber]);

  return (
    <Fragment>
      <div className="m-10 mt-6">
        <h3 className="mb-5">Random Cat Facts</h3>
        <input
          type="number"
          className="input validator"
          required
          placeholder="Type a number"
          min="1"
          max="10"
          value={factNumber}
          title="Must be between be 1 to 10"
          onChange={(e) => setFactNumber(parseInt(e.target.value))}
        />

        <p className="validator-hint">Must be between be 1 to 10</p>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Facts</th>
              </tr>
            </thead>
            <tbody>
              {facts.map((fact, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{fact.fact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default FactList;

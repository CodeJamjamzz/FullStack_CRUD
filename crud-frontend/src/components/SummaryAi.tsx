import { Fragment, useState } from "react";
import axios from "axios";

export const SummaryAi = () => {
  const [essay, setEssay] = useState<string>("");
  const [summary, setSummary] = useState<string>("None so far");

  const handleSubmit = () => {
    console.log("checking");
    setSummary("Generating summary...");
    axios
      .post("http://localhost:3000/api/students/summary", {
        essay: essay,
      })
      .then((response) => {
        if (response.data) {
          setSummary(response.data.summary);
          console.log("Summary response:", response.data);
        } 
      })
      .catch((error) => {
        console.error("Error submitting essay:", error);
        setSummary("Error generating summary.");
      });

    console.log("checking");
  };

  return (
    <Fragment>
      <div className="m-10 mt-6">
        <h3 className="mb-5">Summary Generator</h3>

        <textarea
          className="textarea validator w-full"
          required
          placeholder="Type or paste your essay here..."
          value={essay}
          title="Enter your full essay"
          onChange={(e) => setEssay(e.target.value)}
          rows={5}
          style={{ resize: "vertical" }}
        />

        <button className="btn btn-success mt-4" onClick={handleSubmit}>
          Generate Summary
        </button>

        <h3 className="m-5">Summary</h3>
        <textarea
          className="textarea validator w-full"
          value={summary}
          readOnly
          rows={5}
          style={{ resize: "vertical" }}
        />
      </div>
    </Fragment>
  );
};

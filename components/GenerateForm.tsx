"use client"
import React, { useState } from "react";

export const apiURL = "http://localhost:3000/api";

const GenerateForm = () => {
  const [personURL, setPersonURL] = useState("");
  const [loader, setLoader] = useState(false);
  const [jobURL, setJobURL] = useState("");
  const [jobLoader, setJobLoader] = useState(false);

  const [personText, setPersonText] = useState("");
  const [jobText, setJobText] = useState("");
  const [personJson, setPersonJson] = useState("");
  const [jobJson, setJobJson] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const submitPersonURL = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const personPost = apiURL + "/scrape";

    const personResponse = await fetch(personPost, {
      method: "POST",
      body: JSON.stringify({ pageURL: personURL }),
    });

    const personText = await personResponse.text();
    setPersonText(personText);
    console.log(personText);

    setLoader(false);
  };

  const submitJobURL = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const jobResponse = await fetch(apiURL + "/scrape", {
      method: "POST",
      body: JSON.stringify({ pageURL: jobURL }),
    });
    const jobText = await jobResponse.text();
    setJobText(jobText);
    setLoader(false);
  };

  const parse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    const parsePost = apiURL + "/parse";
    const data = await fetch(parsePost, {
      method: "POST",
      body: JSON.stringify({ personText, jobText }),
    });
    const { personInfo, jobInfo } = await data.json();
    setPersonJson(personInfo);
    setJobJson(jobInfo);
    setLoader(false);
  };

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    const generatePost = apiURL + "/generate";
    const response = await fetch(generatePost, {
      method: "POST",
      body: JSON.stringify({ personText, jobText }),
    });
    const text = await response.text();
    setCoverLetter(text);
    setLoader(false);
  };

  return (
    <div>
      <p className="whitespace-nowrap">personText</p>
      <p className="whitespace-nowrap">{jobText}</p>
      {personText && (
        <div>
          <p>{personText}</p>
        </div>
      )}
      <form
        onSubmit={submitPersonURL}
        className="flex flex-col items-center w-full max-w-md mx-auto border-2 border-black"
      >
        <label>Person URL</label>
        <input
          className="w-full"
          name="personURL"
          value={personURL}
          onChange={(e) => setPersonURL(e.target.value)}
        />
        <button type="submit" className="w-full">
          {loader ? "loading" : "submit"}
        </button>
      </form>
     
      {personText && (
        <form
          onSubmit={submitJobURL}
          className="flex flex-col items-center w-full max-w-md mx-auto border-2 border-black"
        >
          <label>Job URL</label>
          <input
            className="w-full"
            name="jobURL"
            value={jobURL}
            onChange={(e) => setJobURL(e.target.value)}
          />
          <button type="submit" className="w-full">
          {loader ? "loading" : "submit"}
          </button>
        </form>
      )}
      {/* {personText && jobText && (
        <form className="mt-5" onSubmit={parse}>
          <button type="submit">
          {loader ? "loading" : "parse"}

            </button>
        </form>
      )} */}
      {personText && jobText && (
        <form onSubmit={generate}>
          <button className="bg-red-500" type="submit">
          {loader ? "loading" : " Generate cover letter"}
          </button>
        </form>
      )}
    </div>
  );
};

export default GenerateForm;

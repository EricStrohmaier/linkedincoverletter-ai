"use client"
import React, { useState } from "react";

export const apiURL = "http://localhost:3000/api";

const GenerateForm = () => {
  const [personURL, setPersonURL] = useState("");
  const [loader, setLoader] = useState(false);
  const [jobURL, setJobURL] = useState("");

  const [personText, setPersonText] = useState("");
  const [jobText, setJobText] = useState("");
  const [personJson, setPersonJson] = useState({
    "name": "Jaap Oosterbroek",
    "important_info": "Headline: Cambridge, Massachusetts, United States",
    "work_experience": [
      "Datascience Architect at Array Insights - Jun 2023 to Present",
      "Lead Datascientist at Array Insights - Mar 2022 to Jul 2023",
      "Co-Founder at SEMERSE AI - Sep 2020 to Mar 2022",
      "Freelance work at South River AI - Mar 2017 to Mar 2022",
      "Phd student at UMC Utrecht - Jan 2013 to Jan 2017",
      "Technical Engineer at Everest B.V. - Jun 2012 to Dec 2012",
      "Student Assistant Neural Networks at Rijksuniversiteit Groningen - Mar 2008 to 2011",
      "Tutor at Klein Ekenstein - Sep 2007 to Jun 2009"
    ],
    "skills": [
      "Artificial Intelligence",
      "Data Science",
      "Machine Learning",
      "Python",
      "Neural Networks",
      "MATLAB"
    ],
    "knowledge": [
      "Data Augmentation",
      "Computer Vision",
      "Graph Analysis"
    ],
    "experience": [
      "Vision Dataset",
      "Audio Dataset",
      "Clinical Oncology Dataset"
    ],
    "year_experience": "10 years",
    "education": [
      "Master of Science in Artificial Intelligence from Rijksuniversiteit Groningen - Cum Laude (2006-2012)",
      "Propaduese in Autonomous Artist; Drawing, Welding from Minerva, School of Arts (2005-2006)"
    ],
    "certifications_licenses": [],
    "languages": [
      "Spanish (Elementary proficiency)",
      "German (Limited working proficiency)"
    ],
    "interests": [
      "AI",
      "GPU Servers",
      "Robotics",
      "Eyetracking"
    ]
  });
  
  const [jobJson, setJobJson] = useState({
    "company_name": "Smart-TECH Solutions",
    "job_description": "Are you an organized and meticulous individual with a passion for data management? We are thrilled to offer an entry-level remote position for a Data Entry Specialist to join our team. As a Data Entry Specialist, you will play a pivotal role in maintaining the accuracy and integrity of our data, supporting various departments, and contributing to the overall success of our organization.",
    "seniority_level": "Not Applicable",
    "industry": "Accounting",
    "job_function": "Administrative",
    "employment_type": "Part-time",
    "job_id": "",
    "job_location": "Dallas, TX"
  });
  
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

 // Call the parse function with jobText
  await parsePerson(personText);
    setLoader(false);
  };

  const parsePerson = async (personText: string) => {
    try {
      setLoader(true);
  
      const parsePost = apiURL + "/parse";
      const data = await fetch(parsePost, {
        method: "POST",
        body: JSON.stringify({ personText }),
      });
      const { personInfo } = await data.json();
      console.log(personInfo);
      setPersonJson(personInfo);
      setLoader(false);
    } catch (error) {
      console.error("An error occurred while parsing:", error);
      setLoader(false);
    }
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
      // Call the parse function with jobText
     await parseJob(jobText);

    setLoader(false);
  };

  const parseJob = async (jobText: string) => {
    try {
      setLoader(true);
  
      const parsePost = apiURL + "/parse";
      const data = await fetch(parsePost, {
        method: "POST",
        body: JSON.stringify({  jobText }),
      });
      const {  jobInfo } = await data.json();
      console.log( jobInfo);
      setJobJson(jobInfo);
      console.log(jobJson);
      
      setLoader(false);
    } catch (error) {
      console.error("An error occurred while parsing:", error);
      setLoader(false);
    }
  };
  
  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    const generatePost = apiURL + "/generate";
    const response = await fetch(generatePost, {
      method: "POST",
      body: JSON.stringify({ personJson, jobJson }),
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
      {personJson && jobJson && (
        <form onSubmit={generate}>
          <button className="bg-red-500" type="submit">
              {loader ? "loading" : " Generate cover letter"}
          </button>
        </form>
      )}
      {coverLetter && (
        <div>
          <p>{JSON.stringify(coverLetter)}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateForm;

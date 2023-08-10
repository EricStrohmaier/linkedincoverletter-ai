const { Configuration, OpenAIApi } = require("openai");

const GPT_MODEL = "gpt-3.5-turbo-16k";

// Set your OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;


// Create a configuration object with your API key
const configuration = new Configuration({
  apiKey: apiKey,
});

// Create an instance of the OpenAI API with the configuration
const openai = new OpenAIApi(configuration);

// Function to extract data from text using GPT-3
export async function extract_data_from_text(text) {
  try {
    const response = await openai.createChatCompletion({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a data extractor. Respond only with json data",
        },
        { role: "user", content: text },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(`Failed to generate data.\n\nError: ${error}`);
    return "";
  }
}

// Function to get person information using GPT-3
export async function get_person_info(person_info) {
  const prompt =
    `Extract person information { name: str, skills: List[str], experience, List[str], education, List[str], certifications_licenses, List[str], projects: List[str]}` +
    person_info;

  return extract_data_from_text(prompt);
}

// Function to get job information using GPT-3
export async function get_job_info(job_info) {
  const prompt =
    `Extract job information { company_name: string, job_description: string, seniority_level: string, industry: sting, job_function: string, employment_type: string, job_id: string, job_loca }` +
    job_info;

  return extract_data_from_text(prompt);
}

// Function to write a cover letter using GPT-3
export async function write_cover_letter(personal_details, job_details) {
  const prompt = `You are a hiring assistant

    Write a cover letter following these guidelines

    /* ... cover letter guidelines ... */

    job details 
    ${job_details}

    personal details
    ${personal_details}`;

  try {
    const response = await openai.createChatCompletion({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a cover letter writer. Be concise. Respond only with markdown",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
    });
    return response.data.choices[0].message;
  } catch (error) {
    console.log(`Failed to generate data.\n\nError: ${error}`);
    return "";
  }
}
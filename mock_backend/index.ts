import aiData from "./../mock_DB/ai-data.json";
import { AIDATA } from "./types";

export const getAIData = () => {
  const response = new Promise<AIDATA>((resolve, reject) => {
    setTimeout(() => {
      resolve(aiData);
    }, 200);

    if (false) reject("Something went wrong");
  });

  return response;
};

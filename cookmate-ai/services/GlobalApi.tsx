import axios from "axios";
import OpenAI from "openai";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.10:1337/api",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
});

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

const BASE_URL = "https://aigurulab.tech";
const GetUserByEmail = (email: string) =>
  axiosClient.get("/user-lists?filters[email][$eq]=" + email);
const CreateNewUser = (data: any) =>
  axiosClient.post("/user-lists", { data: data });
const GetCategories = () => axiosClient.get("/categories?populate=*");
const CreateNewRecipe = (data: any) =>
  axiosClient.post("/recipes", { data: data });
const UpdateUser = (uid: any, data: any) =>
  axiosClient.put("user-lists/" + uid, { data: data });
const GetRecipeByCategory = (category: string) =>
  axiosClient.get("/recipes", {
    params: {
      "filters[category][$contains]": category,
    },
  });
// Không sử dụng được===> free chỉ được 10 request/day.
const AiModel = async (prompt: string) =>
  await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });
// APT không loading nổi bị crash app.
const GenerateAiImage = async (input: string) =>
  await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 104,
      height: 104,
      input: input,
      model: "sdxl", //'flux'
      aspectRatio: "1:1", //Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_AIGURULAB_API_KEY, // Your API Key
        "Content-Type": "application/json", // Content Type
      },
    }
  );
const GenerateAiImageWithDeepAI = async (input: any) =>
  await fetch("https://modelslab.com/api/v6/realtime/text2img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: process.env.EXPO_PUBLIC_MODELSLAB_API_KEY, //access api key from your dashboard,
      prompt: input,
      negative_prompt:
        "(worst quality:2), (low quality:2), (normal quality:2), (jpeg artifacts), (blurry), (duplicate), (morbid), (mutilated), (out of frame), (extra limbs), (bad anatomy), (disfigured), (deformed), (cross-eye), (glitch), (oversaturated), (overexposed), (underexposed), (bad proportions), (bad hands), (bad feet), (cloned face), (long neck), (missing arms), (missing legs), (extra fingers), (fused fingers), (poorly drawn hands), (poorly drawn face), (mutation), (deformed eyes), watermark, text, logo, signature, grainy, tiling, censored, nsfw, ugly, blurry eyes, noisy image, bad lighting, unnatural skin, asymmetry",
      samples: "1",
      height: "1024",
      width: "1024",
      safety_checker: false,
      seed: null,
      base64: false,
      webhook: null,
      track_id: null,
    }),
  });
export default {
  GetUserByEmail,
  CreateNewUser,
  GetCategories,
  CreateNewRecipe,
  UpdateUser,
  AiModel,
  GenerateAiImage,
  GenerateAiImageWithDeepAI,
  GetRecipeByCategory,
};

import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
console.log('hiiii');

const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);
router.route("/").get((req, res) => {
  res.send("hrithik close AI");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt} = req.body;
    const openaiResponse = await openai.createImage({
		prompt,
		n: 1,
		size: "1024x1024",
		response_format: "b64_json",
	});
    const image = openaiResponse.data.data[0].b64_json;
    console.log(image);
    res.status(200).json({ photo:image });
  } catch (error) {
    console.log(error);
    // res.status(500).send(error?.response.data.error.message)
  }

});

export default router;
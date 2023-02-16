import { surpriseMePrompts } from "../constants/surpriseMePrompts ";
import FileSaver from "file-saver";
export const getRandomPrompt = (prompt) => {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	if (randomPrompt === prompt) {
		return getRandomPrompt(prompt);
	}

	return randomPrompt;
};

export async function downLoadImage(_id,photo){
	FileSaver.saveAs(photo, `download-${_id}closeai.png`);
}
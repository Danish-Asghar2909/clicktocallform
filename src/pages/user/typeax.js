import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";


// export let baseUrl = "http://localhost:4000/";
export let baseUrl = "https://vibtree-xml-generator.herokuapp.com/"

const token = localStorage.getItem("auth_vibcrm_token_dharm")

// console.log("token",token)

const typeax = axios.create({
	baseURL: baseUrl,
	timeout: 10000,
	headers: { authorization: token },
	// withCredentials: true,
});

loadProgressBar({
	speed: 500,
	trickleSpeed: 600,
	showSpinner: false,
	parent: '#root',
}, typeax);


export const AudioFile = (say = "How you doing") => {
	return baseUrl + 'textsppech/?text=' + say
}

export default typeax;
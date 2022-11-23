import axios from "axios";

const EA_URL =
	"https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals";

export const getData = async () => {
	let res;

	try {
		res = await axios.get(EA_URL);
		let data = res.data;
		console.log(
			"input data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ",
			JSON.stringify({ data })
		);

		return data;
	} catch (err) {
		console.error({ err });
		throw err;
	}
};

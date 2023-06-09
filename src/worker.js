/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const api_base = "https://api.openai.com"
export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return handleOPTIONS(request)
		}

		const accessKeys = env.ACCESS_KEYS.split(",");
		const Authorization = request.headers.get("Authorization");
		if (!Authorization) {
			return new Response("Invalid Authorization", { status: 401 });
		}
		const accessKey = Authorization.split(" ")[1];
		if (!accessKey || !accessKeys.includes(accessKey)) {
			return new Response("Invalid Access Key", { status: 401 });
		}

		if (!accessKeys.includes(accessKey)) {
			return new Response("Invalid Access Key", { status: 401 });
		}

		const newHeaders = new Headers(request.headers)
		newHeaders.set("Authorization", `Bearer ${env.OPENAI_API_KEY}`);

		let pathname = new URL(request.url).pathname;
		if (!pathname.startsWith("/v1")) {
			// some sdk will put /v1 at the begin, some will not
			pathname = "/v1" + pathname;
		}
		const newRequest = new Request(api_base + pathname, {
			method: request.method,
			headers: newHeaders,
			body: request.body
		})

		let response = await fetch(newRequest);
		return response;
	},
};

async function handleOPTIONS(request) {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*'
		}
	})
}

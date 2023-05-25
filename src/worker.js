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

		let pathname = new URL(request.url).pathname;
		if (!pathname.startsWith("/v1")) {
			// some sdk will put /v1 at the begin, some will not
			pathname = "/v1" + pathname;
		}
		let response = await fetch(api_base + pathname, request);

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

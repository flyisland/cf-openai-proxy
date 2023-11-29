# Cloudflare worker as a proxy to the OpenAI API

This Cloudflare worker serves as a proxy to the OpenAI API. I created it to address two issues:

1. Some countries and territories are still not supported by the OpenAI API.
1. There are many ChatBot clients that request the API key, even though OpenAI discourages sharing it.

By accessing the OpenAI API through the Cloudflare worker, clients from all countries can access the API. The access key mechanism also allows you to keep the real API key private.

## Usage

### Setup AI Gateway

Create an AI Gateway on Cloudflare. See <https://developers.cloudflare.com/ai-gateway/get-started/creating-gateway/>.

After creating the AI Gateway, copy the OpenAI API endpoint URL.
It should be displayed in the AI Gateway dashboard once you have created the gateway.

In this project directory, make a copy of file `wrangler.toml.sample` and rename it to `wrangler.toml`.
Edit the file and replace the existing value of `API_BASE` with the copied OpenAI API endpoint URL.

### [Setting up the secrets to the Cloudflare worker](https://developers.cloudflare.com/workers/platform/environment-variables/#add-secrets-to-your-project)

To set up secrets for the Cloudflare worker, follow these steps:

1. Run `wrangler secret put OPENAI_API_KEY` to set the OpenAI API key.
1. Run `wrangler secret put ACCESS_KEYS` to set the access key.

The ACCESS_KEYS is a comma separated list of access keys. Each access key is a string of "sk-{user_name}-{random_string}", for example "sk-Tom-2Hf3aTUVlG". You could run `node src/key.mjs user_name` to generate the access keys.

```bash
❯ node src/key.mjs Tom
sk-Tom-wMtF9kkGDu
```

### Deploy to Cloudflare

Run `wrangler deploy` to deploy the worker to Cloudflare.

### Client Setting

Now you can use the URL of this worker as the base URL of the OpenAI API, and the access key as the OpenAI API key to access the OpenAI API.

```python
import openai

openai.api_key = "sk-Tom-wMtF9kkGDu"
openai.api_base = "https://openai-proxy.yourname-8235.workers.dev"

# create a chat completion
chat_completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}]
)

# print the chat completion
print(chat_completion.choices[0].message.content)
```
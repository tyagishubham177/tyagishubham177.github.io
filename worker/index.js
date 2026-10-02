export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/404.html";
    indexUrl.search = "";
    const missing = await env.ASSETS.fetch(new Request(indexUrl, request));
    return new Response(missing.body, { status: 404, headers: missing.headers });
  },
};

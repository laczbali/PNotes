export const onRequest: PagesFunction = async (context) => {
    const url = context.request.url;
    return new Response(`hello from ${url}`);
}

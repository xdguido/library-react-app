export const interceptor = async () => {
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
        let [resource, config] = args;

        resource = `https://dummyjson.com/quotes?limit=5`;

        const response = await originalFetch(resource, config);
        return response;
    };
};

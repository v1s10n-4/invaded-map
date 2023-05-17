/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        typedRoutes: true,
        serverActions: true,
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                resourceQuery: { not: /url/ },
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        icon: true
                    }
                }],
            },
        );
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
}

module.exports = nextConfig

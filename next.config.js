const {withTamagui} = require("@tamagui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    // optimizeFonts: true,
    experimental: {
        serverActions: true,
        appDir: true,
        typedRoutes: true,
        // esmExternals: true,
        // forceSwcTransforms: true,
        // scrollRestoration: true,
        // legacyBrowsers: false,
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
                use: ['@svgr/webpack'],
            },
        );
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
}
module.exports = function (name, { defaultConfig }) {
    let config = {
        ...defaultConfig,
        ...nextConfig
    }

    const tamaguiPlugin = withTamagui({
        config: './tamagui.config.ts',
        components: ['tamagui'],
        useReactNativeWebLite: true,
        logTimings: true,
        disableFontSupport: true,
        enableLegacyFontSupport: true,
        enableCSSOptimizations: false,
        disableExtraction: process.env.NODE_ENV === "development",
        excludeReactNativeWebExports: ["Switch", "ProgressBar", "Picker"],
    })

    return {
        ...config,
        ...tamaguiPlugin(config),
    }
}
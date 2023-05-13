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
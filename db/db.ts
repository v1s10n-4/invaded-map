import { neonConfig } from "@neondatabase/serverless";

if (process.env.LOCAL === "true") {
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

export * from "@vercel/postgres";

const env = process.env.NODE_ENV || 'development';
const configuration = () => ({
  server: {
    env,
    port: parseInt(process.env.PORT, 10) || 10000,
  },
  novu: {
    apiKey: process.env.API_KEY || '',
    apiKeySdk: process.env.API_KEY_SDK || '',
    workflowId: process.env.WORKFLOW_TRIGGER_ID || '',
    appId: process.env.APPLICATION_ID || '',
  },
});

export type EnvironmentVariables = ReturnType<typeof configuration>;

export default configuration;

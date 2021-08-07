const envName = 'NODE_ENV';

function getEnv(key: string, fallback?: string) {
  const allEnvArgs = process.env;

  return allEnvArgs[key] || fallback;
}

export function isProduction() {
  return getEnv(envName) === 'production';
}

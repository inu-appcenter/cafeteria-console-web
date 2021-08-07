const envName = 'NODE_ENV';

function getEnv(key, fallback = null) {
  const allEnvArgs = process.env;

  return allEnvArgs[key] || fallback;
}

export function isProduction() {
  return getEnv(envName) === 'production';
}

export function isDebug() {
  return getEnv(envName) === 'DEBUG';
}

export function isTest() {
  return getEnv(envName) === 'test';
}

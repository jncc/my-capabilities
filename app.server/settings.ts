

export function getEnvironmentSettings(env: string) {
  if (env === 'development') {
    return {
      name: env,
      port: 5000,
      dir: 'app.client'
    };
  }
  else {
    return {
      name: env,
      port: 80,
      dir: 'built/app.client'
    };
  }
}

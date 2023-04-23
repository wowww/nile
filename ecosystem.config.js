module.exports = {
  apps: [
    {
      name: 'nile-fe-markup',
      cwd: `${process.cwd()}`,
      script: '.yarn/releases/yarn-3.5.0.cjs',
      args: `start`,
      exec_mode: 'cluster',
      instances: 2,
      autorestart: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};

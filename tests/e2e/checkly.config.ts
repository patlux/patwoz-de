import { defineConfig } from 'checkly';

export default defineConfig({
  projectName: 'Personal Website Monitoring',
  logicalId: 'patwoz-dev',
  repoUrl: 'https://github.com/patlux/patwoz-de',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2023.02',
    locations: ['eu-central-1'],
    browserChecks: {
      frequency: 60 * 12,
      tags: ['website'],
      testMatch: './*.e2e.ts',
      environmentVariables: [
        {
          key: 'BASE_URL',
          value: 'https://patwoz.dev',
        },
      ],
    },
  },
  cli: {
    runLocation: 'eu-central-1',
  },
});

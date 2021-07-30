---
title: Create a custom task for mrm to setup prettier
published_at: 2021-07-30
tags: javascript, tooling, node, npm
layout: ../../layouts/til.astro
---

# Create a custom task for mrm to setup prettier

[mrm](https://github.com/sapegin/mrm) helps you to stay in sync with your configurations for your several projects.

I found it while setting up a new project with [lint-staged](https://github.com/okonet/lint-staged#installation-and-setup).

You can easily setup lint-staged with the following command:

```bash
npx mrm lint-staged
```

It will automatically setup everything for you: Install packages, change files...

## Create a custom task

You can easily create a custom task for mrm, too. So you don't have to repeat all the things you do for your fancy new projects :)

So let's start...

Create the folder `.mrm` and create a subfolder for your task:

```bash
mkdir -p ~/.mrm/prettier-patwoz
cd ~/.mrm/prettier-patwoz
touch index.js
```

Now open the created file `index.js` and insert the following:

```javascript
// @ts-check
const path = require('path');
const { uniq, flatten } = require('lodash');
const { json, packageJson, install, getStyleForFile, getExtsFromCommand } = require('mrm-core');

const packages = ['prettier', '@patwoz/prettier-config'];

function getPattern(pkg) {
  // We want to keep any extra extensions
  const prettierExts = getExtsFromCommand(pkg.getScript('format'));

  // ESLint extensions > TypeScript (.ts,.tsx) > .js
  const eslintExts = getExtsFromCommand(pkg.getScript('lint'), 'ext');
  const typeScriptExts = pkg.get('devDependencies.typescript') && ['ts', 'tsx'];
  const scriptExts = eslintExts || typeScriptExts || ['js'];

  // Stylelint extensions > .css
  const stylelintExts = getExtsFromCommand(pkg.getScript('lint:css'));
  const styleExts = stylelintExts || ['css'];

  const exts = uniq(flatten([prettierExts, scriptExts, styleExts, ['md']]).filter(Boolean));
  return `**/*.{${exts.join(',')}}`;
}

module.exports = function task() {
  const pkg = packageJson();
  const pattern = getPattern(pkg);

  pkg
    .setScript('prettier', `prettier --ignore-path .gitignore "${pattern}"`)
    .setScript('check-format', 'npm run prettier -- --list-different')
    .setScript('format', 'npm run prettier -- --loglevel warn --write')
    .merge({ prettier: '@patwoz/prettier-config' })
    .save();

  install(packages);
};

module.exports.description = 'Adds Prettier along with @patwoz/prettier-config';
```

The above script has some dependencies. We need a `package.json` in `.mrm` to install them..

```bash
cd ~/.mrm
npm init
# skip everything with "y"
npm install --save-dev lodash mrm-core
```

Now you can execute in all your projects `npx mrm prettier-patwoz` and it will setup prettier along with my custom prettier configuration `@patwoz/prettier-config`

Have fun ;)

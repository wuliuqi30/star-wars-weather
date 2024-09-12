#!/bin/bash
echo "Hello, World!"

npm install --save-dev webpack webpack-cli
npm install --save-dev html-webpack-plugin
npm install --save-dev style-loader css-loader
npm install --save-dev html-loader
npm install --save-dev webpack-dev-server

#! prettier formatter. to run, command: npx prettier . --write

npm install --save-dev --save-exact prettier
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"

# Linter: ESLint
npm init @eslint/config@latest

# babel (for making your code work on older browsers)
npm install -D babel-loader @babel/core @babel/preset-env webpack
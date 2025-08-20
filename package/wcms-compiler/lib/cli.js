#!/usr/bin/env node

const { program } = require('commander');
const { build } = require('../src/build');
const { compile } = require('../src/compile');
const { version } = require('../package.json');

program
  .name('wcms-compiler')
  .description('WCMS Compiler CLI')
  .version(version);

program
  .command('build')
  .description('Build the WCMS project')
  .action(() => {
    build();
  });

program
  .command('compile <url>')
  .description('Compile WCMS sources from a WCMS HTTPS URL')
  .action((url) => {
    compile(url);
  });

program.parse(process.argv);

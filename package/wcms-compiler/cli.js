#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const build_1 = require("./src/build");
const compile_1 = require("./src/compile");
const package_json_1 = require("./package.json");
commander_1.program
    .name('wcms-compiler')
    .description('WCMS Compiler CLI')
    .version(package_json_1.version);
commander_1.program
    .command('build')
    .description('Build the WCMS project')
    .action(() => {
    (0, build_1.build)();
});
commander_1.program
    .command('compile <url>')
    .description('Compile WCMS sources from a WCMS HTTPS URL')
    .action((url) => {
    (0, compile_1.compile)(url);
});
commander_1.program.parse(process.argv);

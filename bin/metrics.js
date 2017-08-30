#!/usr/bin/env node
const fs = require('fs');

const espree = require('espree');
const logger = {
  info: console.log
};

const JS_PATTERN = /\.js$/i;

/**
 * Parse a Javascript file
 *
 * @param {String} file
 * @param {Array} report
 * @return {Array}
 */
function parse(file, report = []) {
  logger.info({ file }, 'Parsing file');

  const content = fs.readFileSync(file).toString();
  const parsed = espree.parse(content, {
    ecmaVersion: 9,
    sourceType: 'module',
    loc: true,
    comment: true,
    attachComment: true
  });

  for (const comment of parsed.comments) {
    if (comment.value.indexOf('@metric') !== -1) {
      if (/@metric `/.test(comment.value)) {
        const match = comment.value.match(/@metric `(.*)` (.*)/i);
        report.push(Object.assign({}, report[file], {
          name: match[1],
          description: match[2]
        }));
      } else {
        const match = comment.value.match(/@metric ([^\s]+) (.*)/i);
        report.push(Object.assign({}, report[file], {
          name: match[1],
          description: match[2]
        }));
      }
    }
  }

  return report;
}

/**
 * Walk files in the source code
 *
 * @param {String} dir
 * @param {Array} [report=[]]
 * @returns {Array}
 */
function walk(dir, report = []) {
  logger.info({ dir }, 'Walking directory');

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      report = walk(filePath, report);
    } else if (stat.isFile() && JS_PATTERN.test(file)) {
      report = parse(filePath, report);
    }
  }

  return report;
}

function main(src = '.') {
  const report = walk(`${process.cwd()}/${src}`);

  logger.info({ report }, 'Generated report');

  let template = `# Metrics

Metric | Type | Comment |
---: | --- | --- |`;
  for (const metric of report) {
    template += `\n\`${metric.name}\` | increment | ${metric.description}`;
  }

  fs.writeFileSync(`${process.cwd()}/docs/metrics.md`, template);
}

console.log(process.cwd());

main(...process.argv.slice(2));

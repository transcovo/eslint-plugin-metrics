# eslint-plugin-metrics

[![Build Status](https://travis-ci.org/transcovo/eslint-plugin-metrics.svg?branch=master)](https://travis-ci.org/transcovo/eslint-plugin-metrics)

Check metrics definition

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-metrics`:

```
$ npm install eslint-plugin-metrics --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-metrics` globally.

## Usage

Add `metrics` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "metrics"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "metrics/metrics-definition": 2,
        "metrics/metrics-documentation": 2,
    }
}
```

## Supported Rules

* `metrics-definition`: Check that a single argument is used to increment a
  metric and that its type is `string` or `TemplateLitteral`.

```javascript
metrics.increment('server.started');
```

* `metrics-documentation`: Check that any `metrics.increment` is documented with
  the appropriate format:

```javascript
/**
 * @metric server.started Server has started
 */
metrics.increment('server.started');

// @metric server.started Server has started
metrics.increment('server.started');
```

## Bin

A tool is also available to generate the metrics inventory in `/docs/metrics.md`:

The script is:

```bash
node ./node_modules/eslint-plugin-metrics/bin/metrics.js ./src

# Or in npm context:
metrics ./src
```


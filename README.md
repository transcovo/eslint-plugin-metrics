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
        "metrics/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here






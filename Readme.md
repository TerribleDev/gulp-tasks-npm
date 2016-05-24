This package provides tasks to work with npm.

# Example

a very simple example looks like this 

```js
var gulp = require('gulp');
require('gulp-tasks-npm')(gulp);

```

a more complex example may look like this

```js
var gulp = require('gulp');
require('gulp-tasks-npm'(gulp, {
    
    user: "username",
    password: "password",
    buildVersion: "1.0.0",
    strictSsl: false,
    registery: "http://myprivateregistry"
});

```


# Api

## gulp-helper-npm(gulp, config)

#### config

#### config.user (optional)

Type: `string`
Default: undefined

The user to use. This could also come from other npm sources like .npmrc

#### config.password (optional)

Type: `string`
Default: undefined

The user to use. This could also come from other npm sources like .npmrc


#### config.buildVersion (optional)

Type: `string`
Default: undefined

a semvar version in a string if provided a task named `packageJson-mutateVersion` is added that will mutate your package.json file to add that version

 
#### config.email (optional)

Type: `string`
Default: undefined

the email to use with npm tasks

 
#### config.strictSsl (optional)

Type: `bool`
Default: true

use strict ssl or not 

#### config.registry (optional)

Type: `string`
Default: `https://registry.npmjs.org/`

the npm registery to use

#### config.npmObj (optional)

Type: `object`
Default: Calculated based on user input

Defines the npm configuration object we use to do npm operations. If undefined one is built from your previous inputs, which is the prefered method to interact with.

# Generated tasks

## packageJson-mutateVersion
if you pass a build version you will get a task `packageJson-mutateVersion` which will mutate your package.json with that version

## npm-install

do an npm install

## npm-publish

do an npm publish 
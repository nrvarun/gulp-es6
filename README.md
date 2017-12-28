# Boilerplate

## Boilerplate for frontend development
_SA--PU--ES = Sass + Pug + ES6 & automation_

The purpose of the SAPUES is to provide a consistent file structure with a normalized code and a collection of helpers and resets (soon).
 
# Features

## Pug as templating system
- Layouts and partials to power static websites

## Sass structure
- It follows SMACSS
- A simple font sizing : 1.6em = 16px
- A collection of variables to manage default sizing, fonts and colors

## Gulp to make life more funky
- Compiles `*.pug` pages
- Compiles `*.sass` files
- Prefixes css
- Bundles `*.js` files with [browserify](http://browserify.org/) and [Babeljs](http://babeljs.io)
- Minify css and uglify js
- Serves all files
- Synchronizes and reloads modifications across browsers

# Usage
  For sure the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) are required.

## Plug and play


```

### Play (with madness)

1. To start working and serving files run `gulp`
- Browsersync will prompt the server url (`localhost:3000`)
- You can now edit `*.sass` & `*.js` & `*.pug` files, `*.css` & `*.js` & `*.html` will be overwritten




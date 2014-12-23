# Xbox Game Voting

This is a static site used to vote on xbox games to purchase on a weekly basis. This is made as an assessment test for [The Nerdery](http://www.nerdery.com/ "The Nerdery") and is not a real site.

##Dependencies
* node.js
* grunt-cli

## Installation

First if you don't have Grunt installed run:

    npm install -g grunt-cli
    
Sass is needed to generate css run

    gem install sass -v 3.3.3
    
To install all Node dependencies run:

    npm install

## Commands

To generate all static assets needed run:

    grunt deploy

To generate static assets on the fly when coding run:

    grunt

To test all js run:

    grunt test
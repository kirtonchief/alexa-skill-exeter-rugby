# Alex Skill - Premiership Rugby Results, Fixtures and Table Standings.

This Alexa Skill will fetch results, fixture, and table information for Premiership Rugby teams.

It uses [Drop22 API](https://api.drop22.net/) to fetch results, fixtures and table information.

Defaults to Bath Rugby 🔵⚫️⚪️.

## Other Teams

In theory, this chat bot can be re-purposed to work with other teams by instantiating with one of the following team names:

- northampton saints
- exeter chiefs
- saracens
- bath rugby
- leicester tigers
- wasps
- sale sharks
- harlequins
- gloucester rugby
- newcastle falcons
- bristol rugby
- worcester warriors


## Production

This bot is running in production on Amazon Lambda

The first request may be slow as Drop22 is on a Heroku free dyno so will take a second to boot up.

## Development

We recommend developing on Node v4.3.2 as that is the version used by Amazon Lambda.

You can do this with nvm if you don't already have it.

    brew install nvm
    nvm install node
    nvm install 4.3


While we don't have tests at the moment, you can run the function locally with:

    ./node_modules/lambda-local/bin/lambda-local -l index.js -e data/events/fixture.js

This is currently set up with an example event that we would get from alexa with an Fixture event.

There are some configuration values that I haven't pulled out into environment
variables yet.

In index.js you will need to set:

- APP_ID


## Deploy code to Lambda

We have a smalls script that uses the aws-cli tool to deploy code changes to Lambda.

Assuming you have aws-cli already installed and configured, run:

    ./upload.sh

## Skill Configuration

This repository is just for the lambda function.

You will also need to create a Alexa Skill that triggers the function. This skill
will need intents and sample utterances defined. I've included them in the skills-assets
folder so that we can keep a track of them and copy them in to [https://developer.amazon.com/edw/home.html](https://developer.amazon.com/edw/home.html) when we want to re-configure.

### Testing

Mocha, Sinon and Chai are used to provide test coverage.

`npm tests`

#### Repurpose to Exeter Chiefs as Default

With Rob's encouragement, this is an attempt to produce an Extere Chiefs version of this skill


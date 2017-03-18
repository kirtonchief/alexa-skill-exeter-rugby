'use strict';

var Alexa = require('alexa-sdk');

var TransformAlexaMessage = require('./lib/transformAlexaMessage');
var FixtureAbility = require('./lib/ability/fixture');
var GreetingAbility = require('./lib/ability/greeting');
var ResultAbility = require('./lib/ability/result');
var TableAbility = require('./lib/ability/table');

const APP_ID = '';
const TEAM = 'bath rugby';

var SKILL_STATES = {
    RESULT: "_RESULT", // We've asked if they wish to know a result
};

var newSessionHandlers = {
    'LaunchRequest': function() {
        this.emit('Greeting');
    },

    'AMAZON.HelpIntent': function() {
        this.emit('Greeting');
    },

    'Greeting': function() {
        var ability = new GreetingAbility();
        ability.respond()
            .then(message => {
                this.handler.state = SKILL_STATES.RESULT;
                this.emit(':ask', message, 'Would you like to know their latest result?');
            })
            .catch(error => {
                this.emit(':tell', 'Sorry, I\'m not sure how to answer');
            })
    },

    'Fixture': function() {
        var ability = new FixtureAbility();
        var transformer = new TransformAlexaMessage();
        var message = transformer.transform(this.event, {'team': TEAM });

        ability.respond(message)
            .then(message => {
                this.emit(':tell', message);
            })
            .catch(error => {
                console.log(error);
                this.emit(':tell', 'Sorry, I\'m not sure how to answer');
            })
    },

    'Result': function() {
        var ability = new ResultAbility();
        var transformer = new TransformAlexaMessage();
        var message = transformer.transform(this.event, {'team': TEAM });

        ability.respond(message)
            .then(message => {
                this.emit(':tell', message);
            })
            .catch(error => {
                console.log(error);
                this.emit(':tell', 'Sorry, I\'m not sure how to answer');
            })
    },

    'Table': function() {
        var ability = new TableAbility();
        var transformer = new TransformAlexaMessage();
        var message = transformer.transform(this.event, {'team': TEAM });

        ability.respond(message)
            .then(message => {
                this.emit(':tell', message);
            })
            .catch(error => {
                console.log(error);
                this.emit(':tell', 'Sorry, I\'m not sure how to answer');
            })
    },
    'Unhandled': function() {
        this.emit(':tell', 'Sorry, I didn\'t get that. Try asking me for a fixture or result');
    }
};

var resultStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.RESULT, {
    "AMAZON.YesIntent": function() {
        this.handler.state = '';
        this.emitWithState("Result");
    },
    "AMAZON.NoIntent": function() {
        this.emit(":tell", 'Ok');
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", 'Ok');
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", 'Ok');
    },
    'Unhandled': function() {
        this.emit(':tell', 'Say yes to get a result or no to stop.');
    }
});

resultStateHandlers = Object.assign(resultStateHandlers, newSessionHandlers);

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(newSessionHandlers, resultStateHandlers);
    alexa.execute();
};

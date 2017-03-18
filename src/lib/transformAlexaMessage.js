'use strict';

var Entity = require('./entity');
var Intent = require('./intent');
var Message = require('./message');

/**
 * Translate Alexa request into internal message
 */
class TransformAlexaMessage {

    /**
     * Transform alexa event into Message
     * @param request - Alexa Request
     * @return {Promise<Messsage, Error>} Message with analysis
     */
    transform(event, context) {
        var intents = [new Intent(event.request.intent.name, 1)];
        var entities = [];

        var slots = event.request.intent.slots;
        for (let slot in slots) {
            if (slots[slot]['value']) {
                entities.push(new Entity(slots[slot]['name'], slots[slot]['value']))
            }
        }

        return new Message(
            'alexa',
            event.session.sessionId,
            event.request.requestId,
            event.request.timestamp,
            event.session.user.userId,
            context,
            '',
            null,
            intents,
            entities);
        }
}

module.exports = TransformAlexaMessage;

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var stream = T.stream('user');

//listening to the streamig of the user's direct messages.
// On event of an incoming DM, it defines variables with the message text and the screen name of the sender
stream.on('direct_message', function (eventMsg) {
  var msg = eventMsg.direct_message.text;
  var screenName = eventMsg.direct_message.sender.screen_name;

//If the screen name of the sender is Your_ScreenName it tweets the content of the DM
if (screenName === 'Your_ScreenName') {
    return T.post('statuses/update', { status: msg},
//and reply to the DM with a confirmation that everything is ok!
    function () {
      return T.post('direct_messages/new', {
        screen_name: screenName,
        text: 'Done!'})
    });
  }
});

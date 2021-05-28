const fs = require('fs');
const venom = require('venom-bot');
const UUID = require('uuid');

module.exports = {


  friendlyName: 'create_client',


  description: '通过输入手机信息，生成二维码',


  extendedDescription:
    `通过输入的手机信息，确定出错的手机`,


  inputs: {

    phone_message: {
      description: 'The message to try in this attempt, e.g. "2-1-1".',
      type: 'string',
      required: true
    },
  },


  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
      extendedDescription:
        `Under the covers, this stores the id of the logged-in user in the session
  as the \`userId\` key.  The next time this user agent sends a request, assuming
  it includes a cookie (like a web browser), Sails will automatically make this
  user id available as req.session.userId in the corresponding action.  (Also note
  that, thanks to the included "custom" hook, when a relevant request is received
  from a logged-in user, that user's entire record from the database will be fetched
  and exposed as \`req.me\`.)`
    },

    badCombo: {
      description: `The provided email and password combination does not
        match any user in the database.`,
      responseType: 'unauthorized'
    }

  },

  clients: async function (req, res) {
    var size = clients.length;

  },

  view: async function (req, res) {
    return res.view('pages/sulla/client', { "userId": req.session.userId });
  },


  create: async function (req, res) {
    var sql = {};
    var whereCondition = {};
    whereCondition.phoneInfo = req.get('phone_message');
    whereCondition.clientState = '1';

    sql.where = whereCondition;
    var query = ClientInfo.find(sql);
    query.exec(function (err, clients) {
      console.log('find data error:' + err);
      if (!err & clients.length > 0) {
        return 'success';
      }
    });
    var sessionName = UUID.v1();
    venom.create(
      sessionName,
      (base64Qr, asciiQR, attempts, urlCode) => {
        console.log(asciiQR); // Optional to log the QR in the terminal
        console.log(attempts);
        console.log(urlCode);
        var msg = {};
        msg['url'] = urlCode;
        return res.json(msg);
      },
      (statusSession, session) => {
        console.log('Status Session: ', statusSession);
        //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
        //Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);

      },
      { useChrome: false, browserArgs: ['--no-sandbox'], logQR: false }
    )
      .then((client) => {

        clientJson = {};
        clientJson.session = sessionName;
        clientJson.client = client;
        require('../../../config/ClientConfig').Add(clientJson);
        ClientInfo.create({
          session: sessionName,
          userID: req.session.userId,
          clientState: 1,
          phoneInfo: whereCondition.phoneInfo,
        }).fetch();
        // function to detect incoming call
        client.onIncomingCall(async (call) => {
          console.log(call);
          client.sendText(call.peerJid, "Sorry, I still can't answer calls");
        });

      })
      .catch((err) => {
        console.log(err)
      })
  }



};

module.exports = {


  friendlyName: 'Signup',


  description: 'Sign up for a new user account.',


  extendedDescription:
`This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,


  inputs: {

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    fullName:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    }

  },


  exits: {

    success: {
      description: 'New user account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function ({password, fullName}) {

    // Build up dat for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var date = formatterDateAll(new Date());
    var newUserRecord = await User.create({
      fullName:fullName,
      password: await sails.helpers.passwords.hashPassword(password),
      lastLoginIp: this.req.ip,
      lastLoginTime: date
    }).fetch();
    console.log(newUserRecord);
    // Store the user's new id in their session.
    this.req.session.userId = newUserRecord.id;

  }

};

function formatterDateAll(date) {
  var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
      + (date.getMonth() + 1);
  var hor = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  return date.getFullYear() + '-' + month + '-' + day + " " + hor + ":" + min + ":" + sec;
}
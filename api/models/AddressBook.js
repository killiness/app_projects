/**
 * User.js
 *
 * A user who can log in to this application.
 */

 module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  
  
      countryCode: {
        type: 'string',
        description: 'code info',
        maxLength: 10,
        example: '86'
      },
  
  
      phoneNumber: {
        type: 'string',
        description: '号码',
      },
  
     
      messageID: {
        type: 'number',
        columnType:'int',
        description: 'message',
      },
  
      userID: {
        type: 'number',
        columnType:'int',
        description: 'user'
      },
  
    },
  
  
  };
  
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
  
  
      content: {
        type: 'string',
        required: true,
        description: 'message info',
        maxLength: 1000,
        example: 'Mary Sue van der McHenst'
      },
  
  
      totalSend: {
        type: 'number',
        columnType:'int',
        description: '总发送数量',
      },
  
      state: {
        type: 'number',
        columnType:'int',
        description: '当前状态',
      },
     
      send: {
        type: 'number',
        columnType:'int',
        description: '已发送数量',
      },
  
      isRandomSend:{
          type:'boolean',
          description: '随机发送',
      },

      userID: {
        type: 'number',
        columnType:'int',
        description: '已发送数量'
      },
     
      //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
      //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
      //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
      // n/a
  
      //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
      //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
      //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
      // n/a
  
    },
  
  
  };
  
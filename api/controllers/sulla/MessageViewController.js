module.exports = {

  friendlyName: 'message info',


  description: 'message add info',


  exits: {

    success: {
      viewTemplatePath: 'pages/sulla/message',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  view: async function (req,res) {

    return res.view();

  }


};

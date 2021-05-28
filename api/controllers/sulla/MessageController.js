
module.exports = {


    friendlyName: 'message_create',


    description: '新建msg',


    extendedDescription:
        `通过生成msg，来开始任务`,


    inputs: {

        content: {
            type: 'string',
            description: 'message info',
        },

        totalSend: {
            type: 'number',
            description: '总发送数量',
        },

        isRandomSend: {
            type: 'boolean',
            description: '随机发送',
        },

        userId: {
            type: 'number',
            description: 'user',
        },


    },


    exits: {

        success: {
            description: 'New user account was created successfully.'
        },

        invalid: {
            responseType: 'badRequest',
            description: 'The provided fullName, password and/or email address are invalid.',
            extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
                'parameters should have been validated/coerced _before_ they were sent.'
        },

        emailAlreadyInUse: {
            statusCode: 409,
            description: 'The provided email address is already in use.',
        },
    },

    view: async function (req, res) {
        return res.view('pages/sulla/message', { "userId": req.session.userId });
    },
    // {content, totalSend, isRandomSend,userId}

    create: async function (req, res) {

        var values = req.body;
        var content = values.content;
        var totalSend = values.totalSend;
        var isRandomSend = values.isRandomSend;
        var userId = values.userId;

        console.log("content :" + values);

        var msgInfo = await MessageInfo.create({
            content: content,
            totalSend: totalSend,
            isRandomSend: isRandomSend,
            userID: userId,
            state:1
        }).fetch();

        console.log(msgInfo);
        var success = {};
        success.description = "New Message was created successfully";
        return res.json(success);

    }



};

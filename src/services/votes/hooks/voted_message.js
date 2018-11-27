module.exports = async (context) => {
    const roomsModel = context.app.service('rooms').Model;

    const room = await roomsModel.findOne({
        where: { id: context.data.roomId }
    });

    if (room.roomType != 'rank') {
        context.app.service('messages').create({
            roomId: context.data.roomId,
            type: 'system',
            text: context.params.user.email + ' has voted!'
        },
            context.params
        );
    }

    return context;
}
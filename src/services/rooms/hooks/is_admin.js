module.exports = () => context => {
  context.result.data.forEach((room, index) => {
    room.users.forEach((user) => {
      if (user.id == context.params.user.id) {
        if (user.role.admin) {
          context.result.data[index].dataValues.isAdmin = true;
        } else {
          context.result.data[index].dataValues.isAdmin = false;
        }
      }
    });
  });

  return (context);
};


const mapUsersToModel = ({
  id, username, password, fullname,
}) => ({
  id,
  username,
  password,
  fullname,
});

module.exports = { mapUsersToModel };

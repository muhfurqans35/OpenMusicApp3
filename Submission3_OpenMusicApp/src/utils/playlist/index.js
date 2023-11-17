const mapDBToModelPlaylist = ({
  id, name, song, username,
}) => ({
  id,
  name,
  song,
  username,
});
module.exports = { mapDBToModelPlaylist };

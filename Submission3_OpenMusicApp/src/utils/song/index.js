/* eslint-disable camelcase */
const mapDBToModelSong = ({
  id, title, year, genre, performer, duration, album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
});
module.exports = { mapDBToModelSong };

/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('playlistsongs', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'playlistsongs',
    'unique_playlist_id_and_song_id',
    'UNIQUE(playlist_id, song_id)',
  );

  pgm.addConstraint(
    'playlistsongs',
    'fk_playlists.playlist.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON UPDATE CASCADE ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'playlistsongs',
    'fk_playlists.song.id',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON UPDATE CASCADE ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlistsongs');
};

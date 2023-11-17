const routes = (handler) => [
  // postSongHandler hanya menerima dan menyimpan "satu" song.
  {
    method: 'POST',
    path: '/songs',
    handler: (request, h) => handler.postSongHandler(request, h),
  },
  // getSongsHandler mengembalikan "banyak" song.
  {
    method: 'GET',
    path: '/songs',
    handler: (request, h) => handler.getSongsHandler(request, h),
  },
  // getSongByIdHandler mengembalikan "satu" song.
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: (request, h) => handler.getSongByIdHandler(request, h),
  },

  // putSongByIdHandler hanya menerima dan mengubah "satu" song.
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: (request, h) => handler.putSongByIdHandler(request, h),
  },
  // deleteSongByIdHandler menghapus "satu" song.
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: (request, h) => handler.deleteSongByIdHandler(request, h),
  },
];

module.exports = routes;

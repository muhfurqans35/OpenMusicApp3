const routes = (handler) => [
  // postAlbumHandler hanya menerima dan menyimpan "satu" album.
  {
    method: 'POST',
    path: '/albums',
    handler: (request, h) => handler.postAlbumHandler(request, h),
  },
  // getAlbumsHandler mengembalikan "banyak" album.
  {
    method: 'GET',
    path: '/albums',
    handler: (request, h) => handler.getAlbumsHandler(request, h),
  },
  // getAlbumByIdHandler mengembalikan "satu" album.
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: (request, h) => handler.getAlbumByIdHandler(request, h),
  },
  // putAlbumByIdHandler hanya menerima dan mengubah "satu" album.
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: (request, h) => handler.putAlbumByIdHandler(request, h),
  },
  // deleteAlbumByIdHandler menghapus "satu" album.
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: (request, h) => handler.deleteAlbumByIdHandler(request, h),
  },

  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: (request, h) => handler.postAlbumLikeHandler(request, h),
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}/likes',
    handler: (request, h) => handler.deleteAlbumLikeHandler(request, h),
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: (request, h) => handler.getAlbumLikesHandler(request, h),
  },
];

module.exports = routes;

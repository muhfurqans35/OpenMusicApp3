class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const albumId = await this._service.addAlbum(request.payload);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumsHandler() {
    const albums = await this._service.getAlbums();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    const songs = await this._service.getAlbumContainSong(id);

    return {
      status: 'success',
      data: {
        album: {
          ...album,
          songs,
        },
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }

  async postAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    const album = await this._service.getAlbumById(id);
    const isLiked = await this._service.isAlbumLikedByUser(credentialId, id);

    if (!isLiked) {
      await this._service.addLike(credentialId, id);

      const response = h.response({
        status: 'success',
        message: `Album ${album.name} berhasil disukai`,
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: `Batal memberi like pada album ${album.name}`,
    });
    response.code(400);
    return response;
  }

  async deleteAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.deleteLike(credentialId, id);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  async getAlbumLikesHandler(request, h) {
    const { id } = request.params;

    const result = await this._service.getLikesByAlbumId(id);

    const response = h.response({
      status: 'success',
      data: {
        likes: result.likes,
      },
    });
    response.code(200);

    if (result.cache) {
      response.header('X-Data-Source', 'cache');
    }

    return response;
  }
}

module.exports = AlbumsHandler;

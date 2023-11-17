class UploadsHandler {
  constructor(service, albumsService, validator) {
    this._service = service;
    this._albumsService = albumsService;
    this._validator = validator;
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;

    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._service.writeFile(cover, cover.hapi);

    await this._albumsService.addAlbumCover(
      id,
      `http://${process.env.HOST}:${process.env.PORT}/albums/${id}/covers/${filename}`,
    );

    const response = h.response({
      status: 'success',
      message: 'Cover berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;

import HttpStatus from 'http-status-codes';

const BasicResponse = {
  success: false,
};

export class ResponseConfig {
  static get HTTP_STATUS() {
    return HttpStatus;
  }

  static middlewareResponse(req, res, next) {
    res.onSuccess = ResponseConfig.getDefaultResponseHandler(res).onSuccess;
    res.onError = ResponseConfig.getDefaultResponseHandler(res).onError;
    return next();
  }

  static getDefaultResponseHandler(res) {
    return {
      onSuccess(data, meta, message, code) {
        ResponseConfig.respondWithSuccess(
          res,
          code || ResponseConfig.HTTP_STATUS.OK,
          data,
          meta,
          message,
        );
      },
      onError(error) {
        ResponseConfig.respondWithError(
          res,
          error.status || 500,
          error.message || 'Unknown error',
        );
      },
    };
  }

  static respondWithSuccess(res, code, result, meta, message) {
    const rs = {
      success: true,
      message,
      result,
      meta,
    };
    return res.status(code).json({ ...BasicResponse, ...rs });
  }

  static respondWithError(res, errorCode, message) {
    const rs = {
      success: false,
      message,
    };
    res.status(errorCode).json({ ...BasicResponse, ...rs });
  }
}

class ResponseMessage {
  constructor() {
  }

  createErrorMessage(msg) {
    this.error = msg;
  }

  addToken(token) {
    this.token = token;
  }
}

exports.class = ResponseMessage;

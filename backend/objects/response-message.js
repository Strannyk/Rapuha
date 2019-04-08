class ResponseMessage {
  createErrorMessage(msg) {
    this.error = msg;
  }

  addToken(token) {
    this.token = token;
  }
}

module.exports = ResponseMessage;

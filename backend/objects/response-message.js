class ResponseMessage {
  createErrorMessage(msg) {
    this.error = msg;
  }

  createAccessTokenMessage(token) {
    this.token = token;
  }

  createSuccessMessage() {
    this.ok = true;
  }
}

module.exports = ResponseMessage;

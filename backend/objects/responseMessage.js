class ResponseMessage {
  createErrorMessage(msg) {
    this.error = msg;
  }

  createAccessTokenMessage(token) {
    this.token = token;
  }

  createTokenExpiredMessage() {
    this.tokenExpired = true;
  }

  createSuccessMessage() {
    this.ok = true;
  }
}

module.exports = ResponseMessage;

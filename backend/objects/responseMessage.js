class ResponseMessage {
  createSuccessMessage() {
    this.ok = true;
  }

  createDataMessage(data) {
    this.data = data;
  }

  createErrorMessage(msg) {
    this.error = msg;
  }

  createAccessTokenMessage(token) {
    this.token = token;
  }

  createTokenExpiredMessage() {
    this.tokenExpired = true;
  }
}

module.exports = ResponseMessage;

const dateService = {
  getCurrentDate: function () {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const date = currentDate.getDate();
    let month = String(currentDate.getMonth() + 1);

    month = month.length === 1 ? 0 + month : month;

    return year + '-' + month + '-' + date;
  }
};

module.exports = dateService;

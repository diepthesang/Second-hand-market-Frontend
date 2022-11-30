const { default: axios } = require("axios");

module.exports = {
  updatePriceEnd: async (postId, priceEnd) => {
    try {
      await axios.put(
        "/user/updatePriceEnd",
        {
          postId,
          priceEnd: localStorage["highest_bid_price"],
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
    } catch (error) {
      console.log("err_updatePriceEnd:::", error);
    }
  }

}
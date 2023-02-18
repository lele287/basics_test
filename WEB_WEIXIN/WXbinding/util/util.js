//重置商店
function updateShop(store_info) {
  var uriPrefix = getApp().globalData.uriPrefix;
  var client_id = getApp().globalData.client.id;
  
  wx.request({
    url: uriPrefix + 'FindShop',
    data: { client_id: client_id, store_info: store_info },
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        getApp().globalData.shop = res.data[0]
      } else {

      }
    }
  })
}
/**
 * 得到已经安装的设备
 */

function getInstallEquipment() {
  var uriPrefix = getApp().globalData.uriPrefix;
  
}
/**
 * 得到已派发未安装的设备
 */
function getDistributeEquipment() {
  var uriPrefix = getApp().globalData.uriPrefix;

}
module.exports = {
  updateShop: updateShop,
  getInstallEquipment: getInstallEquipment,
  getDistributeEquipment:getDistributeEquipment

}
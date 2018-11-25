function loadItemBarcode(){
  return [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2',
  'ITEM000005',
  'ITEM000005',
  'ITEM000005'
  ]
}

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      unit: 'kg',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: 'Litchi',
      unit: 'kg',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      unit: 'box',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}

function getUniqueGoodListWithQuantity(InventoryList, barcodeList){
  let pureBarcodeList = barcodeList.map(barcode => barcode.split('-')[0])
  let uniquePureBarcodeList = pureBarcodeList.filter((barcode, pos) => pureBarcodeList.indexOf(barcode) == pos)
  let uniqueInventoryListOnRecipt = InventoryList.filter(inventory => uniquePureBarcodeList.includes(inventory.barcode));
  uniqueInventoryListOnRecipt.forEach(inventory => inventory.quantity = 0)

  barcodeList.forEach(barcode => barcode.includes('-') ? uniqueInventoryListOnRecipt.find(inventory => inventory.barcode === barcode.split("-")[0]).quantity += parseFloat(barcode.split('-')[1]) : (uniqueInventoryListOnRecipt.forEach(inventory => inventory.barcode === barcode?inventory.quantity += 1 : 0 )))

  let uniqueGoodListWithQuantity = uniqueInventoryListOnRecipt

  return uniqueGoodListWithQuantity;
}

function getSubtotal(uniqueGoodListWithQuantity, discountList){
  uniqueGoodListWithQuantity.forEach(goods =>
  discountList.forEach(discount =>
    (discount.type === 'BUY_TWO_GET_ONE_FREE') ? (discount.barcodes.includes(goods.barcode) ? goods.subtotal = goods.price * (goods.quantity - parseInt(goods.quantity / 3)) : goods.subtotal = goods.price * goods.quantity ) : null )
  )
  let goodListWithSubtotal = uniqueGoodListWithQuantity
  return goodListWithSubtotal
}

function getAllReceiptGoodsInfo(barcodeList, InventoryList, discountList){
  let uniqueGoodListWithQuantity = getUniqueGoodListWithQuantity(InventoryList, barcodeList)
  let goodListWithSubtotal = getSubtotal(uniqueGoodListWithQuantity, discountList)
  let allReceiptGoodsInfo = goodListWithSubtotal
  return allReceiptGoodsInfo
}

function countTotalPrice(allReceiptGoodsInfo){
  let totalPrice = 0
  allReceiptGoodsInfo.forEach(goods => totalPrice += goods.subtotal)
  return totalPrice
}

function countSaving(allReceiptGoodsInfo){
  let saving = 0
  allReceiptGoodsInfo.forEach(goods => saving += (goods.price * goods.quantity) - goods.subtotal)
  return saving
}

function createReceipt(allReceiptGoodsInfo, totalPrice){
  let receipt = `***<store earning no money>Receipt ***\n`
  allReceiptGoodsInfo.forEach(goods =>
    {
    receipt += `Name: ${goods.name}, Quantity: ${goods.quantity} ${goods.unit}, Unit price: ${goods.price.toFixed(2)} (yuan), Subtotal: ${goods.subtotal.toFixed(2)} (yuan)\n`
    }
  )
  receipt += `----------------------\nTotal: ${totalPrice.toFixed(2)} (yuan)\nSaving: ${countSaving(allReceiptGoodsInfo).toFixed(2)} (yuan)\n**********************`
  return receipt
}

function printReceipt(barcodeList, InventoryList, discountList){
  let allReceiptGoodsInfo = getAllReceiptGoodsInfo(barcodeList, InventoryList, discountList)
  let totalPrice = countTotalPrice(allReceiptGoodsInfo)
  let receipt = createReceipt(allReceiptGoodsInfo, totalPrice)
  return receipt
}

module.exports = {getUniqueGoodListWithQuantity, getSubtotal, getAllReceiptGoodsInfo, countTotalPrice, countSaving, createReceipt, printReceipt}

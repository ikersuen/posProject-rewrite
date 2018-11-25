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
  let pureBarcodeList = barcodeList.map(barcode => barcode.split("-")[0])
  let uniquePureBarcodeList = pureBarcodeList.filter((barcode, pos) => pureBarcodeList.indexOf(barcode) == pos)
  let uniqueInventoryListOnRecipt = InventoryList.filter(inventory => uniquePureBarcodeList.includes(inventory.barcode));
  uniqueInventoryListOnRecipt.forEach(inventory => inventory.quantity = 0)

  barcodeList.forEach(barcode => barcode.includes('-') ? uniqueInventoryListOnRecipt.find(inventory => inventory.barcode === barcode.split("-")[0]).quantity += parseFloat(barcode.split("-")[1]) : (uniqueInventoryListOnRecipt.forEach(inventory => inventory.barcode === barcode?inventory.quantity += 1 : 0 )))

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

module.exports = {getUniqueGoodListWithQuantity, getSubtotal}

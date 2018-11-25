var printReceipt = require('../main');

it ('getUniqueGoodListWithQuantity', () => {

  let expected = [
    {
      'barcode': 'ITEM000001',
      'name': 'Sprite',
      'unit': 'bottle',
      'price': 3.00,
      'quantity': 5.00
    },
    { 'barcode': 'ITEM000003',
      'name': 'Litchi',
      'unit': 'kg',
      'price': 15.00,
      'quantity': 2.00
    },
    { 'barcode': 'ITEM000005',
      'name': 'Noodles',
      'unit': 'bag',
      'price': 4.50,
      'quantity': 3.00
    }
  ];

	expect(printReceipt.getUniqueGoodListWithQuantity(loadAllItems(), loadItemBarcode())).toEqual(expected);
});

it ('getSubtotal', () => {
  let uniqueGoodListWithQuantity = printReceipt.getUniqueGoodListWithQuantity(loadAllItems(), loadItemBarcode());
  let expected = [ { barcode: 'ITEM000001',
    name: 'Sprite',
    unit: 'bottle',
    price: 3,
    quantity: 5,
    subtotal: 12 },
  { barcode: 'ITEM000003',
    name: 'Litchi',
    unit: 'kg',
    price: 15,
    quantity: 2,
    subtotal: 30 },
  { barcode: 'ITEM000005',
    name: 'Noodles',
    unit: 'bag',
    price: 4.5,
    quantity: 3,
    subtotal: 9 }
  ]
    expect(printReceipt.getSubtotal(uniqueGoodListWithQuantity, loadPromotions())).toEqual(expected);
});

it ('getAllReceiptGoodsInfo', () => {
  let expected = [ { barcode: 'ITEM000001',
    name: 'Sprite',
    unit: 'bottle',
    price: 3,
    quantity: 5,
    subtotal: 12 },
  { barcode: 'ITEM000003',
    name: 'Litchi',
    unit: 'kg',
    price: 15,
    quantity: 2,
    subtotal: 30 },
  { barcode: 'ITEM000005',
    name: 'Noodles',
    unit: 'bag',
    price: 4.5,
    quantity: 3,
    subtotal: 9 }
  ]
    expect(printReceipt.getAllReceiptGoodsInfo(loadItemBarcode(), loadAllItems(), loadPromotions())).toEqual(expected);
});

it ('countTotalPrice', () => {
  let allReceiptGoodsInfo = printReceipt.getAllReceiptGoodsInfo(loadItemBarcode(), loadAllItems(), loadPromotions());

  expect(printReceipt.countTotalPrice(allReceiptGoodsInfo)).toBe(51);

});

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

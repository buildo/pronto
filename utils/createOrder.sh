#create orders with id = FIRST_ARGUMENT

curl -X PUT https://pronto-9842a.firebaseio.com/orders/$1.json \
  -H 'Content-Type: application/json' \
  -d '{"123123":{"createdAt":1465682392,"peopleOrders":{"claudio":{"orderItems":["insalata","vodka"]},"gio":{"orderItems":["carbonara"]},"stefano":{"orderItems":["carbonara","vodka"]}},"referencePhoneNumber":"666 666 666","status":"submitted"}}'

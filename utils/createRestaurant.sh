#create restaurant with id = FIRST_ARGUMENT

curl -X PUT https://pronto-9842a.firebaseio.com/restaurants/$1.json \
  -H 'Content-Type: application/json' \
  -d '{"address":"via fasf e","description":"DASUDHAJHSGDA","imgUrl":"https://s-media-cache-ak0.pinimg.com/736x/82/0f/52/820f526af6dc24cda8b67b3ddf688532.jpg","maxPeopleNumber":10,"menu":{"description":"menu primi 8 euro complet","groups":[{"description":"primi","items":[{"name":"spaghetti alla carbonara","shortName":"carbo"}]},{"description":"secondi","items":[{"name":"ceci","shortName":"c"}]}]},"name":"risto","open":false,"telephone":"66666"}'

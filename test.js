wrapAsync = (Meteor.wrapAsync)? Meteor.wrapAsync: Meteor._wrapAsync;

Tinytest.add("getCollection on normal collection", function(test) {
  var coll = new Mongo.Collection(Random.id());
  coll.remove({});
  var doc = {_id: "aa", age: 20};
  coll.insert(doc);

  var coll = coll._getCollection();
  var dbDoc = wrapAsync(coll.findOne.bind(coll))();

  test.equal(dbDoc, doc);
});

Tinytest.add("getCollection on Meteor.users", function(test) {
  Meteor.users.remove({});
  var doc = {_id: "aa", age: 20};
  Meteor.users.insert(doc);

  var coll = Meteor.users._getCollection();
  var dbDoc = wrapAsync(coll.findOne.bind(coll))();

  test.equal(dbDoc, doc);
});
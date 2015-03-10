var Future = Npm.require('fibers/future');

var originalOpen = MongoInternals.RemoteCollectionDriver.prototype.open;
MongoInternals.RemoteCollectionDriver.prototype.open = function(name) {
  var self = this;
  var ret = originalOpen.call(this, name);
  ret._getDb = wrapWithDb(this.mongo);

  return ret;
};

Mongo.Collection.prototype._getDb = function() {
  if(typeof this._collection._getDb == 'function') {
    return this._collection._getDb();
  } else {
    // if we can't find `_getDb()`, that means this is
    // a collection created before initializing this collection
    // if so, use the default mongo connection
    //    eg:- Meteor.users
    var mongoConn = MongoInternals.defaultRemoteCollectionDriver().mongo;
    return wrapWithDb(mongoConn);
  }
};

Mongo.Collection.prototype._getCollection = function() {
  var db = this._getDb();
  return db.collection(this._name);
}

function wrapWithDb(mongoConn) {
  // With Meteor 1.0.4, db creation is synchronous and wait in the connection
  // constructor. So, we can get it like this.
  if(mongoConn.db) {
    return mongoConn.db;
  }

  // This is for Meteor versions older than 1.0.4
  var f = new Future();
  mongoConn._withDb(function(db) {
    f.return(db);
  });
  return f.wait();
}
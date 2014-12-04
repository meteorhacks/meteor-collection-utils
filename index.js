var originalOpen = MongoInternals.RemoteCollectionDriver.prototype.open;
MongoInternals.RemoteCollectionDriver.prototype.open = function(name) {
  var self = this;
  var ret = originalOpen.call(this, name);
  ret._getCollection = this.mongo._getCollection.bind(this.mongo, name);
  return ret;
};

Mongo.Collection.prototype._getCollection = function() {
  if(typeof this._collection._getCollection == 'function') {
    return this._collection._getCollection();
  } else {
    // if we can't find `_getCollection()`, that means this is 
    // a collection created before initializing this collection
    // if so, use the default mongo connection
    //    eg:- Meteor.users
    var mongoConn = MongoInternals.defaultRemoteCollectionDriver().mongo;
    return mongoConn._getCollection(this._name);
  }
}
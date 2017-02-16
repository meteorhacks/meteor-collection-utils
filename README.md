# DEPRECATED.  Use `Mongo.Collection.rawCollection` and `Mongo.Collection.rawDatabase` instead.

# meteorhacks:collection-utils

Exposes some internal `Mongo Connection` apis into `Mongo.Connection`.

Currently exposed methods:

### Mongo.Collection.prototype._getDb

To get the internal node mongodb database

~~~js
var Apps = new Mongo.Collection('apps');
var db = Apps._getDb();
~~~

### Mongo.Collection.prototype._getCollection

To get the internal node collection object

~~~js
var Apps = new Mongo.Collection('apps');
var nodeColl = Apps._getCollection();
~~~


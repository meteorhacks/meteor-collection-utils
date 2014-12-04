# meteorhacks:collection-utils

Exposes some internal `Mongo Connection` apis into `Mongo.Connection`.

Currently exposed methods:

### Mongo.Collection.prototype._getCollection

To get the internal node collection object

~~~js
var Apps = new Mongo.Collection('apps');
var nodeColl = Apps._getCollection();
~~~


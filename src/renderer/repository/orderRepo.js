import db from "../database/connection";

class OrderRepo {
  constructor() {
    this.order = db.hdOrders;
  }
  save(order) {
    return new Promise((resolve, reject) => {
      try {
        order['deletedAt'] = null;
        this.order.insert(order, function(err, data) {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(data);
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  update(order, id) {
    return new Promise((resolve, reject) => {
      try {
        this.order.update({ _id: id }, order, {}, function(err, numReplaced) {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(numReplaced);
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  async get(id = null, params=null) {
    return new Promise((resolve, reject) => {
      try {
        if (id) {
          this.order.findOne({ _id: id }, function(err, order) {
            if (err) {
              reject(err.stack);
            }
            resolve(order);
          });
        } else {
          let result = {};
          this.order.count({}, function (err, count) {
            result['total'] = count;
          });
          let page = params ? (params['page'] - 1) : 0;
          let limit = params ? params['size'] : 6;
          let skip = page*limit;
          this.order.find({ "deletedAt": null }).sort({ orderNo: -1}).skip(skip).limit(limit).exec(function(err, order) {
            if (err) {
              reject(err.stack);
            }
            result['orders'] = order;
            resolve(result);
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  trash(id) {
    return new Promise((resolve, reject) => {
      try {
        this.order.update({ _id: id }, { $set: {deletedAt: Date()} }, (err, numUpdated) => {
          if (err) {
            reject(err);
          }
          resolve(numUpdated);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  destroy(id) {
    return new Promise((resolve, reject) => {
      try {
        this.order.remove({ _id: id }, {}, (err, numRemoved) => {
          if (err) {
            reject(err);
          }
          resolve(numRemoved);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getorderNo () {
    return new Promise((resolve, reject) => {
      try {
        this.order.count({}, function (err, count) {
          if (err) {
            reject(err);
          }
          resolve(count+1);
        });
      } catch (e) {
        reject(e);
      } 
    });
  }
}
export default new OrderRepo();

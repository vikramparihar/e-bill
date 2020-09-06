import db from "../database/connection";

class CustomerRepo {
  constructor() {
    this.customer = db.customers;
  }
  save(customer) {
    return new Promise((resolve, reject) => {
      try {
        this.customer.insert(customer, function(err, data) {
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
  update(customer, id) {
    return new Promise((resolve, reject) => {
      try {
        this.customer.update({ _id: id }, customer, {}, function(err, numReplaced) {
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
          this.customer.findOne({ _id: id }, function(err, customer) {
            if (err) {
              reject(err.stack);
            }
            resolve(customer);
          });
        } else {
          let result = {};
          this.customer.count({}, function (err, count) {
            result['total'] = count;
          });
          let page = params ? (params['page'] - 1) : 0;
          let limit = params ? params['size'] : 6;
          let skip = page*limit;
          this.customer.find().sort({ billNo: -1}).skip(skip).limit(limit).exec(function(err, customer) {
            if (err) {
              reject(err.stack);
            }
            result['customers'] = customer;
            resolve(result);
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  destroy(id) {
    return new Promise((resolve, reject) => {
      try {
        this.customer.remove({ _id: id }, {}, (err, numRemoved) => {
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

  async hascustomerByName(name, except = null) {
    return new Promise((resolve, reject) => {
      try {
        if (except) {
          this.customer.find({ name: name }, function(err, docs) {
            if (err) {
              reject(err);
            }
            if (docs.length) {
              let count = 0;
              for (const doc of docs) {
                if (doc._id === except) {
                  continue;
                }
                count++;
              }
              if (count > 0) {
                resolve(true);
              }
              resolve(false);
            }
            resolve(false);
          });
        } else {
          this.customer.find({ name: name }, function(err, docs) {
            if (err) {
              reject(err);
            }
            if (docs.length) {
              resolve(true);
            }
            resolve(false);
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
export default new CustomerRepo();

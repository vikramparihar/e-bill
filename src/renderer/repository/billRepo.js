import db from "../database/connection";

class Bill {
  constructor() {
    this.bill = db.bill;
  }
  save(bill) {
    return new Promise((resolve, reject) => {
      try {
        bill['deletedAt'] = null;
        this.bill.insert(bill, function(err, data) {
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
  update(bill, id) {
    return new Promise((resolve, reject) => {
      try {
        this.bill.update({ _id: id }, bill, {}, function(err, numReplaced) {
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
  async get(id = null) {
    return new Promise((resolve, reject) => {
      try {
        if (id) {
          this.bill.findOne({ _id: id }, function(err, bill) {
            if (err) {
              reject(err.stack);
            }
            resolve(bill);
          });
        } else {
          this.bill.find({ "deletedAt": null }).sort({ billNo: -1}).exec(function(err, bill) {
            if (err) {
              reject(err.stack);
            }
            resolve(bill);
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
        this.bill.update({ _id: id }, { $set: {deletedAt: Date()} }, (err, numUpdated) => {
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
        this.bill.remove({ _id: id }, {}, (err, numRemoved) => {
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

  getBillNo () {
    return new Promise((resolve, reject) => {
      try {
        this.bill.count({}, function (err, count) {
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
export default new Bill();

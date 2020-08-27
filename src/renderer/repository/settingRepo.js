import db from "../database/connection";
const slug = require('slug')

class Setting {
  constructor() {
    this.setting = db.setting;
  }
  save(setting) {
    return new Promise((resolve, reject) => {
      try {
        this.setting.insert(setting, function(err, data) {
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
  update(setting, id) {
    return new Promise((resolve, reject) => {
      try {
        this.setting.update({ _id: id }, setting, {}, function(err, numReplaced) {
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
          this.setting.findOne({ _id: id }, function(err, setting) {
            if (err) {
              reject(err.stack);
            }
            resolve(setting);
          });
        } else {
          this.setting.find({}, function(err, setting) {
            if (err) {
              reject(err.stack);
            }
            resolve(setting);
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}
export default new Setting();

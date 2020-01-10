import db from "../database/connection";

class Recipe {
  constructor() {
    this.recipe = db.recipe;
  }
  save(dish) {
    return new Promise((resolve, reject) => {
      try {
        this.recipe.insert(dish, function(err, data) {
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
  update(dish, id) {
    return new Promise((resolve, reject) => {
      try {
        this.recipe.update({ _id: id }, dish, {}, function(err, numReplaced) {
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
          this.recipe.findOne({ _id: id }, function(err, dish) {
            if (err) {
              reject(err.stack);
            }
            resolve(dish);
          });
        } else {
          this.recipe.find({}, function(err, dish) {
            if (err) {
              reject(err.stack);
            }
            resolve(dish);
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
        this.recipe.remove({ _id: id }, {}, (err, numRemoved) => {
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

  async hasDishByName(name, except = null) {
    return new Promise((resolve, reject) => {
      try {
        if (except) {
          this.recipe.find({ name: name }, function(err, docs) {
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
          this.recipe.find({ name: name }, function(err, docs) {
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
export default new Recipe();

import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
console.log(remote.app.getPath('userData'));
let db = {}
db.recipe = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/expostack_recipe.db'),
  timestampData: true
})
db.bill = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/expostack_bill.db'),
  timestampData: true
})
db.setting = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/expostack_setting.db'),
  timestampData: true
})
export default db

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Employee from '../api/employee/employee.model';
import config from './environment/';

const dummyUsers = [];

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Employee.find({}).remove()
      .then(() => {
        let user = Employee.create(dummyUsers);
        return user;
      })
      .then(() => console.log('finished populating users'))
      .catch(err => console.log('error populating users', err));
  }
}

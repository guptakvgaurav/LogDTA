/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Employee from '../api/employee/employee.model';
import config from './environment/';

const dummyEmployees = [];

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Employee.find({}).remove()
      .then(() => {
        let employee = Employee.create(dummyEmployees);
        return employee;
      })
      .then(() => console.log('finished populating employees'))
      .catch(err => console.log('error populating employees', err));
  }
}

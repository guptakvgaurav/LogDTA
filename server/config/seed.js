/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Employee from '../api/employee/employee.model';
import config from './environment/';
import logger from '../components/logger';

const dummyEmployees = [];

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Employee.find({}).remove()
      .then(() => {
        let employee = Employee.create(dummyEmployees);
        return employee;
      })
      .then(() => logger.verbose('finished populating users'))
      .catch(err => logger.warn('error populating users', err));
  }
}

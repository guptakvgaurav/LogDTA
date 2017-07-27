/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import config from './environment/';
import logger from '../components/logger';

const dummyUsers = [];

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    User.find({}).remove()
      .then(() => {
        let user = User.create(dummyUsers);
        return user;
      })
      .then(() => logger.verbose('finished populating users'))
      .catch(err => logger.warn('error populating users', err));
  }
}

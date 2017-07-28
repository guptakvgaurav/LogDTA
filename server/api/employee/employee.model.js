'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './employee.events';
/**
 * Created by sourabh on 24/7/17.
 */

const EmployeeSchema = new mongoose.Schema({
  employeeId:{
    type:String,
  },
  employeeEmail:{
    type:String,
  },
  tsmsToken:{
    type:String,
  },
  hrmsToken:{
    type:String,
  }

});


registerEvents(EmployeeSchema);
module.exports=mongoose.model('Employee', EmployeeSchema);

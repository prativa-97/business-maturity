const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  company:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  isAdmin:{
  	type: Boolean,
  	default: false
  },
  isGeneral:{
    type: Boolean,
    default: false
  },
  p2p:{
    purchasesection:{
      type: Number,
      default:0
    },
    vendoranalysis:{
      type: Number,
      default:0
    },
    erpsection:{
      type:Number,
      default:0
    },
    finances:{
      type:Number,
      default:0
    },
    score:{
      type:Number,
      default:0
    }
  },
  o2c:{
    billing:{
      type: Number,
      default:0
    },
    cashapplication:{
      type: Number,
      default:0
    },
    creditanalysis:{
      type:Number,
      default:0
    },
    glposting:{
      type:Number,
      default:0
    },
    score:{
      type:Number,
      default:0
    }
  },
  h2r:{
    hiring:{
      type: Number,
      default:0
    },
    employeemanagement:{
      type: Number,
      default:0
    },
    payroll:{
      type:Number,
      default:0
    },
    retire:{
      type:Number,
      default:0
    },
    score:{
      type:Number,
      default:0
    }
  }

});

const User = module.exports = mongoose.model('User', UserSchema);

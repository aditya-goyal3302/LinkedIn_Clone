const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user_schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  image: {
    type: String,
  },
  cover: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: false,
  },
  about: {
    type: {
      body: String,
      skills: [String]
    }||{
      website:String,
      phone:String,
      industry:String,
      company_size:{
        type:{
          min:Number,
          max:Number,
        }
      },
      headquaters:String,
      Founded:Number,
      spatialities:String
    },
    required: false,
    default:null
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  phone_number: {
    type: String,
    required: false,
  },
  fax_number: {
    type: String,
    required: false,
  },
  current_position: {
    type: String,
    required: false,
  },
  is_company: {
    type: Boolean,
    default: false
  },
  experience: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        start_date: {
          type: Date,
          required: true,
        },
        end_date: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    required: false,
    default: [],
  },
  education: {
    type: [
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        field_of_study: {
          type: String,
          required: true,
        },
        start_date: {
          type: Date,
          required: true,
        },
        end_date: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    required: false,
    default: [],
  },
  skills: {
    type: [String],
    required: false,
    default: [],
  },
  business_info:{
    type:{
             
    }
  }
}, { timestamps: true, paranoid: true });

user_schema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

user_schema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("user", user_schema);

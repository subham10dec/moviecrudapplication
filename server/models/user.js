const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      //   validate: (val) => {
      //     if (val.length < 6) {
      //       throw new Error("Password should at least 6 character");
      //     }
      //   },
    },
    token: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.toJSON = function () {
  const user = this;
  console.log("abcd", user);
  const userObject = user.toObject();
  console.log("absssscd", userObject);
  delete userObject.password;
  delete userObject.token;
  return userObject;
};
const User = mongoose.model("User", userSchema);

module.exports = User;

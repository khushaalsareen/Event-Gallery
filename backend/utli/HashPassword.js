const bcryptjs  = require('bcryptjs')

async function hashPasswordUtlis(password) {
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    return hashedPassword;
  }


module.exports={hashPasswordUtlis}
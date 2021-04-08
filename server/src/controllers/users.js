const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const User = require('../models/user');

const signin = async (req, res) => {
  const result = req.body;
  try {
    const existingUser = await User.findOne({ email: result?.email });
    if(!existingUser)
      return res.status(404).json({ message: "User doesn't exist."});
    
    const isPasswordCorrect = await bcrypt.compare(result?.password, existingUser?.password);

    if(!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password." });
    
    const token = jwt.sign({ email: existingUser?.email, id: existingUser?._id }, 'test', { expiresIn: "1h" });

    res.status(200).json({result: existingUser, token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsge: 'Something went wrong.' });
  }
} 

const signup = async (req, res) => {
  const result = req.body;
  try{
    const existingUser = await User.findOne({ email: result?.email });
    if(existingUser)
      return res.status(400).json({ message: "User already exist."});

    if(result?.password !== result?.confirmPassword)
      return res.status(400).json({ message: "Passwords dont'match." });
    
    const hashedPassword = await bcrypt.hash(result?.password, 12);

    const user = await User.create({ name: `${result?.firstName} ${result?.lastName}`, email: result?.email, password: hashedPassword, });
    
    const token = jwt.sign({ email: user?.email, id: user?._id }, 'test', { expiresIn: "1h" });

    res.status(200).json({result: user, token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsge: 'Something went wrong.' });
  }
}

module.exports = {
  signin,
  signup
};
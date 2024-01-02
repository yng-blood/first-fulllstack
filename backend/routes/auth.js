//auth.js
const router = require('express').Router();
const User = require('../models/user');
const bcrypt =require("bcrypt")
router.post("/Signup", async (req, res) => {
    try {
        const { Email, Password,Ph_No,bgroup,Name,Address, UserName } = req.body;
        console.log("Received registration request:", { Email, UserName });

        const exUserE = await User.findOne({ Email });
        const exUserU = await User.findOne({ UserName });
        
        if (exUserE) {
            console.log('UserEmail already exists, unable to upload data');
            return res.status(400).json({ msg: 'User already exists' });
        }
        if (exUserU ) {
            console.log('UserName already exists, unable to upload data');
            return res.status(420).json({ msg: 'UserName already exists' });
        }

        const Hashpwd = await bcrypt.hash(Password,10)

        const user = new User({ Email, Password,Ph_No,bgroup,Name,Address,Password:Hashpwd, UserName });
        await user.save();
        
        console.log("User registered successfully:", user);
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error during registration : -___---"+error);
        res.status(400).json({ msg: "User is already there or some error occurred" });
    }
});


router.post("/Login", async (req, res) => {
    try {
        const exUser = await User.findOne({ Email: req.body.Email });
        if (!exUser) {
            return res.status(400).json({ msg: "Email not found" });
        }
        const isPasswordValid = await bcrypt.compare(req.body.Password, exUser.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Password incorrect" });
        }
        const {Password,...others}= exUser._doc;
        res.status(200).json({others });
    } catch (error) {
        console.log("Error during Login : -___---" + error);
        res.status(400).json({ msg: "Unable to login" });
    }
});
//backend Welcome.js
 // Assuming you have a User model


 router.post('/WelcomeHome', async (req, res) => {
    try {
      const { userName } = req.body;
      console.log('Received request for user:', userName);
  
      const user = await User.findOne({ UserName: userName });
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Sending relevant user details to the frontend
      const { Email, Name, otherField } = user;
      console.log('Sending user details:', { Email, Name, otherField });
      res.status(200).json([{ Email, Name, otherField }]); // Wrap the details in an array
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/all-data', async (req, res) => {
    try {
      const allData = await User.find(); // Fetch all records from the User model
      res.json(allData);
    } catch (error) {
      console.error('Error fetching all data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;





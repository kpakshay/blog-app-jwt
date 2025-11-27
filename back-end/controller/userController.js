import User from '../models/userSchema.js';
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    console.log("Hiii register")
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).send("Please fill all the datas")
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            console.log("Email already exist")
            return res.status(400).send("Email already used")
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ username, email, password: hashPassword })

        await newUser.save()
        const payload = { userId: newUser._id };

        const token = generateToken(res, payload)
        return res.status(200).json({ _id: newUser._id, username: username, email: newUser.email })
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).send("Server error");
    }

}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { userId: user._id };
    generateToken(res, payload);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email })
//         const payload = { userId: user._id };
//         if (user && (await bcrypt.compare(password, user.password))) {
//             generateToken(res, payload)
//             return res.status(200).json({ _id: user._id, username: user.username, email: user.email })
//         }

//         return res.status(401).send("Invalid Credintials")
//     } catch (error) {
//         console.error("Login error:", error)
//         return res.status(500).send("Server error")
//     }
// }

const logOutUser = (req, res) => {
    try {
        res.cookie('jwt', "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return res.status(200).send("Successfully Logged Out")
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).send("Server error")
    }
}

const getCurrentUserProfile = async (req, res) => {
    try {
        const user = await User.findOne(_id = req._id)
        if (user) {
            return res.json({ _id: user._id, username: user.username, email: user.email })
        }
        res.status(404).send("User not found")
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).send("Server error")
    }
}

const home = async (req, res) => {
    console.log(req.user)
    try {
        const token = req.cookies.jwt;

        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded.userId)
            res.json({
            id: user.id,
            name: user.username,
            email: user.email,
            });
        } else {
            res.status(401).send("User not logged in")
        }
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).send("Server error")
    }
}

export { registerUser, loginUser, logOutUser, getCurrentUserProfile, home };
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const AuthRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = new User({ username, email, password: hashedPassword })
        const savedUser = await newUser.save();

        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const AuthLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json("User not found!")
        }

        const match = await bcrypt.compareSync(req.body.password, user.password);

        if (!match) {
            return res.status(401).json("Wrong credentials!");
        }

        // đối số đầu tiên là payload, token dựa vào payload để tạo ra signature
        // Secret key như là một chữ ký đã xác minh tính toàn vẹn dữ liệu
        const token = jwt.sign({ id: user._id, email: user.email, password: user.password, username: user.username }, process.env.SECRET, { expiresIn: "3d" })
        const { password, ...info } = user._doc;

        //console.log("Check Info >> ", info)

        // res.cookie là một phương thức được sử dụng để thiết lập và gửi cookies đến trình duyệt 
        // trong phản hồi http

        // Cookies là các dữ liệu nhỏ được lưu trữ trên trình duyệt của người dùng và
        // được sử dụng để theo dõi trạng thái phiên làm việc hoặc lưu trữ thông tin tạm thời.
        res.cookie("token", token).status(200).json(info);

    } catch (err) {
        res.status(500).json(err);
    }
}

const AuthLogout = async (req, res) => {
    try {
        res.clearCookie('token', { sameSite: 'none', secure: true }).status(200).send("User logged out successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
}

const AuthRefetch = async (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET, {}, async (err, decoded) => {
        if (err) {
            return res.status(404).json(err)
        }
        res.status(200).json(decoded)
    })
}

module.exports = {
    AuthRegister,
    AuthLogin,
    AuthLogout,
    AuthRefetch
}
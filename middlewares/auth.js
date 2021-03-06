const jwt = require("jsonwebtoken");
const { JWT } = require("../lib/const");
const usersRepository = require("../repositories/usersRepository");

const authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    let token = "";

    if (authHeader && authHeader.startsWith("Bearer"))
        token = authHeader.split(" ")[1];
    else
        return res.status(401).send({
            status: false,
            message: "Anda harus login untuk mengakses resource ini.",
            data: null,
        });

    try {
        const { email } = jwt.verify(token, JWT.SECRET);

        const getUser = await usersRepository.getByEmail({ email });

        req.user = getUser;

        next();
    } catch (err) {
        return res.status(401).send({
            status: false,
            message: "Sesi telah kadaluarsa. Silakan login kembali",
            data: null,
        });
    }
};

const superAdmin = async (req, res, next) => {
    const getRole = req.user.role

    if (getRole === "superAdmin") {
        next()
        return
    }
    res.send({
        status: false,
        message: "need super admin to access this",
        data: null,
    })
}

const admin = async (req, res, next) => {
    const getRole = req.user.role

    if (getRole === "admin" || getRole === "superAdmin") {
        next()
        return
    }
    res.send({
        status: false,
        message: "need admin to access this",
        data: null,
    })
}

module.exports = { authenticate, superAdmin, admin };
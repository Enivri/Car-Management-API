const authService = require("../services/authService");

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const { status, status_code, message, data } = await authService.register({
        name,
        email,
        password,
        role
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    })
};

const registerAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;

    const { status, status_code, message, data } = await authService.registerAdmin({
        name,
        email,
        password,
        role
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    })
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const { status, status_code, message, data } = await authService.login({
        email,
        password,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    })
};

const getCurrentUsers = async (req, res) => {

    res.status(200).send({
        status: 200,
        message: "hi",
        data: req.user,
    })
};

const loginGoogle = async (req, res) => {
    const { google_credential } = req.body;

    const { status, status_code, message, data } = await authService.loginGoogle({
        google_credential,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { register, login, getCurrentUsers, registerAdmin, loginGoogle };
const usersRepository = require("../repositories/usersRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT } = require("../lib/const");
const { OAuth2Client } = require("google-auth-library");

const SALT_ROUND = 10;

class AuthService {
    static async register({ name, email, password, role }) {
        // Payload Validation
        if (!name) {
            return {
                status: false,
                status_code: 400,
                message: "Nama wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!email) {
            return {
                status: false,
                status_code: 400,
                message: "Email wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!password) {
            return {
                status: false,
                status_code: 400,
                message: "Password wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                status_code: 400,
                message: "Password minimal 8 karakter",
                data: {
                    registered_user: null,
                },
            };
        }

        const getUserByEmail = await usersRepository.getByEmail({ email });

        if (getUserByEmail) {
            return {
                status: false,
                status_code: 400,
                message: "Email sudah digunakan",
                data: {
                    registered_user: null,
                },
            };
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
            const createdUser = await usersRepository.create({
                name,
                email,
                password: hashedPassword,
                role: "member"
            });

            return {
                status: true,
                status_code: 201,
                message: "Berhasil mendaftarkan user",
                data: {
                    registered_user: createdUser,
                },
            };
        }
    };

    static async registerAdmin({ name, email, password, role }) {
        // Payload Validation
        if (!name) {
            return {
                status: false,
                status_code: 400,
                message: "Nama wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!email) {
            return {
                status: false,
                status_code: 400,
                message: "Email wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!password) {
            return {
                status: false,
                status_code: 400,
                message: "Password wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                status_code: 400,
                message: "Password minimal 8 karakter",
                data: {
                    registered_user: null,
                },
            };
        }

        const getUserByEmail = await usersRepository.getByEmail({ email });

        if (getUserByEmail) {
            return {
                status: false,
                status_code: 400,
                message: "Email sudah digunakan",
                data: {
                    registered_user: null,
                },
            };
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
            const createdUser = await usersRepository.create({
                name,
                email,
                password: hashedPassword,
                role: "admin"
            });

            return {
                status: true,
                status_code: 201,
                message: "Berhasil mendaftarkan admin",
                data: {
                    registered_user: createdUser,
                },
            };
        }
    };

    static async login({ email, password }) {
        // Payload Validation
        if (!email) {
            return {
                status: false,
                status_code: 400,
                message: "Email wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!password) {
            return {
                status: false,
                status_code: 400,
                message: "Password wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                status_code: 400,
                message: "Password minimal 8 karakter",
                data: {
                    registered_user: null,
                },
            };
        }

        const getUser = await usersRepository.getByEmail({ email });

        if (!getUser) {
            return {
                status: false,
                status_code: 404,
                message: "Email belum terdaftar",
                data: {
                    user: null,
                },
            };
        } else {
            const isPasswordMatch = await bcrypt.compare(password, getUser.password);

            if (isPasswordMatch) {
                const token = jwt.sign(
                    {
                        id: getUser.id,
                        email: getUser.email,
                    },
                    JWT.SECRET,
                    {
                        expiresIn: JWT.EXPIRED,
                    }
                );

                return {
                    status: true,
                    status_code: 200,
                    message: "User berhasil login",
                    data: {
                        token,
                    },
                };
            } else {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password salah",
                    data: {
                        user: null,
                    },
                };
            }
        }
    }

    static async loginGoogle({ google_credential: googleCredential }) {
        try {
            // Get google user credential
            const client = new OAuth2Client(
                "52535015285-vv5u8k47qdcv43sv1fe5jehug7m35gb4.apps.googleusercontent.com"
            );

            const userInfo = await client.verifyIdToken({
                idToken: googleCredential,
                audience:
                    "52535015285-vv5u8k47qdcv43sv1fe5jehug7m35gb4.apps.googleusercontent.com",
            });

            const { email, name } = userInfo.payload;

            const getUserByEmail = await usersRepository.getByEmail({ email });

            if (!getUserByEmail) {
                await usersRepository.create({
                    name,
                    email,
                    role: "member",
                });
            }

            const token = jwt.sign(
                {
                    id: getUserByEmail.id,
                    email: getUserByEmail.email,
                },
                JWT.SECRET,
                {
                    expiresIn: JWT.EXPIRED,
                }
            );

            return {
                status: true,
                status_code: 200,
                message: "User berhasil login",
                data: {
                    token,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    }

}

module.exports = AuthService;
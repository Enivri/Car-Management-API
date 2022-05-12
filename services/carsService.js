const carsRepository = require("../repositories/carsRepository");

class carsService {

    static async createCars({ plate, manufacture, model, image, rentPerDay, capacity, description, transmission, type, year, options, specs, isWithDriver, availableAt, createdBy, updatedBy, deletedBy }) {
        if (!plate) {
            return {
                status: false,
                status_code: 400,
                message: "plate wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!manufacture) {
            return {
                status: false,
                status_code: 400,
                message: "manufacture wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!model) {
            return {
                status: false,
                status_code: 400,
                message: "model wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!image) {
            return {
                status: false,
                status_code: 400,
                message: "image wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!rentPerDay) {
            return {
                status: false,
                status_code: 400,
                message: "rentPerDay wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!capacity) {
            return {
                status: false,
                status_code: 400,
                message: "capacity wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!description) {
            return {
                status: false,
                status_code: 400,
                message: "description wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!transmission) {
            return {
                status: false,
                status_code: 400,
                message: "transmission wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!type) {
            return {
                status: false,
                status_code: 400,
                message: "type wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!year) {
            return {
                status: false,
                status_code: 400,
                message: "year wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!options) {
            return {
                status: false,
                status_code: 400,
                message: "options wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!specs) {
            return {
                status: false,
                status_code: 400,
                message: "specs wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!isWithDriver) {
            return {
                status: false,
                status_code: 400,
                message: "isWithDriver wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!availableAt) {
            return {
                status: false,
                status_code: 400,
                message: " availableAt wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        const createdCars = await carsRepository.createCars({
            plate,
            manufacture,
            model,
            image,
            rentPerDay,
            capacity,
            description,
            transmission,
            type,
            year,
            options,
            specs,
            isWithDriver,
            availableAt,
            createdBy,
            updatedBy,
            deletedBy
        });

        return {
            status: true,
            status_code: 201,
            message: "car created successfully",
            data: {
                created_Cars: createdCars,
            },
        };
    }

    static async updateCars({ id, plate, manufacture, model, image, rentPerDay, capacity, description, transmission, type, year, options, specs, isWithDriver, availableAt, updatedBy }) {

        const updatedCars = await carsRepository.updateCars({
            id,
            plate,
            manufacture,
            model,
            image,
            rentPerDay,
            capacity,
            description,
            transmission,
            type,
            year,
            options,
            specs,
            isWithDriver,
            availableAt,
            updatedBy
        });

        return {
            status: true,
            status_code: 200,
            message: "Car updated successfully",
            data: {
                updated_Cars: updatedCars,
            },
        };
    }

    static async deleteCars({ id, deletedBy }) {
        const getCars = await carsRepository.getCarsById({ id, deletedBy });
        if (getCars.id == id) {

            const deletedCars = await carsRepository.deleteCars({
                id,
                deletedBy
            });

            return {
                status: true,
                status_code: 200,
                message: "cars deleted successfully",
                data: {
                    deleted_Cars: deletedCars,
                },
            };
        } else {
            return {
                status: true,
                status_code: 401,
                message: "Resource Unauthorized",
                data: {
                    deleted_cars: null,
                },
            };
        }
    }

    static async getCarsById({ id }) {

        const getCarsById = await carsRepository.getCarsById({
            id,
        });
        return {
            status: true,
            status_code: 200,
            message: "get Cars by id successfully",
            data: {
                result: getCarsById,
            },
        };
    }

    static async getAllCars({ id }) {

        const getAllCars = await carsRepository.getAllCars({});
        return {
            status: true,
            status_code: 200,
            message: "get All Cars successfully",
            data: {
                result: getAllCars,
            },
        };
    }

    static async fillterCar({ isWithDriver, availableAt, capacity }) {

        const fillterCar = await carsRepository.fillterCar({
            isWithDriver, 
            availableAt, 
            capacity
        });
        return {
            status: true,
            status_code: 200,
            message: "fillter Cars successfully",
            data: {
                result: fillterCar,
            },
        };
    }

}


module.exports = carsService;
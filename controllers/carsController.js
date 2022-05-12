const carsService = require("../services/carsService");

const createCars = async (req, res, next) => {

    const { plate, manufacture, model, image, rentPerDay, capacity, description, transmission, type, year, options, specs, isWithDriver, availableAt } = req.body;
    const createdBy  = req.user.name

    const { status, status_code, message, data } = await carsService.createCars({
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
        updatedBy: createdBy ,
        deletedBy: null
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    })
};

const updateCars = async (req, res, next) => {
    const { id } = req.params;
    const { plate, manufacture, model, image, rentPerDay, capacity, description, transmission, type, year, options, specs, isWithDriver, availableAt } = req.body;
    const updatedBy = req.user.name

    const { status, status_code, message, data } = await carsService.updateCars({
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

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    })
};

const deleteCars = async (req, res, next) => {
    const { id } = req.params;
    const deletedBy = req.user.name

    const { status, status_code, message, data } = await carsService.deleteCars({
        id,
        deletedBy
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getCarsById = async (req, res, next) => {
    const { id } = req.params;

    const { status, status_code, message, data } = await carsService.getCarsById({
        id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getAllCars = async (req, res, next) => {
    const { status, status_code, message, data } = await carsService.getAllCars({
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const fillterCar = async (req, res, next) => {
    const { isWithDriver, availableAt, capacity } = req.query;

    const { status, status_code, message, data } = await carsService.fillterCar({
        isWithDriver,
        availableAt, 
        capacity
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};



module.exports = { createCars, updateCars, deleteCars, getCarsById, getAllCars, fillterCar };
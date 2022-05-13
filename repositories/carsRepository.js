const { Users, Cars } = require("../models");
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");

class carsRepository {

    static async createCars({ plate, manufacture, model, image, rentPerDay, capacity, description, transmission, type, year, options, specs, isWithDriver, availableAt, createdBy, updatedBy, deletedBy }) {
        const createdCars = Cars.create({
            id: uuidv4(),
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

        return createdCars;
    }

    static async updateCars({ id, plate, manufacture, model, image, rentPerDay, capacity, description, transmission, type, year, options, specs, isWithDriver, availableAt, updatedBy }) {
        const deleteCars = await Cars.update(
            {
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
            },
            { where: { id } }
        );

        return deleteCars;
    }

    static async deleteCars({ id, deletedBy }) {
        const deleteCars = await Cars.update({
            deletedBy
        },
        { where: { id } }
        );

        return deleteCars;
    }

    static async getCarsById({ id }) {
        const getCars = await Cars.findOne({ where: { id, deletedBy: null } });

        return getCars;
    }

    static async getAllCars({ }) {
        const getAllCars = await Cars.findAll({ where: { deletedBy: null } });

        return getAllCars;
    }

    static async fillterCar({ isWithDriver, availableAt, capacity }) {
        if (isWithDriver) {
            const fillterCar = await Cars.findAll({
                where: { 
                    isWithDriver, 
                    deletedBy: null 
                }
            });
            return fillterCar;
        }
        if (availableAt) {
            const fillterCar = await Cars.findAll({
                where: {
                    availableAt: {
                        [Op.eq]: availableAt,
                    },
                    deletedBy: null 
                }
            });
            return fillterCar;
        }
        if (capacity) {
            const fillterCar = await Cars.findAll({
                where: {
                    capacity: {
                        [Op.eq]: capacity,
                    },
                    deletedBy: null 
                }
            });
            return fillterCar;
        }
    }

}

module.exports = carsRepository;
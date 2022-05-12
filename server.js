const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./documentation.yaml')

const app = express();
const PORT = 2000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import Controllers
const authController = require("./controllers/authController");
const carsController = require("./controllers/carsController");


// Import Midleware
const middleware = require("./middlewares/auth");

// Define Routes
app.post("/register", authController.register);
app.post("/registerAdmin", middleware.authenticate, middleware.superAdmin, authController.registerAdmin);
app.post("/login", authController.login);
app.get("/users", middleware.authenticate, authController.getCurrentUsers);

app.post("/cars", middleware.authenticate, carsController.createCars);
app.get("/cars", middleware.authenticate, middleware.admin, carsController.getAllCars);

app.get("/cars/:id", middleware.authenticate, middleware.admin, carsController.getCarsById);
app.put("/cars/:id", middleware.authenticate, middleware.admin, carsController.updateCars);
app.delete("/cars/:id", middleware.authenticate, middleware.admin, carsController.deleteCars);

app.get("/fillterCar", middleware.authenticate, carsController.fillterCar);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${PORT}`);
});
// IMPORTS -------------------------------------------------------------------------------------------------------------
const express = require("express");

const controllers = require("./app/controllers");
const { UserController, SessionController, AdController } = controllers;
const validate = require("express-validation");
const validators = require("./app/validators");
const handler = require("express-async-handler");
// CONTROLLERS IMPORTS -------------------------------------------------------------------------------------------------

// MEDDLEWARES IMPORTS -------------------------------------------------------------------------------------------------
const authMiddleware = require("./app/middlewares/auth");
// INICIANDO ROTAS -----------------------------------------------------------------------------------------------------
const routes = express.Router();

// ROTAS MIDDLEWARES ---------------------------------------------------------------------------------------------------

// ROTAS NÃO AUTENTICADAS ----------------------------------------------------------------------------------------------------------
routes.get("/", handler((req, res) => res.send("oi")));
routes.post("/users", validate(validators.User), handler(UserController.store));
routes.post("/sessions", validate(validators.Session), handler(SessionController.store));

// ROTAS AUTENTICADAS ----------------------------------------------------------------------------------------------------
routes.use(authMiddleware);
routes.get("/ad", handler(AdController.index));
routes.get("/ad/:id", handler(AdController.show));
routes.post("/ad", validate(validators.Ad), handler(AdController.store));
routes.put("/ad/:id", validate(validators.Ad), handler(AdController.update));
routes.put("/ad/buy/:id", handler(AdController.buy));
routes.delete("/ad/:id", handler(AdController.destroy));

routes.post("/purchase", validate(validators.Purchase), handler(controllers.PurchaseController.store));
// EXPORTANDO ROTAS ----------------------------------------------------------------------------------------------------
module.exports = routes;

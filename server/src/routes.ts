import express, { request, response } from 'express'


import { celebrate, Joi } from 'celebrate'

import HubsController from './controllers/HubsController'

const routes = express.Router()


const hubsController = new HubsController()

routes.post('/hubs',

  celebrate({
    body: Joi.object().keys({
      nameHub: Joi.string().required(),
      zipcode: Joi.string().required(),
      uf: Joi.string().required().max(2),
      city: Joi.string().required(), 
      district: Joi.string().required(),
      street: Joi.string().required(),
      numberHouse: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    
    }),
   }, {
     abortEarly: false
   }),
  hubsController.create)

 routes.get('/hubs/', hubsController.index)
 routes.get('/hubs/:id', hubsController.show)


export default routes
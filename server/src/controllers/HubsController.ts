import { Request, Response } from 'express'
import knex from '../database/connection'

class HubsController{
  async index(request: Request, response: Response) {
    const { city, uf} = request.query

    const hubs = await knex('hub')
      .from('hub')  
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('hub.*')
    const serializedHubs = hubs.map(hub => {
      return {
        ...hub,
       }
    })

    return response.json(serializedHubs)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params

    const hub = await knex('hub').where('id', id).first()

    if (!hub) {
      return response.status(400).json({ message: 'Hub not Found' })
    }

    const serializedHubs = {
      ...hub,
    }
    
    return response.json({ point: serializedHubs })
  }

  async create(request: Request, response: Response) {
    const {
      nameHub,
      zipcode,
      uf,
      city,
      district,
      street,
      numberHouse,
      latitude,
      longitude,
    } = request.body

    const trx = await knex.transaction()

    const hub = {
      nameHub,
      zipcode,
      uf,
      city,
      district,
      street,
      numberHouse,
      latitude,
      longitude,
    }
    const insertedIds = await trx('hub').insert(hub)

    const hub_id = insertedIds[0]
    await trx.commit()
    response.json({
      id: hub_id,
      ...hub
    })

  }
}

export default HubsController
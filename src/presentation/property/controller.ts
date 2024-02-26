import { Request, Response } from "express";
import { CreatePropertyDto, UpdatePropertyDto } from '../../domain/dtos';
import { PropertyRepository } from '../../domain/repositories';
import { CreateProperty, DeleteProperty, GetProperties, GetProperty, UpdateProperty } from '../../domain/use-cases';

export class PropertyController {

    constructor(
      private readonly propertyRepository: PropertyRepository
    ) { }
  
    public getProperties = ( req: Request, res: Response ) => {
        new GetProperties(this.propertyRepository)
        .execute()
        .then( properties => res.json( properties ))
        .catch( error => res.status(404).json({ error }));
    };
  
    public getPropertyById = ( req: Request, res: Response ) => {
      const id = req.params.id;
      new GetProperty(this.propertyRepository)
      .execute(id)
      .then( property => res.json( property ))
      .catch( error => res.status(404).json({ error }));
    };
  
    public createProperty = ( req: Request, res: Response ) => {
      const [error, createPropertyDto] = CreatePropertyDto.create(req.body);
      if ( error ) return res.status( 400 ).json( { error } );
      new CreateProperty(this.propertyRepository)
      .execute(createPropertyDto!)
      .then( property => res.json( property ))
      .catch( error => res.status(404).json({ error }));
    }
  
    public updateProperty = ( req: Request, res: Response ) => {
      const id = req.params.id;
      const [error, updatePropertyDto] = UpdatePropertyDto.update({...req.body, id});
      if ( error ) return res.status( 400 ).json( { error } );
      new UpdateProperty(this.propertyRepository)
      .execute(updatePropertyDto!)
      .then( updatedProperty => res.json( updatedProperty ))
      .catch( error => res.status(404).json({ error }));
    }
  
    public deleteProperty = (req:Request, res: Response) => {
      const id = req.params.id;
      new DeleteProperty(this.propertyRepository)
      .execute(id)
      .then( deletedRepository => res.json( deletedRepository ))
      .catch( error => res.status(404).json({ error }));
    }
}
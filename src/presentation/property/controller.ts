import { Request, Response } from "express";
import { CreatePropertyDto, UpdatePropertyDto } from '../../domain/dtos';
import { PropertyRepository } from '../../domain/repositories';
import { CreateProperty, DeleteProperty, GetProperties, GetProperty, UpdateProperty } from '../../domain/use-cases';
import { CustomError } from "../../domain/errors";

export class PropertyController {

    constructor(
      public readonly propertyRepository: PropertyRepository
    ) { }

    private handleError = (error: unknown, res: Response ) => {
      if ( error instanceof CustomError ) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(`${ error }`);
      return res.status(500).json({ error: 'Internal server error' })
    } 

    public getProperties = ( req: Request, res: Response ) => {
        new GetProperties(this.propertyRepository)
        .execute()
        .then( properties => res.json( properties ))
        .catch( error => this.handleError(error, res));
    };
  
    public getPropertyById = ( req: Request, res: Response ) => {
      const id = req.params.id;
      new GetProperty(this.propertyRepository)
      .execute(id)
      .then( property => res.json( property ))
      .catch( error => this.handleError(error, res));
    };
  
    public createProperty = ( req: Request, res: Response ) => {
      const [error, createPropertyDto] = CreatePropertyDto.create(req.body);
      if ( error ) return res.status( 400 ).json( { error } );
      new CreateProperty(this.propertyRepository)
      .execute(createPropertyDto!)
      .then( property => res.json( property ))
      .catch( error => this.handleError(error, res));
    }
  
    public updateProperty = ( req: Request, res: Response ) => {
      const id = req.params.id;
      const [error, updatePropertyDto] = UpdatePropertyDto.create({...req.body, id});
      if ( error ) return res.status( 400 ).json( { error } );
      new UpdateProperty(this.propertyRepository)
      .execute(updatePropertyDto!)
      .then( updatedProperty => res.json( updatedProperty ))
      .catch( error => this.handleError(error, res));
    }
  
    public deleteProperty = (req:Request, res: Response) => {
      const id = req.params.id;
      new DeleteProperty(this.propertyRepository)
      .execute(id)
      .then( deletedRepository => res.json( deletedRepository ))
      .catch( error => this.handleError(error, res));
    }
}
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class PropertyController {

    constructor() { }
  
    public getProperties = async ( req: Request, res: Response ) => {
      const properties = await prisma.property.findMany();
      return res.json( properties );
    };
  
    public getPropertyById = async( req: Request, res: Response ) => {
      const id = req.params.id;

      const property = await prisma.property.findFirst({
        where: { id }
      });
  
      ( property )
        ? res.json( property )
        : res.status( 404 ).json( { error: `Property with id ${ id } not found` } );
    };
  
    // public createProperty = async( req: Request, res: Response ) => {
    //   const { id, code, title, description, address, price, districtId } = req.body;
    //   if ( !code ) return res.status( 400 ).json( { error: 'Code property is required' } );
      
    //   const property = await prisma.property.create({
    //     data: {
    //       code: id,
    //       title: title,
    //       description: description,
    //       address: address,
    //       price: price,
    //       districtId: districtId
    //     }
    //   });

    //   res.json( property );
  
    // };
  
    public updateProperty = async( req: Request, res: Response ) => {
      const id = req.params.id;
      const property = await prisma.property.findFirst({
        where: { id }
      });
      if ( !property ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );
  
      const { code, title, description, address, price, districtId } = req.body;

      const updatedProperty = await prisma.property.update({
        where: { id },
        data: {
          code: code,
          title: title,
          description: description,
          address: address,
          price: price,
          districtId: districtId
        }
      });

      res.json( updatedProperty );
    }
  
  
    public deleteProperty = async(req:Request, res: Response) => {
      const id = req.params.id;
  
      const property = await prisma.property.findFirst({
        where: { id }
        });
      if ( !property ) return res.status(404).json({ error: `Property with id ${ id } not found` });
  
      const deleted = await prisma.property.delete({
        where: { id }
      });

      ( deleted )
        ? res.json( {property, deleted} )
        : res.status( 400 ).json( { error: `Property with id ${ id } not found` } );
    }

}
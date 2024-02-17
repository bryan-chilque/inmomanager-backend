import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class UbigeoController {

    constructor() { }
  
    public getDepartments = async ( req: Request, res: Response ) => {
      const departments = await prisma.department.findMany();
      return res.json( departments );
    };
  
    public getDepartmentById = async( req: Request, res: Response ) => {
      const id = req.params.id;
      const department = await prisma.department.findFirst({
        where: { id }
      });
  
      ( department )
        ? res.json( department )
        : res.status( 404 ).json( { error: `Department with id ${ id } not found` } );
    };
  
    public getProvinces = async ( req: Request, res: Response ) => {
      const province = await prisma.province.findMany();
      return res.json( province );
    };
  
    public getProvinceById = async( req: Request, res: Response ) => {
      const id = req.params.id;

      const province = await prisma.province.findFirst({
        where: { id }
      });
  
      ( province )
        ? res.json( province )
        : res.status( 404 ).json( { error: `Province with id ${ id } not found` } );
    };
  
    public getDistricts = async ( req: Request, res: Response ) => {
      const districts = await prisma.district.findMany();
      return res.json( districts );
    };
  
    public getDistrictById = async( req: Request, res: Response ) => {
      const id = req.params.id;

      const district = await prisma.district.findFirst({
        where: { id }
      });
  
      ( district )
        ? res.json( district )
        : res.status( 404 ).json( { error: `District with id ${ id } not found` } );
    };

}
import { Request, Response} from "express";

export interface ICustomError extends Error{
    statusCode?: number
}

export default ( err: ICustomError , _req: Request, res: Response) => {
    const statusCode = err.statusCode || 500
    const {name, message} = err
    return res.status(statusCode).json({error: {name, message}})
};

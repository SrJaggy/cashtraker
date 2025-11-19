import type { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";


export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    await param('id')
        .isInt().withMessage('Id no válido')
        .custom(value => value > 0).withMessage('Id no válido')
        .run(req)

    let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
    
    next()
}
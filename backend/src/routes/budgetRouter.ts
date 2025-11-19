import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetId } from "../middleware/budget";

const router = Router()


export default router

router.get('/', BudgetController.getAll)

router.post('/', 
    body('name')
        .notEmpty().withMessage('Este campo es obligatorio'),
    body('amount')
        .notEmpty().withMessage('Este campo es obligatorio')
        .isNumeric().withMessage('Debes usar solo numeros')
        .custom(value => value > 0).withMessage('El presupuesto debe ser mayor a cero'), 
    handleInputErrors,
    BudgetController.create)

router.get('/:id', 
    validateBudgetId,
    BudgetController.getBudgetById)
    
router.put('/:id', 
    validateBudgetId,
    body('name')
        .notEmpty().withMessage('Este campo es obligatorio'),
    body('amount')
        .notEmpty().withMessage('Este campo es obligatorio')
        .isNumeric().withMessage('Debes usar solo numeros')
        .custom(value => value > 0).withMessage('El presupuesto debe ser mayor a cero'), 
    handleInputErrors,
    BudgetController.updateById)
    


router.delete('/:id', 
    validateBudgetId,
    BudgetController.deleteById)
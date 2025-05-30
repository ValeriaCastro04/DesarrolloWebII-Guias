import React, { useContext, useEffect, useState } from 'react' 
import { categories } from '../data/categories' 
import DatePicker from 'react-date-picker' 
import 'react-date-picker/dist/DatePicker.css' 
import 'react-calendar/dist/Calendar.css' 
import { BudgetDispatchContext, BudgetStateContext } from '../context/BudgetContext' 
import ErrorMessage from './ErrorMessage' 

export const ExpenseForm = () => {
    const [expense, setExpense] = useState({
        expenseName: "",
        amount: 0,
        category: "",
        date: new Date(),
    });

    const [error, setError] = useState('')
    const dispatch = useContext(BudgetDispatchContext)
    const state = useContext(BudgetStateContext)

    useEffect(()=> {
        if(state.editingId){
            const editingExpense = state.expenses.find(currentExpense => currentExpense.id === state.editingId);
            if (editingExpense) setExpense(editingExpense);
        }
    },[state.editingId])

    const handleChange = (e) => {
        const {name, value} = e.target;
        const isAmountField = ["amount"].includes(name);  // ["amount"] es un array con un solo valor, y .includes(name) devuelve true si name es "amount". 
        setExpense({
            ...expense,
             // [name] es una clave calculada que representa el nombre del campo que se está actualizando. 
            [name]:isAmountField ? Number(value) : value,
        })
    }
    // Función para recuperar y escribir la fecha en el state
    const handleChangeDate = (value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    //validacion formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios');
            return;
        }

        // Calcular el total de gastos actual + el gasto que se quiere agregar o editar
        const currentTotalExpenses = state.expenses.reduce((total, item) => total + item.amount, 0);

        let newTotalExpenses;
        if (state.editingId) {
            // Si estamos editando, restar el gasto actual y sumar el nuevo
            const oldExpense = state.expenses.find(exp => exp.id === state.editingId);
            newTotalExpenses = currentTotalExpenses - oldExpense.amount + expense.amount;
        } else {
            // Si estamos agregando, simplemente sumamos el nuevo gasto
            newTotalExpenses = currentTotalExpenses + expense.amount;
        }

        // Validar que no exceda el presupuesto
        if (newTotalExpenses > state.budget) {
            setError('El gasto total excede el presupuesto disponible.');
            return;
        }

        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        // Limpiar formulario y error
        setExpense({
            expenseName: "",
            amount: 0,
            category: "",
            date: new Date(),
        })

        setError('')
    };

    const formTitle = state.editingId ? "Guardar Cambios" : "Nuevo Gasto";
    const buttonText = state.editingId ? "Guardar Cambios" : "Registrar Gasto";

    return(
        <form className='space-y-5' onSubmit={handleSubmit}>
            <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
                {formTitle}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className='flex flex-col gap-2'>
                <label htmlFor="expenseName" className='text-xl'>
                    Nombre Gasto:
                </label>
                <input 
                type="text"
                id='expenseName'
                placeholder='Añade el Nombre del gasto'
                className='bg-slate-100 p-2'
                name='expenseName'
                value={expense.expenseName}
                onChange={handleChange} 
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="amount" className='text-xl'>
                    Cantidad:
                </label>
                <input 
                    type="number" 
                    id='amount'
                    placeholder='Añade la cantidad del gasto: ej.300'
                    className='bg-slate-100 p-2'
                    name='amount'  // se usa para identificar el campo en el formulario
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="category" className='text-xl'>
                    Categoria
                </label>
                <select 
                name="category" 
                id="category"
                className='bg-slate-100 p-2'
                value={expense.category}
                onChange={handleChange}
                >
                    <option>-- Seleccione --</option>
                    {categories.map((category) =>(
                        <option 
                            value={category.id}
                            key={category.id}>
                                {category.name}
                            </option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="amount" className='text-xl'>
                    Fecha Gasto:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}
                />
            </div>

            <input 
                type="submit"
                className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
                value={buttonText}
            />
        </form>
    )
}
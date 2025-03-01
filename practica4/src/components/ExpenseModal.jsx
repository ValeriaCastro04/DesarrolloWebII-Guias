import { Fragment, useContext } from 'react' 
import { PlusCircleIcon } from '@heroicons/react/24/solid' 
import { Dialog, Transition } from '@headlessui/react' 
import { BudgetDispatchContext, BudgetStateContext } from '../context/BudgetContext' 
import { ExpenseForm } from './ExpenseForm' 

export default function ExpenseModal(){
    const {modal} = useContext(BudgetStateContext)
    const dispatch=useContext(BudgetDispatchContext)

    return (
        <>
        <div className='fixed rigt-5 bottom-5 flex items-center justify-center'>
            <button
            type='button'
            onClick={()=>dispatch({type:'show-modal'})}
            >
                <PlusCircleIcon className='w-16'/>

            </button>

        </div>
        </>
    )



}
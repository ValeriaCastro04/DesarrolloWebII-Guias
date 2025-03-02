export const initialState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: ""
}

export const budgetReducer = (state, action) => {
    switch (action.type) {
        case "add-budget":
            return { ...state, budget: action.payload.budget }  
        case "show-modal":
            return { ...state, modal: true }
        case "close-modal":
            return { ...state, modal: false, editingId: "" } 
        case "remove-expense":
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id != action.payload.id)
            }    
        case "add-expense":
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    { ...action.payload.expense, id: new Date().getTime() }
                ],
                modal: false,
                editingId: ""
            }
        case "get-expense-by-id":
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            }

        default:
            return state;
    }
}

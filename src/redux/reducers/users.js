export default function users(state = [], action) {
    switch (action.type) {
        case "ADD_USER":
            return [...state, action.payload];
        case "ADD_USERS":
            return [...state, ...action.payload];
        default:
            return state;
    }
}

export default function generateUserError(first_name, last_name, mail, age) {
    return `Params missings: List of params(Check the empty param): first_name: ${first_name}, lastname: ${last_name}, email: ${mail}, age: ${age}`
}
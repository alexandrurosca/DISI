

interface IUserDto{
    userId: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    amount: number,
    startDate?: Date,
    endDate?: Date,
    budgetExpired?: boolean
}
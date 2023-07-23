export const isValidId =  (id: string) => {

    try {
       Number(id)
    } catch (error) {
        throw new Error('The Id is Invalid - Not is a number')
    }

}


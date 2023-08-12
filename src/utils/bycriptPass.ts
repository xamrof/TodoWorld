import bcrypt from 'bcrypt'


export const encodePassword = (password: string, salt: number = 10) => {
        password = bcrypt.hashSync(password, salt)
        return password
}

export const decodePassword = (password: string, hash: string) => {
    const validPassword = bcrypt.compareSync(password, hash)
    return validPassword
}
  import { compare, hash } from "bcrypt";


  /**
   * This function generates a hashed password using the bcrypt library.
   * The bcrypt library is used to hash passwords for security reasons.
   * The function takes a string parameter 'password' which represents the plain text password.
   * This function returns a Promise that resolves to a string, which is the hashed password.
   * The function uses the hash() function to hash the password.
   * The saltRounds value of 10 is used in this case.
   * @param {string} password - The plain text password to be hashed.
   * @returns {Promise<string>} - A promise that resolves to the hashed password.
   */
  export async function hashPasswordGenarate(password: string): Promise<string>{
    return await hash(password,10)
  }


  export async function passwordComparation(dbpassword: string,UserPassword: string):  Promise<boolean>{
    return await compare(dbpassword,UserPassword)
  }
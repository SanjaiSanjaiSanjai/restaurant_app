
export function roleIdentifier(email: string): string{
    const domain = email.split('@')[1]
    let role =  ''
    switch (domain) {
        case "email.com":
            role = 'User'
            break;
        case "admin.com":
            role = 'admin'
            break;
        case "staff.com":
            role = 'staff'
            break;
        default:
            throw new Error('Email domain is not allowed')
    }
    return role
}
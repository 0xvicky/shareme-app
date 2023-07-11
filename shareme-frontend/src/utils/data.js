export const userQuery = (userId)=>{
    const userInfo = `*[_type== "user" && _id=='${userId}']`
    return userInfo
}
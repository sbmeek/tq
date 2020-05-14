import axios from 'axios';

export default async function authService () {
    try {
        const res = await axios.get('/user/authenticated');
        const data = await res.data;
        if(res.status !== 500) 
            return {...data, status: 200};
    } catch (error) {
        return { 
            error: true, 
            status: 500,
            isStatus500: true, 
            authenticated: false, 
            username: false, 
        };
    }
}

// export const logout = async () => {
//     try {
//         const res = await axios.get('/logout');
//         const data = await res.data;
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// }
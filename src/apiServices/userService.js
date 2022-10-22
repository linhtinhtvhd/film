import http from '~/utils/http_common';

const getUser = async (username, token) => {
    try {
        const result = await http.post(
            '/findByUsername',
            { username },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result;
    } catch (error) {}
};
const LoginUser = async (username, password) => {
    try {
        const result = await http.post('/login', { username, password });
        if (result.data.token) {
            localStorage.setItem('token', JSON.stringify(result.data.token));
            return result.data.token;
        }
    } catch (error) {}
};
const SignUp = async (fullname, username, password) => {
    try {
        await http.post('/create', { fullname, username, password });
    } catch (error) {}
};
const UpdateUser = async (update, token) => {
    try {
        await http.put(
            '/update',
            { password: update.newPassword, fullname: update.newFullname, listfilm: update.newListfilm },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (error) {}
};

export { getUser, LoginUser, UpdateUser, SignUp };
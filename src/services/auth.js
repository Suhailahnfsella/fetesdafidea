import { checkLogin } from '@/services/api';

export const submitLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        checkLogin(email, password).then((user) => {
            const userData = { email: user.email, name: user.name };
            localStorage.setItem("user", JSON.stringify(userData));
            resolve(userData);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const logout = (router) => {
    localStorage.removeItem("user");
    router.push("/signin");
};
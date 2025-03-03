export const isAutenticado = () => {
    return localStorage.getItem('token') !== null;
};
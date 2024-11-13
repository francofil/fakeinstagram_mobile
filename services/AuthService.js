import ApiService from "./ApiService";

const AuthService = {
    register: async (username, email, passwd) => {
        const creds = {
            username: username,
            email: email,
            password: passwd,
        };

        const user = await ApiService.post(
            "auth/register",
            creds,
            "application/json"
        );

        return user;
    },

    login: async (email, passwd) => {
        const creds = {
            email: email,
            password: passwd,
        };

        const user = await ApiService.post(
            "auth/login",
            creds, 
            "application/json"
        );

        return user;
    }
};

export default AuthService;

import ApiService from "./ApiService";

const ProfileService = {
    get_profile: async (user_id, token) => {
        const res = await ApiService.get(`user/profile/${user_id}`, token);

        return res;
    },

    update_profile: async (new_data, token) => {
        const res = await ApiService.put(`user/profile/edit`, new_data, token);

        return res;
    },
};

export default ProfileService;

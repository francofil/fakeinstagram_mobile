import ApiService from "./ApiService";

const ProfileService = {
    get_profile: async (user_id, token) => {
        const res = await ApiService.get(`user/profile/${user_id}`, token);

        return res;
    }
};

export default ProfileService;

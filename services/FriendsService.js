import ApiService from "./ApiService";

export const FriendService = {
    add: async (userid, token) => {
        const res = await ApiService.post(`user/add-friend/${userid}`, null, null, token);

        return res;
    },

    remove: async (friendid, token) => {
        const res = await ApiService.delete(`user/remove-friend/${friendid}`, token);

        return res;
    },
};

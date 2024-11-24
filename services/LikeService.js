import ApiService from "./ApiService";

const LikeService = {
    like_post: async (post_id, token) => {
        const res = await ApiService.post(
            `posts/${post_id}/like`,
            null,
            null,
            token
        );

        return res;
    },

    remove_like: async (post_id, token) => {
        const res = await ApiService.delete(
            `posts/${post_id}/like`,
            token
        );

        return res;
    }
    
};

export default LikeService;

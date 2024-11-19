import ApiService from "./ApiService"

const PostService = {
    upload_post: async (image, caption, token) => {
        const post = {
            image: image,
            caption: caption,
        };

        const res = await ApiService.post(
            "posts/upload",
            post,
            "multipart/form-data",
            token
        );

        return res;
    },

    get_feed: async (token) => {
        const res = await ApiService.get(
            "posts/feed",
            token
        );

        return res;
    },
};

export default PostService;

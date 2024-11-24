import ApiService from "./ApiService"

const PostService = {
    upload_post: async (post, token) => {
    //upload_post: async (image, caption, token) => {
        //const post = {
        //    image: image,
        //    caption: caption,
        //};

        const res = await ApiService.post_formData(
            "posts/upload",
            post,
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

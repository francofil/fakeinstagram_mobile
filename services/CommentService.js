import ApiService from "./ApiService";

const CommentService = {
    comment_post: async (comment, post_id, token) => {
        const res = await ApiService.post(
            `posts/${post_id}/comments`,
            {
                "content": comment,
            },
            "application/json",
            token
        );

        return res;
    },

    get_comments: async (comment_id, token) => {
        const res = await ApiService.get(
            `posts/comments/${comment_id}`,
            token
        );

        return res;
    },

    delete_comment: async (post_id, comment_id, token) => {
        const res = await ApiService.delete(
            `posts/${post_id}/comments/${comment_id}`,
            token
        );

        return res;
    },
};

export default CommentService;

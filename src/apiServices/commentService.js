import http_cmt from '~/utils/http_cmt';
const getComment = async (id) => {
    try {
        const result = await http_cmt.post('/findById', { id });
        return result;
    } catch (error) {}
};
const updateComment = async (update) => {
    try {
        await http_cmt.put('/update', { updatecomment: update.comment, id: update.id });
    } catch (error) {}
};
export { getComment, updateComment };

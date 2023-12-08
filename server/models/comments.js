const { ObjectID, connect } = require('./mongo');

/**
 * @typedef {Object} Comment
 * @property {number} id - The Comment's ID.
 * @property {string} content - The Comment's description.
 * @property {string} date - The Comment's date.
 * @property {number} userID - The Comment's owner ID.
 * @property {number} postID - The Comment's post ID.
 */

const COLLECTION_NAME = 'comments';
async function getCollection() {
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

/**
 * @returns {Promise<Comment[]>} An array of comments.
 */
async function getAll() {
    const col = await getCollection();
    return col.find({}).toArray(); //find function returns a cursor for a filter
}

/**
 * @param {number} id - The Comment's ID.
 */
async function get(id) {
    //
    const col = await getCollection();
    return await col.findOne({ _id: ObjectID(id) }); // findOne returns a promise
}

async function search(query) {
    const col = await getCollection();
    const comments = await col.find({
        $or: [
            { userID: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
        ],
    }).toArray();

    return comments;
}

//CRUD: create read update delete

/**
 * @param {Comment} Comment - Comment to create
 * @returns {Promise<Comment>} - created Comment
 */
async function create(Comment) {
    const newComment = {
        id: data.comments.length + 1,
        ...Comment,
    };
    const col = await getCollection();
    const result = await col.insertOne(newComment); // 
    newComment._id = result.insertedId;

    return newComment;
}

/**
 * @param {Comment} Comment - Comment's data
 * @returns {Comment} - updated Comment
 */
async function update(Comment) {
    const col = await getCollection();
    const result = await col.findOneAndUpdate( // 3 params:
        { _id: ObjectID(Comment.id) },  // whats being updated
        { $set: Comment },  // what are we changing
        { returnDocument: 'after' },  // optional options
    );
    return result;
}

/**
 * @param {string} id - Comment's id
 */
async function remove(id) {
    const col = await getCollection();
    const result = await col.deleteOne({ _id: ObjectID(id) });
    if (result.deletedCount === 0) {
        throw new Error('Comment not found');
    }
}

module.exports = {
    getAll, get, search, create, update, remove, getCollection, COLLECTION_NAME
};
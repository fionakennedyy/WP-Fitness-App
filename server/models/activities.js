const { ObjectID, connect } = require('./mongo');
const data = require("../data/activities.json");

/*
id: number;
        title: string;
        type: string;
        duration: string;
        date: string;
        userID: number;
        userName: string;
        */
/**
 * @typedef {Object} Activity
 * @property {number} id - The activity's ID.
 * @property {string} title - The activity's title.
 * @property {string} description - The activity's description.
 * @property {string} type - The activity's type.
 * @property {string} duration - The activity's duration.
 * @property {string} date - The activity's date.
 * @property {number} userID - The activity's owner ID.
 * @property {string[]} images - The activity's images.
 */

const COLLECTION_NAME = 'activities';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

/**
 * @returns {Promise<Activity[]>} An array of activities.
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray(); //find function returns a cursor for a filter
}

/**
 * @param {number} id - The activity's ID.
 */
async function get(id) {
  //
  const col = await getCollection();
  return await col.findOne({ _id: ObjectID(id) }); // findOne returns a promise
}

async function getByType(type) {
  const col = await getCollection();
  return await col.findOne({ type });
}

async function search(query) {
  const col = await getCollection();
  const activities = await col.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  }).toArray();

  return activities;
}

//CRUD: create read update delete

/**
 * @param {Activity} activity - activity to create
 * @returns {Promise<Activity>} - created activity
 */
async function create(activity) {
  const newActivity = {
    id: data.activities.length + 1,
    ...activity,
  };
  const col = await getCollection();
  const result = await col.insertOne(newActivity); // 
  newActivity._id = result.insertedId;
  
  return newActivity;
}

/**
 * @param {Activity} activity - activity's data
 * @returns {Activity} - updated activity
 */
async function update(activity) {
  const col = await getCollection();
  const result = await col.findOneAndUpdate( // 3 params:
    { _id: ObjectID(activity.id) },  // whats being updated
    { $set: activity },  // what are we changing
    { returnDocument: 'after' },  // optional options
  );
  return result;
}

/**
 * @param {string} id - activity's id
 */
async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ _id: ObjectID(id) });
  if(result.deletedCount === 0) {
    throw new Error('Activity not found');
  }
}

async function seed() { // sample data for running without database
  const col = await getCollection();
  await col.insertMany(data.activities);
}

module.exports = {
  getAll, get, getByType, search, create, update, remove, getCollection, COLLECTION_NAME, seed
};
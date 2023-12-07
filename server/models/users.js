/*
  Model:
  Data and business logic.
  Encapsulates data structure, database operations,
  and rules/logic related to manipulation of data.
*/

/**
* @typedef {Object} Bank
* @property {string} cardExpire
* @property {string} cardNumber
* @property {string} cardType
* @property {string} currency
* @property {string} iban
*/

/**
* @typedef {Object} Coordinates
* @property {number} lat
* @property {number} lng
*/

/**
* @typedef {Object} Address
* @property {string} address
* @property {string} [city]
* @property {Coordinates} coordinates
* @property {string} postalCode
* @property {string} state
*/

/**
* @typedef {Object} Company
* @property {Address} address
* @property {string} department
* @property {string} name
* @property {string} title
*/

/**
* @typedef {Object} BaseUser
* @property {string} firstName
* @property {string} lastName
* @property {string} maidenName
* @property {number} age
* @property {string} gender
* @property {string} email
* @property {string} phone
* @property {string} username
* @property {string} password
* @property {string} birthDate
* @property {string} image
* @property {string} bloodGroup
* @property {number} height
* @property {string} macAddress
* @property {string} university
* @property {Bank} bank
* @property {Company} company
* @property {string} ein
* @property {string} ssn
* @property {string} userAgent
*/

/**
* @typedef {Object} HasId
* @property {number} id
*/

/**
* @typedef {BaseUser & HasId} User
*/

/**
* @type { {users: User[]} }
*/
const { connect } = require("http2");
const data = require("../data/users.json");

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
/**
* @returns {User[]} An array of products.
*/
function getAll() {
    return data.users;
}

/**
* @param {number} id - The product's ID.
*/
function get(id) {
    const item = data.users.find(x => x.id === id);
    if (!item) {
        throw new Error('User not found');
    }
    return item
}

function search(query) {
    return data.users.filter(x => {
        return (
            x.firstName.toLowerCase().includes(query.toLowerCase()) ||
            x.lastName.toLowerCase().includes(query.toLowerCase()) ||
            x.email.toLowerCase().includes(query.toLowerCase()) ||
            x.username.toLowerCase().includes(query.toLowerCase())
        );
    });
}

/**
* @param {BaseUser} values - The user to create.
* @returns {User} The created user.
*/
function create(values) {
    const newItem = {
        id: data.users.length + 1,
        ...values,
    };

    data.users.push(newItem);
    return newItem;
}

/**
* @param {BaseUser} values - The user to create.
* @returns {User} The created user.
*/
async function register(firstName, lastName, email, password, birthdate, gender) {

    // Authentication
    if(!firstName || !lastName || !email || !password || !birthdate || !gender) {
        throw new Error('All fields must be filled out');
    }
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }

    // Connect to db
    const db = await connect();
    const usersCol = db.collection('users');
    const user = await usersCol.findOne({ email });

    if (user) {
        throw new Error('An account already exists with this email');
    }

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthdate: birthdate,
        gender: gender,
        role: 'user'
    };

    const result = await usersCol.insertOne(newUser)
    if (result.insertedCount === 1) {
        return newUser;
    }
    else {
        throw new Error('Failed to register user');
    }
}

/**
* @param {string} email
* @param {string} password
* @returns { Promise< { user: User, token: string}> } The created user
*/
async function login(email, password) {

    const item = data.users.find(x => x.email === email);
    if (!item) {
        throw new Error('User not found');
    }

    if (item.password !== password) {
        throw new Error('Wrong password');
    }

    const user = { ...item, password: undefined, };
    const token = await generateJWT(user);
    return { user, token };
}

/**
* @param {User} newValues - The user's new data.
* @returns {User} The updated user.
*/
function update(newValues) {
    const index = data.users.findIndex(p => p.id === newValues.id);
    if (index === -1) {
        throw new Error('User not found');
    }
    data.users[index] = {
        ...data.users[index],   // copy
        ...newValues,   // new
    };
    return data.users[index];
}

/**
* @param {number} id - The user's ID.
*/
function remove(id) {
    const index = data.users.findIndex(x => x.id === id);
    if (index === -1) {
        throw new Error('User not found');
    }
    data.users.splice(index, 1);
}

function generateJWT(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    })
}

function verifyJWT(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    })
}

module.exports = {
    getAll, get, search, create, update, remove, login, register, generateJWT, verifyJWT
};


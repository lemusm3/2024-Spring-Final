
const fs = require('fs/promises');

const fileName = __dirname + '/../data/products.json';

/** @type { Promise< { items: Products[] } > } */
const dataP = fs
        .access(fileName, fs.constants.F_OK)
        .then(() => fs.readFile(fileName, 'utf8'))
        .then(content => JSON.parse(content))


async function save() {
    const data = await dataP;
    return fs.writeFile(fileName, JSON.stringify(data, null, 2));
}

/**
 * @typedef {import('../../../client/src/model/products').Product} Product
 * */

/**
 * @returns {Promise<Product[]>}
 * */
async function getAll() {
    const data = await dataP;
    return data.items
}

/**
 * @param {number} id
 * @returns {Promise<Product>}
 * */
async function get(id) {
    const data = await dataP;
    return data.items.find(item => item.id == id);
}

/**
 * @param {string} q
 * @returns {Promise<Product[]>}
 * */
async function search(q) {
    return (await getAll()).filter(item => 
        new RegExp(q, 'i').test(item.place) ||
        new RegExp(q, 'i').test(item.email) );
}

/**
 * @param {Product} product
 * @returns {Promise<Product>}
 * */
async function add(param) {
    const data = await dataP;
    param.id = data.items.length + 1;
    data.items.push(param);
    console.log("2: About to save");
    
    await save()        
    console.log("3: Saved")

    console.log("4: About to return Product");
    return param;
}

/**
 * @param {string} id
 * @returns {Promise<Product | null>}
 * */
async function remove(id) {
    const data = await dataP;
    const index = data.items.findIndex(item => item.id == id);
    if (index >= 0) {
        const deleted = data.items.splice(index, 1);
        await save()
        return deleted[0];
    }
    return null;
}


async function update(Product) {
    const data = await dataP;
    const index = data.items.findIndex(item => item.id == Product.id);
    if (index >= 0) {
        data.items[index] = {
            ...data.items[index],
            ...Product
        };
        await save()
        return Product;
    }
    return null;
}

module.exports = {
    getAll, get, search, add, update, remove
}
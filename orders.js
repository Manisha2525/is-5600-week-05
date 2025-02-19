const fs = require('fs').promises
const path = require('path')
const cuid = require('cuid')
const db = require('./db')

const productsFile = path.join(__dirname, 'data/full-products.json')

// Define the Product Model
const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true },
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true },
  },
  tags: [{
    title: { type: String, required: true },
  }],
})

/**
 * Fetch a list of products with optional filters.
 * @param {*} options - Options for filtering and pagination.
 * @returns {Promise<Array>} - A list of products.
 */
async function list(options = {}) {

  const { offset = 0, limit = 25, tag } = options;

  // Build query for filtering by tag if provided
  const query = tag ? {
    tags: {
      $elemMatch: {
        title: tag
      }
    }
  } : {}

  // Fetch products from the database with the specified filters
  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

  return products
}

/**
 * Retrieve a single product by its ID.
 * @param {string} _id - The ID of the product.
 * @returns {Promise<object>} - The product object.
 */
async function get(_id) {
  // Fetch the product by its ID
  const product = await Product.findById(_id)
  return product
}

/**
 * Create a new product in the database.
 * @param {object} fields - The fields for the new product.
 * @returns {Promise<object>} - The created product.
 */
async function create(fields) {
  // Create and save the new product
  const product = await new Product(fields).save()
  return product
}

/**
 * Edit an existing product's details.
 * @param {string} _id - The ID of the product to update.
 * @param {object} change - The changes to apply to the product.
 * @returns {Promise<object>} - The updated product.
 */
async function edit(_id, change) {
  // Retrieve the product to be updated
  const product = await get(_id)

  // Apply the changes to the product
  Object.keys(change).forEach(function(key) {
    product[key] = change[key]
  })

  // Save the updated product
  await product.save()
  return product
}

/**
 * Delete a product by its ID.
 * @param {string} _id - The ID of the product to delete.
 * @returns {Promise<object>} - The result of the deletion.
 */
async function destroy(_id) {
  // Delete the product from the database
  return await Product.deleteOne({ _id })
}

module.exports = {
  list,
  create,
  edit,
  destroy,
  get
}

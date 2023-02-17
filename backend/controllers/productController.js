import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: new RegExp(req.query.keyword, 'i')
    } : {}
    const products = await Product.find({...keyword})
    res.json(products)
})

//@desc Fetch single products
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc Delete a prodcut
//@route DELETE /api/products/:id
//@access Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: 'Product Removed'})
    } else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc create a prodcut
//@route POST /api/products
//@access Private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        user: req.user._id,
        image: '/images/sample.jpg',
        role: 'Sample Role',
        ctc: 0,
        description: 'Sample Description',
        deadline: Date.now(),
        location: 'Sample Locations'
    })

    const createdProduct = await product.save()
    res.status(200).json(createdProduct)
})

//@desc update a prodcut
//@route PUT /api/products/:id
//@access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name, image, ctc, role, description, deadline, location} = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.image = image
        product.ctc = ctc
        product.role = role
        product.description = description
        product.deadline = deadline
        product.location = location
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//@desc create new review
//@route POST /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async (req, res) => {
    const {comment} = req.body
    const product = await Product.findById(req.params.id)

    if(product){
        // const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        // if(alreadyReviewed) {
        //     res.status(400)
        //     throw new Error('Product already reviewed')
        // }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length

        await product.save()
        res.status(201).json({message: 'Review Added'})
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview
}
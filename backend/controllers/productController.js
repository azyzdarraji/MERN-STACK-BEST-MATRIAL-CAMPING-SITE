const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures')




// Create Product---Admin 

exports.createProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});


// Get ALL Products 

exports.getAllProducts = catchAsyncErrors(async(req, res,next) => {


    const resultPerPage =8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()


        let products = await apiFeature.query ;
        let filtredProductsCount = products.length;
        apiFeature.pagination(resultPerPage);
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filtredProductsCount,
    })

});

// update product --- ADMIN

exports.updateProduct = catchAsyncErrors(async(req, res, next) => {
        let product = await Product.findById(req.params.id)

        try {
            const product = await Product.findByIdAndUpdate(req.params.id, { $set: {...req.body } })
            res.status(200).json({
                success: true,
                product
            })
        } catch {
            return next(new ErrorHander("Product not found", 404));

        }
    })
    //  GET ONE PRODUCT Detail

exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            success: true,
            product,
                })
    } catch (error) {

        return next(new ErrorHander("Product not found", 404));
    }
})

// Delete Product

exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Product deleted succefuly"
        })

    } catch (error) {
        return next(new ErrorHander("Product not found", 404));
    }
})

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async(req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId, {
            reviews,
            ratings,
            numOfReviews,
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});
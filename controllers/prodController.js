import { Product } from "../db/product.js";

// getting all the products
const getAllProds = async (req, res) => {
    try{
        const products = await Product.find();
        // console.log((products));
        res.render("home", {title: "Home", products: products, isLoggedIn: global.isLoggedIn});
    } catch(err) {
        console.log(err);
    }
};

//Showing the edit product page
const editProds = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        console.log(product);
        if(product){
            res.render("editProd", {title: "Edit Product", prod: product, isLoggedIn: global.isLoggedIn});
        } else {
            res.redirect("/");
        }
        // console.log(cookie);
    } catch(err) {
        console.log(err);
    }
};

// Update each product function
const updateEachProd = async (req, res) => {
    // console.log(req.body);
    const {prod_name, price} = req.body;
    const img = req.file.filename;
    const id = req.params.id;
    // console.log(id, prod_name, price, image);
    try{
        const prod = await Product.findById(id);
        if(prod){
            prod.pName = prod_name;
            prod.price = price;
            prod.image = img;
            
            await prod.save();
            console.log("Product editted successfully!!");
            res.redirect("/");
        } else {
            console.log("Product not found");
            res.status(400).send("Product not found");
        }
    } catch (err) {
        console.log(err);
    }
};

// Showing Add product page
const renderAddProd = (req, res) => {
    // console.log(cookie);
    res.render("addProd", {title: "Add Product", isLoggedIn: global.isLoggedIn});
};

const postAddProd = async (req, res) => {
    const {prod_name, price} = req.body;
    const img = req.file.filename;
    try{
        const addProd = await Product.create({
            pName: prod_name,
            price: price,
            image: img
        });
        console.log("Product added successfully!!", addProd);
        res.redirect("/");
    } catch(err) {
        console.log(err);
    }
};

// Function for deleting a product
const delProd = async (req, res) => {
    const id = req.params.id;
    try{
        await Product.findByIdAndDelete(id);
        console.log("Product deleted successfully!!");
        res.redirect("/");
    } catch(err) {
        console.log(err);
    }
};

export {getAllProds, editProds, renderAddProd, postAddProd, updateEachProd, delProd};

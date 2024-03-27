import { Product } from "../db/product.js";

// getting all the products
const getAllProds = async (req, res) => {
    try{
        const products = await Product.findAll();
        console.log(JSON.stringify(products, null, 2));
        res.render("home", {title: "Home", products: products, isLoggedIn: global.isLoggedIn});
    } catch(err) {
        console.log(err);
    }
};

//Showing the edit product page
const editProds = async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id);
        console.log(JSON.stringify(product, null, 2));
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
        await Product.update({
            pName: prod_name,
            price: price,
            image: img
        },
        {where: {id: id}}
        );
        console.log("Product updated");
        res.redirect("/");
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
        await Product.create({
            pName: prod_name,
            price: price,
            image: img
        });
        console.log("Product added successfully!!");
        res.redirect("/");
    } catch(err) {
        console.log(err);
    }
};

// Function for deleting a product
const delProd = async (req, res) => {
    const id = req.params.id;
    try{
        await Product.destroy(
            {where: {id: id}}
        )
        console.log("Product deleted successfully!!");
        res.redirect("/");
    } catch(err) {
        console.log(err);
    }
};

export {getAllProds, editProds, renderAddProd, postAddProd, updateEachProd, delProd};

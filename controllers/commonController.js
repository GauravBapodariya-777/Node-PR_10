const registerTbl = require('../models/registerTbl');
const jwt = require('jsonwebtoken');
const categoryTbl = require('../models/categoryTbl');
const subcategoryTbl = require('../models/subcategoryTbl');
const productTbl = require('../models/productTbl');
const fs = require('fs')

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let registerData = await registerTbl.create({
            name: name,
            email: email,
            password: password,
            role: role
        })
        if (registerData) {
            return res.json({ message: "User registered successfully", status: 1 });
        } else {
            return res.json({ message: "User not registered", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const viewRegister = async (req, res) => {
    try {
        let viewData = await registerTbl.find({})
        if (viewData) {
            return res.json({ data: viewData, status: 1 });
        } else {
            return res.json({ message: "User not view", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteUser = async (req, res) => {
    try {
        let delUser = await registerTbl.findByIdAndDelete(req.body.id);
        if (delUser) {
            return res.json({ message: "User deleted successfully", status: 1 });
        } else {
            return res.json({ message: "User not Found", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let editUser = await registerTbl.findByIdAndUpdate(req.body.id, {
            name: name,
            email: email,
            password: password,
            role: role
        });
        if (editUser) {
            return res.json({ message: "User updated successfully", status: 1 });
        } else {
            return res.json({ message: "User not updated", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let loginUser = await registerTbl.findOne({ email: email });
        if (!loginUser || loginUser.password != password) {
            return res.json({ message: "Invalid email or password", status: 0 });
        } else {
            const Token = jwt.sign({ payload: loginUser }, 'rudra', { expiresIn: '1hr' });
            return res.json({ token: Token });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addCategory = async (req, res) => {
    let insertCategory = await categoryTbl.create({
        category: req.body.category
    })
    if (insertCategory) {
        return res.json({ message: "Category added successfully", status: 1 })
    } else {
        return res.json({ message: "Category not added", status: 0 })
    }
}
const viewCategory = async (req, res) => {
    try {
        let categoryData = await categoryTbl.find({})
        if (categoryData) {
            return res.json({ data: categoryData, status: 1 });
        } else {
            return res.json({ message: "Category not view", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.json({ message: "Somthing Wrong...!", status: 0 });
    }
}
const deleteCategory = async (req, res) => {
    try {
        let delCategory = await categoryTbl.findByIdAndDelete(req.body.id);
        if (delCategory) {
            return res.json({ message: "Category deleted successfully", status: 1 });
        } else {
            return res.json({ message: "Category not found", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateCategory = async (req, res) => {
    try {
        let editCategory = await categoryTbl.findByIdAndUpdate(req.body.id, {
            category: req.body.category
        });
        if (editCategory) {
            return res.json({ message: "Category updated successfully", status: 1 });
        } else {
            return res.json({ message: "Category not updated", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addSubcategory = async (req, res) => {
    let insertSubcategory = await subcategoryTbl.create({
        categoryId: req.body.categoryId,
        subcategory: req.body.subcategory
    })
    if (insertSubcategory) {
        return res.json({ message: "Subcategory added successfully", status: 1 })
    } else {
        return res.json({ message: "Subcategory not added", status: 0 })
    }
}
const viewSubcategory = async (req, res) => {
    try {
        let subcategoryData = await categoryTbl.aggregate([
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "viewSubcategory"
                }
            }
        ])
        if (subcategoryData) {
            return res.json({ data: subcategoryData, status: 1 });
        } else {
            return res.json({ message: "Subcategory not view", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteSubcategory = async (req, res) => {
    try {
        let delSubcategory = await subcategoryTbl.findByIdAndDelete(req.body.id);
        if (delSubcategory) {
            return res.json({ message: "Subcategory deleted successfully", status: 1 });
        } else {
            return res.json({ message: "Subcategory not deleted", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateSubcategory = async (req, res) => {
    try {
        let editSubcategory = await subcategoryTbl.findByIdAndUpdate(req.body.id, {
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategory
        });
        if (editSubcategory) {
            return res.json({ message: "Subcategory updated successfully", status: 1 });
        } else {
            return res.json({ message: "Subcategory not updated", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addProduct = async (req, res) => {
    try {
        const { categoryId, subcategoryId, product, quantity, description, price } = req.body;
        console.log(req.file);
        let inProduct = await productTbl.create({
            categoryId: categoryId,
            subcategoryId: subcategoryId,
            product: product,
            quantity: quantity,
            description: description,
            price: price,
            image: req.file.path
        })
        if (inProduct) {
            return res.json({ message: "Product added successfully", status: 1 });
        } else {
            return res.json({ message: "Product not added", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const viewProduct = async (req, res) => {
    try {
        let ProductData = await categoryTbl.aggregate([
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: 'Subcategorydata'
                }
            },
            {
                $unwind: '$Subcategorydata'
            },
            {
                $lookup: {
                    from: "products",
                    localField: "Subcategorydata._id",
                    foreignField: "subcategoryId",
                    as: "Productdata"
                }
            }
        ])
        if (ProductData) {
            return res.json({ message: ProductData, status: 1 });
        } else {
            return res.json({ message: "Product not added", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteProduct = async (req, res) => {
    try {
        const dataDelete = await productTbl.findById(req.body.id);
        if (dataDelete) {
            fs.unlinkSync(dataDelete.image);
            let delproduct = await productTbl.findByIdAndDelete(req.body.id);
            if (delproduct) {
                return res.json({ message: "Product deleted successfully", status: 1 });
            } else {
                return res.json({ message: "Product not deleted", status: 0 });
            }
        } else {
            return res.json({ message: "Product Not Found...!" });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
// const updateProduct = async (req,res) => {
//     try{
//         const {categoryId,subcategoryId,product,quantity,description,price,image} = req.body; 
//         let editProduct = await productTbl.findByIdAndUpdate(req.body.id,{
//             categoryId : categoryId,
//             subcategoryId : subcategoryId,
//             product : product,
//             quantity : quantity,
//             description : description,
//             price : price,
//             image : image
//         })
//         if(editProduct){
//             return res.json({message : "Updated successfully", status : 1});
//         }else{
//             return res.json({message : "Product not found", status : 0});
//         }
//     }catch(err){
//         console.log(err);
//         return false;
//     }
// }
const updateProduct = async (req, res) => {
    try {
        const { id, categoryId, subcategoryId, product, price, quantity, description } = req.body;
        console.log(req.file);
        // Check if a file was uploaded
        if (req.file) {
            const image = req.file.path; // Get the path of the uploaded image
            const data = await productTbl.findByIdAndUpdate(id, {
                categoryId: categoryId,
                subcategoryId: subcategoryId,
                product: product,
                quantity: quantity,
                description: description,
                price: price,
                image: image
            });

            if (data) {
                return res.json({ message: "Product is updated", status: 1 });
            } else {
                return res.json({ message: "Product is not updated", status: 0 });
            }
        } else {
            return res.json({ message: "No file was uploaded", status: 0 });
        }
    } catch (err) {
        console.error(err);
        return res.json({ message: "An error occurred while updating the product", status: 0 });
    }
}

// const updateProduct = async (req, res) => {
//     try {
//         console.log(req.body);
//         console.log(req.file);
//         if (req.file) {
//             const { id, categoryId, subcategoryId, product, quantity, description, price } = req.body;
//             let imagedata = await productTbl.findById(id);
//             console.log(imagedata);
//             if (imagedata) {
//                 fs.unlinkSync(imagedata.image);
//                 let image = req.file.path;
//                 let editProduct = await productTbl.findByIdAndUpdate(req.body.id, {
//                     categoryId: categoryId,
//                     subcategoryId: subcategoryId,
//                     product: product,
//                     quantity: quantity,
//                     description: description,
//                     price: price,
//                     image: image
//                 })
//                 if (editProduct) {
//                     return res.json({ message: "Updated successfully", status: 1 });
//                 } else {
//                     return res.json({ message: "Product not found", status: 0 });
//                 }
//             }
//         }
//         else {
//             const { id, categoryId, subcategoryId, product, quantity, description, price } = req.body;
//             let imageupdate = await productTbl.findById(id);
//             console.log(imageupdate);
//             if (imageupdate) {
//                 let image = imageupdate.path;
//                 let editProduct = await productTbl.findByIdAndUpdate(id, {
//                     categoryId: categoryId,
//                     subcategoryId: subcategoryId,
//                     product: product,
//                     quantity: quantity,
//                     description: description,
//                     price: price,
//                     image: image
//                 })
//                 if (editProduct) {
//                     return res.json({ message: "Updated successfully", status: 1 });
//                 } else {
//                     return res.json({ message: "Product not found", status: 0 });
//                 }
//             }
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return false;
//     }
// }

module.exports = {
    register,
    viewRegister,
    deleteUser,
    updateUser,

    login,

    addCategory,
    viewCategory,
    deleteCategory,
    updateCategory,

    addSubcategory,
    viewSubcategory,
    deleteSubcategory,
    updateSubcategory,

    addProduct,
    viewProduct,
    deleteProduct,
    updateProduct
}
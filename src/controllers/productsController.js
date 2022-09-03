const express = require('express');

/**fs para llamar la funcion y escribir un archivo*/
const fs = require('fs');
/** metodo para manejar las rutas relativas y absolutas */
const path = require('path');

/**
 * editar archivos del json
 */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const product = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** llamamos a la base de datos de productos */
//const productsBaseDatos = require('../data/productsDataBase.json');
//const mainControllers = require('./mainControllers');

//** empece la logica de controllers faltan logicas*/
const productsController = {
    products: (req, res) =>{
        res.render('products', {
			product,
			toThousand
		})
    },
    
    detail: (req, res) => {
		let id = req.params.id
		let productDetail = product.find(product => product.id == id)
		res.render('productDetail', {
			productDetail,
			toThousand
		})
	},

    createProducts: (req, res) =>{
        res.render('productsCreate');
        
        // let nuevoProducto= {
        // Nombre_del_producto: req.body.Nombre_del_producto,
        // Descripción: req.body.Descripción,
        // Imagen: req.body.Imagen,
        // Categoría:req.body.Categoría,
        // Presentación: req.body.Presentación,
        // Precio: req.body.Precio, 
        // Destacado: req.body.Destacado 
    },
     
       // res.send(),
        //res.redirect('/'),
    //},
    
    
	//* Create -  Method to store/
	store: (req, res) => {
		let image
		console.log(req.files);
		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-image.png'
		}
		let newProduct = {
			id: product[product.length - 1].id + 1,
			...req.body,
			image: image
		};
		product.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(product, null, ' '));
		res.redirect('/');
	},

    /*editar productos*/
    edit: (req, res) => {
		let id = req.params.id
		let productToEdit = product.find(product => product.id == id)
		res.render('product-edit-form', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = product.find(product => product.id == id)
		let image

		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = productToEdit.image
		}

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: image,
		};
		
		let newProducts = product.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
	},

    //     // Delete - Delete one product from DB
    destroy : (req, res) => {
		let id = req.params.id;
		let finalProducts = product.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	}
}

module.exports = productsController;
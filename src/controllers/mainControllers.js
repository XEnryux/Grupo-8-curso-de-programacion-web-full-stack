const express = require('express');
const path = require('path');
//const fetch = require('node-fetch');


const productsBaseDatos = require('../data/productsDataBase.json');
const { gzip } = require('zlib');
const { response } = require('express');
//-----//

const mainController = {
    cart: (req, res) => {
        res.render('cart');
    },
    home: (req, res) => {
        res.render('home');
    },
    us:(req, res) =>{
        const url = 'https://graph.instagram.com/5840228599377681?fields=id,username&access_token=IGQVJWRlBTWXJNeExGSVBnUmhLeHBwQXJxWGhYenVmOTc1N0NFUW9nRUp4ZAi05S2hndThJX19TbXFuQUZAlU0JuR2YzQnpaS0JnU0xzMFcya1NGaE5Bb0R1ZAGw2MkFTMnlucjVFR1AyR3N2cUphRGJWWgZDZD';
        fetch(url)
        .then(response => response.json())
        .then(data => {crearHtml(data.data)})
        function crearHtml(data){
            for(const img of data){
                galery.innerHTML
            }
        }
        res.render('us')
    },
    legales: (req, res) => {
        res.render('legales') 
    }
}

module.exports = mainController;

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app =express();
const PORT = process.env.PORT ||3000;

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/add', (req,res)=>{
    res.render('add');
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

let contacts = JSON.parse(fs.readFileSync('./data/contacts.json','utf8'));

app.post('/add', (req, res) =>{
    const newContact = req.body;
    console.log(newContact)
    contacts.push(newContact);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect("/")
});

app.get('/', (req,res) => {
    res.render('index', {contacts});
})

app.get('/view/:id', (req, res) => {
    const id = req.params.id;
    const contact = contacts[id];
    res.render('view', {contact});
});


app.get('/edit/:id', (req,res)=>{
    const id = req.params.id;
    const contact = contacts[id];
    res.render('edit', {id, contact});
});


app.post('/edit/:id', (req, res) =>{
    const id = req.params.id;
    contacts[id] = req.body;
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect("/")
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    contacts.splice(id, 1);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect("/")
})
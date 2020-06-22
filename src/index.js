const express = require('express');
const multer = require('multer');
const upload = multer({dest:'tmp_uploads/'});

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.render('main', {
        name: 'Shinder',
    });
    //res.send('<h2>Hello Express</h2>');
    //res.end('<h2>Hello Express 2</h2>');
});

app.get('/json-sales', (req, res)=>{
    const sales = require(__dirname + '/../data/sales');
    //console.log(data);
    //res.json(data);
    res.render('json-sales', { sales });
});

app.get('/try-qs', (req, res)=>{
    res.json(req.query);
});




app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
});

app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form', req.body);
    // res.json(req.body);
});

app.post('/try-upload', upload.single('avatar'), (req, res)=>{
    res.json(req.file);
});

// app.get('/a.html', (req, res)=>{
//     res.send('<h2>假的 a.html</h2>');
// });

app.use(express.static('public'));

app.use((req, res)=>{
    res.status(404).send('<h2>找不到頁面</h2>')
});

app.listen(3000, ()=>{
    console.log('server started!');
});
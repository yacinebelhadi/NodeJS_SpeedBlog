const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();

const dbacc = 'mongodb+srv://<username>:<password>@cluster0.oclrduf.mongodb.net/<database_name>?retryWrites=true&w=majority'
mongoose.connect(dbacc)
// listen for request
    .then((result) => app.listen(3000))
    .catch((err) => console.log("db error"+ err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true}));

// add static data
// app.get('/add-blog', (req,res)=>{
//     const blog = new Blog({
//         title:'new blog',
//         author:'speed',
//         body: 'lorem ipsum qskdjhqskdjh'
//     });

//     blog.save()
//     .then((result)=>{
//         res.send(result),
//         console.log("data added")
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })

// app.get('/all-blogs',(req,res)=> {
//     Blog.find()
//     .then((result)=>
//     res.send(result))
//     .catch((err)=> {
//         console.log(err);
//     });
// })


app.get('/',(req,res) => {
    // res.redirect('/blogs')
    Blog.find().sort({createdAt: -1})
    // res.render('index',{title: 'Home'});
    .then((result) => {
        res.render('index',{title: 'Home', blogs: result})
    })
    .catch((err) => {
        console.log(err)
    });
})
app.get('/blogs',(req,res) => {
    res.redirect('/');
})

app.get('/about',(req,res) => {
    res.render('about',{title: 'About'});
})
app.post('/blogs',(req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err)
    })
    
})

app.get('/blogs/:id',(req, res ) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        console.log(result)
        res.render('details', {title: 'blog details', blog:result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        // must response with json object we can't response by redirection
        res.json( {redirect:'/blogs'})
    })
    .catch(err => console.log(err));
})

app.get('/create',(req,res) => {
    res.render('create',{title: 'Create'});
})

app.use((req,res) => {
    res.status(404).render('404',{title: '404'})
})
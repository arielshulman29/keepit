if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const methodOverrride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
//for using boilerplate layouts
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const app = express();
//require routers
const furnitureRoutes = require ('./routes/furniture');
const emailRoutes = require ('./routes/email');
const userRoutes = require ('./routes/user');
const editRoutes = require ('./routes/edit');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require("./models/user");
const mongoSanitize = require('express-mongo-sanitize');
// // const helmet = require('helmet');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/keepit';
const secret = process.env.SECRET;


mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify : false
});

const db=mongoose.connection;

db.on("error",console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
})

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverrride('_method'));
//in order to include external files 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// // against mongo injections
// app.use(mongoSanitize());
// app.use(helmet({ contentSecurityPolicy: false }));

// const secret = process.env.SECRET || 'puppies';
//על מנת לשמור את נתוני הסשן במסד נתונים ולא בזכרון המקומי
// const store = new MongoStore({
//     url: dbUrl,
//     secret,
//     touchAfter: 24 * 60 * 60
// })

// store.on("error", function (e) {
//     console.log("store error", e);
// })

const sessionConfig = {
    // store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxDate: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://cdn.jsdelivr.net",
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
// const fontSrcUrls = [];
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/arielscloud/", 
//                 "https://images.unsplash.com/",
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );


//לצורך אתחול ססמא
app.use(passport.initialize())
//יש לשים לב לקרוא רק אחרי שכבר הגדרנו session
app.use(passport.session());
//the passport-local-mongoose plungin generates for us the functions: 
//authenticate-how to authenticate the user
//serializeUser/deserialize-how to store/unstore a user in a session
//in these lines we tell passport to use the functions generated by the plugin
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//ניצור פונקציית ביניים שמאפשרת לנו לגשת לכל מה שנכנס בפלקס בבקשה באמצעות משתנה לוקלי
app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//route the code
app.use('/mail', emailRoutes)
app.use('/user', userRoutes)
app.use('/edit', editRoutes)
app.use('/', furnitureRoutes)

app.all('*',(req, res, next) => {
    next(new ExpressError('Page Not Found',404));
})

//ניהול שגיאות- נמצא בסוף במכוון
app.use((err,req,res,next) => {
//במקרה בו לא נקבל סטטוס שגיאה נקבע- לא נמצא
    const { statusCode = 500 } = err;
    if(!err.message) err.message='something went wrong';
    res.status(statusCode).render('error', { err });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log (`serving on port ${port}`);
})
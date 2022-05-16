import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views'));

const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();
const db = client.db('membershipRegister');
const membersCollection = db.collection('members');

app.get('/', (req, res) => {

    res.render('landingPage');

})


app.listen(port, () => {

    console.log(`listening on port ${port}`);

})

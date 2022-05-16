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

//Hämtar startsidan när vi går in på localhost:3000
app.get('/', (req, res) => {

    res.render('landingPage');

})

//Hämtar members sidan när vi går in på localhost:3000/members
app.get('/members', async (req, res) => {

    const members = await membersCollection.find({}).toArray();

    res.render('members', { members });

})

app.get('/members/member/:id', async (req, res) => {

    const member = await membersCollection.findOne({ _id: ObjectId(req.params.id) });

    res.render('member', member);
    
})

app.listen(port, () => {

    console.log(`listening on port ${port}`);

})

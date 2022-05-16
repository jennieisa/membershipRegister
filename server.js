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

//Hämtar member sidan när vi går in på localhost:3000/members/member/id
app.get('/members/member/:id', async (req, res) => {

    const member = await membersCollection.findOne({ _id: ObjectId(req.params.id) });

    res.render('member', member);

})

//Hämtar createMember sidan när vi går in på localhost/members/createMember
app.get('/members/createMember', (req, res) => {

    res.render('createMember');

})

//POST request till /members/createMember för att skapa ny användare
app.post('/members/createMember', async (req, res) => {

    await membersCollection.insertOne(req.body);

    res.redirect('/members');

})

//DELETE request till /member/:id/delete
app.get('/member/:id/delete', async (req, res) => {

    await membersCollection.deleteOne({ _id: ObjectId(req.params.id) });

    res.redirect('/members');

})

//Hämtar changeMember sidan när vi går in på localhost/member/:id/changeMember
app.get('/member/:id/changeMember', async (req, res) => {

    const member = await membersCollection.findOne({ _id: ObjectId(req.params.id) });

    res.render('changeMember', member);

})

app.listen(port, () => {

    console.log(`listening on port ${port}`);

})

const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.insertOne({
		text: req.body.text,
		createdAt: new Date(),
	});
	res.status(201).send();
});

// Update post


// Delete post
router.delete('/:id', async (req, res) => {
	const posts = await loadPostsCollection();
	try {
		// await posts.deleteOne({ _id: objectId(req.params.id) });
		console.log(req.params.id);
		await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
	} catch (error) {
		console.log(error);
	}
	res.status(200).send();
});

async function loadPostsCollection() {
	const client = await mongodb.MongoClient.connect(
		'mongodb+srv://nicoLepaj:nicoLepajMongo@cluster0.sv88d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
		}
	);

	return client.db('myFirstDatabase').collection('posts');
}

module.exports = router;

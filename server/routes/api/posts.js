const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
		const posts = await loadPostsCollection();
		res.send(await posts.find({}).toArray());
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

// Add post
router.post('/', async (req, res) => {
	const posts = await loadPostsCollection();
	const postToInsert = {
		text: req.body.text,
		createdAt: new Date(),
	};
	await posts.insertOne(postToInsert);
	res.status(201).send(postToInsert);
});

// Update post

// Delete post
router.delete('/:id', async (req, res) => {
	const posts = await loadPostsCollection();
	try {
		await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
	} catch (error) {
	}
	res.status(200).send();
});

module.exports = router;

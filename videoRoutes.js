const express = require('express');
const { getVideoCollection } = require('./connect');

const router =  express.Router();

router.route("/videos/add").post(
    async(req, res) => {
        const { url, title, description} = req.body;

        console.log("url:", url);
        console.log("title:", title);
        console.log("description:", description);
        
        const insertData = {
            url,
            title,
            description
        }

        const collection = getVideoCollection();
        
        try {
            const result = await collection.insertOne(insertData);
            console.log(result);

            res.status(201).json({message: "inserted", videoid: result.insertedId});
        } catch (error) {
            console.error(error);

            res.status(500).json({ message: "Error inserting data"});
        }
    }
)

module.exports = {
    videoRouter: router
};
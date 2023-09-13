const express = require('express');
const { getQuestionCollection } = require('./connect');
const { ObjectId } = require('mongodb');

const router =  express.Router();

router.route("/questions/list/:id").get(
    async(req, res) => {
        const videoid = req.params.id;

        const collection = getQuestionCollection();

        try {
            const questions = await collection.find({ 
                videoid: new ObjectId(videoid)
            }).toArray();

            res.status(200).json(questions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error"});
        }
    }
)

router.route("/questions/add").post(
    async(req, res) => {
        const { videoid, timestamp, question, options} = req.body;

        console.log({ videoid, timestamp, question, options });

        const collection = getQuestionCollection();

        try {
            const result = await collection.insertOne({
                videoid: new ObjectId(videoid),
                timestamp,
            });

            console.log({result});

            res.status(201).json({message: "inserted", questionid: result.insertedId});
        } catch (error) {
            console.error(error);
            res.status(500).send("Error");
        }
    }
)

router.route("/questions/update/:id").put(
    async(req, res) => {
        const { question, options, title, summary} = req.body;
        const questionId = req.params.id;

        console.log({ question, options, title, summary});

        const collection = getQuestionCollection();

        const query = {
            _id: new ObjectId(questionId),
        };

        const updateData = {
            $set: {
                question,
                options,
                title,
                summary,
            },
        };

        try {
            const result = await collection.updateOne(query, updateData);

            console.log(result);

            if(result.matchedCount === 0)
                return res.status(404).json({ message: "Question not found" });
            res.status(200).send("OK");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error");
        }
    }
)

module.exports = {
    questionRouter: router
};
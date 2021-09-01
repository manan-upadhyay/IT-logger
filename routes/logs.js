const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const Logs = require("../models/Logs");
const Techs = require("../models/Techs");

// Route    GET api/logs
// Desc     Get all the logs
// Access   Private
router.get("/", async (req, res) => {
  try {
    const logs = await Logs.find().sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route    POST api/logs
// Desc     Add a log
// Access   Private
router.post(
  "/",
  [
    body("message", "Message is required").not().isEmpty(),
    body("tech", "Tech must be selected").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, tech, attention, date } = req.body;

    try {
      const newLog = new Logs({
        message,
        tech,
        attention,
        date,
      });

      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route    DELETE api/logs/:id
// Desc     Delete a log
// Access   Private
router.delete("/:_id", async (req, res) => {
  try {
    let log = Logs.findById(req.params._id);
    if (!log) return res.status(404).json({ msg: "Log Not Found!" });

    await Logs.findByIdAndRemove(req.params._id);
    res.json({ msg: "Log Deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route    PUT api/logs/:id
// Desc     Update a log
// Access   Private
router.put("/:_id", async (req, res) => {
  const { message, tech, attention, date } = req.body;

  const logFields = {};

  if (message) logFields.message = message;
  if (tech) logFields.tech = tech;
  if (attention) logFields.attention = attention;
  if (date) logFields.date = date;

  try {
    let log = await Logs.findById(req.params._id);

    if (!log) return res.status(404).json({ msg: "Log Not Found" });

    log = await Logs.findByIdAndUpdate(
      req.params._id,
      {
        $set: logFields,
      },
      {
        new: true,
      }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

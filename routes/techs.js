const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const Techs = require("../models/Techs");

// Route    GET api/techs
// Desc     Get all the techs
// Access   Private
router.get("/", async (req, res) => {
  try {
    const techs = await Techs.find();
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route    POST api/techs
// Desc     Add a tech
// Access   Private
router.post(
  "/",
  [
    body("firstName", "First Name can't be empty").not().isEmpty(),
    body("lastName", "Last Name can't be empty").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    const { firstName, lastName } = req.body;

    try {
      const newTech = new Techs({
        firstName,
        lastName,
      });

      const Tech = await newTech.save();

      res.json(Tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route    DELETE api/tech/:id
// Desc     Delete a tech
// Access   Private
router.delete("/:_id", async (req, res) => {
  try {
    let tech = Techs.findById(req.params._id);

    if (!tech) return res.status(404).json({ msg: "Tech not found" });

    await Techs.findByIdAndRemove(req.params._id);
    res.json({ msg: "Tech Deleted! " });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route    PUT api/tech/:id
// Desc     Update a tech
// Access   Private
router.put("/:_id", async (req, res) => {
  const { firstName, lastName } = req.body;

  const techFields = {};
  if (firstName) techFields.firstName = firstName;
  if (lastName) techFields.lastName = lastName;

  try {
    let tech = await Techs.findById(req.params._id);

    if (!tech) return res.status(404).json({ msg: "Tech Not Found" });

    tech = await Techs.findByIdAndUpdate(
      req.params._id,
      { $set: techFields },
      { new: true }
    );

    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

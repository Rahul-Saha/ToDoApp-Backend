const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/task");

router.get("/", (req, res, next) => {
  Task.find()
  .exec()
  .then(docs => {
      console.log(docs);
      if (docs.length >= 0){
        res.status(200).json(docs);
      }
      else {
          res.status(404).json({
              message: "No Entries Found"
          })
        }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
});

router.post("/", (req, res, next) => {
  // const task = {
  //     task_name: req.body.task_name,
  // }
  console.log("Task_Name :", req.body.task_name);
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    task_name: req.body.task_name,
  });
  task
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Handling POST requests to /tasks",
        task: task,
      });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({
            error: err
        });
    });

  
});

router.get("/:taskId", (req, res, next) => {
  const id = req.params.taskId;
  Task.findById(id)
  .exec()
  .then(doc => {
      console.log(doc);
      if(doc) {
        res.status(200).json(doc)
      } 
      else {
        res.status(404).json({message: 'No valid data found'});
      }
    })
  .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

/* router.patch("/:taskId", (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Task.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}); */

/* router.delete("/:taskId", (req, res, next) => {
    const id = req.params.taskId;
    Task.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}); */

module.exports = router;

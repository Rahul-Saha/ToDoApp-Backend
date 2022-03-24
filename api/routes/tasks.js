const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/task");

router.get("/getAllTasks/", (req, res) => {
  try {
    Task.find()
    .sort({display_order: 1})
    .exec()
    .then(docs => {
      // console.log("All Tasks :---");
      // console.log(docs);
      res.status(200).json({
        success: true,
        data: docs
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        data: err
      });
    });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: error
    });
  }
});

router.get("/getSelectedTasks/", (req, res) => {
  try {
    Task.find({ is_selected: true })
    .sort({display_order: 1})
    .exec()
    .then(docs => {
      // console.log(docs);
      res.status(200).json({
        success: true,
        data: docs
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        data: err
      });
    });
  }
  catch {
    console.log(error);
    res.status(500).json({
      success: false,
      data: error
    });
  }
});

router.post("/addNewTask/", async (req, res) => {
  const prevLength = await Task.countDocuments({}).exec();
  // console.log(prevLength);
  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    task_name: req.body.task_name,
    is_selected: false,
    display_order: prevLength + 1
  });
  // console.log(newTask);
  try {
    newTask.save()
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        success: true,
        data: result
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        data: err
      });
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: error
    });
  }
});

router.patch("/updateSelectionStatus/", (req, res) => {
  try {
    Task.updateOne({_id: req.body._id}, { $set: {is_selected:req.body.is_selected}})
    .exec()
    .then(result => {
      // console.l og(result);
      res.status(200).json({
        success: true,
        data: result
      });
    })
    .catch(err => {
      console.error("r error: ",err);
      res.status(500).json({
        success: false,
        data: err
      });
    })
  }
  catch {
    console.log("S error: ", error);
    res.status(500).json({
      success: false,
      data: error
    });
  }
});

router.patch("/updateDisplayOrder/", (req, res) => {
  // console.log(req.body);
  const newList = req.body;
  newList.forEach((element) => {
    // console.log(element.display_order); // 100, 200, 300
    // console.log(index); // 0, 1, 2
    // console.log(array); // same newList object 3 times
    try {
      Task.updateOne({_id: element._id}, { $set: {display_order:element.display_order}})
      .exec()
      .then(result => {
        console.log(result);
        // res.status(200).json({
        //   success: true,
        //   data: result
        // });
      })
      .catch(err => {
        console.error("r error: ",err);
        // res.status(500).json({
        //   success: false,
        //   data: err
        // });
      })
    }
    catch {
      console.log("S error: ", error);
      // res.status(500).json({
      //   success: false,
      //   data: error
      // });
    }
  });
  
});

router.get("/:taskId", (req, res) => {
  const id = req.params.taskId;
  Task.findById(id)
  .exec()
  .then(doc => {
      // console.log(doc);
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

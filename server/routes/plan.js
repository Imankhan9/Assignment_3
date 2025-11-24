let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Plan = require('../model/plan');

// Get route for the read plan list - Read Operation
router.get('/',async(req,res,next)=>{
    try
    {
        const PlanList = await Plan.find()
        //console.log(PlanList)
       res.render('Plans/list', {
        title: 'Itinerary Planner',
        PlanList:PlanList
    })
    }
    catch(err)
    {
        console.error(err);
        res.render('Plans/list', {
            error: 'Error on server'
        })

    }
})

//Get route for displaying the Add page - Create Operation
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Plans/add', {
            title: "Add Plan"
        } )
    }
    catch(err)
    {
        console.error(err);
        res.render('Plans/list', {
            error: 'Error on server'
        })
    }
})

//Post route for processing the Add page - Create Operation
router.post('/add',async(req,res,next)=>{

    try
    {
        let newPlan = new Plan({
            "plan": req.body.plan,
            "date": req.body.date,
            "time": req.body.time,
            "notes": req.body.notes
        });
        Plan.create(newPlan).then(()=>{
            res.redirect('/plans')
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Plans/list', {
            error: 'Error on server'
        })
    }
})

//Get route for displaying the Edit page - Update Operation
router.get('/edit/:id',async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const planToEdit = await Plan.findById(id);
        res.render("Plans/edit",
            {
                title: "Edit Plan",
                Plan: planToEdit
            }
        )
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }

})

//Post route for displaying the Edit page - Update Operation
router.post('/edit/:id',async(req,res,next)=>{
    try
    {
        let id = req.params.id;
        let updatePlan = Plan({
            "_id": id,
            "plan": req.body.plan,
            "date": req.body.date,
            "time": req.body.time,
            "notes": req.body.notes
        })
        Plan.findByIdAndUpdate(id,updatePlan).then(()=>{
            res.redirect("/plans")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})



//Get route for peforming delete operation - Delete Operation
router.get('/delete/:id',async(req,res,next)=>{
    try
    {
        let id = req.params.id;
        Plan.deleteOne({_id:id}).then(()=>{
            res.redirect("/plans")
        })

    }
    catch(err)
    {
        console.log(err);
        next(err);
    }

})

module.exports = router;



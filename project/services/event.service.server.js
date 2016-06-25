module.exports = function(app, models) {

    var fs = require('fs');
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

    var eventModel = models.eventModel;

    // create an event for an organization
    app.post("/api/project/organization/:oid/event", createEvent);
    // Upload a picture to the server
    app.post("/api/project/upload", upload.single('myFile'), uploadImage);
    // update an event
    app.put("/api/project/event/:eid", updateEvent);
    // add a follower to the event
    app.put("/api/project/event/:eid/follower", addFollower);
    // remove the follower from the event
    app.delete("/api/project/event/:eid/follower/:uid", removeFollower);
    // remove an event
    app.delete("/api/project/event/:eid", removeEvent);
    // remove image from event
    app.delete("/api/project/event/:eid/image/:url", deleteImage);
    // find an event by id
    app.get("/api/project/event/:eid", findEventById);
    // find events
    app.get("/api/project/event", findEvents);
    // find all events for an organization
    app.get("/api/project/organization/:oid/event", findEventsForOrganization);




    // create an organization for a user
    function createEvent(req, res) {
        var event = req.body;
        var orgId = req.params.oid;

        if(!event || !event.name) {
            res.status(400).send("Event must have a name");
            return;
        }

        eventModel
            .createEvent(orgId, event)
            .then(
                function(event) {
                    if(event) {
                        res.json(event);
                    }
                },
                function(error) {
                    // think about what error to send
                    res.send(error);
                }
            );

    }

    // update an organization
    function updateEvent(req, res) {
        var eventId = req.params.eid;
        var event = req.body;

        if(!event || !event.name) {
            res.status(400).send("Event must have a name");
            return;
        }

        eventModel
            .updateEvent(eventId, event)
            .then(
                function(event) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.send(error);
                }
            )
    }

    // remove an organization
    function removeEvent(req, res) {
        var eventId = req.params.eid;
        eventModel
            .removeEvent(eventId)
            .then(
                function(response) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.send(error);
                }
            );
    }

    // find an organization by id
    function findEventById(req,res) {
        var eventId = req.params.eid;

        eventModel
            .findEventById(eventId)
            .then(
                function(event) {
                    if(event === null) {
                        res.status(404).send("Event not found");
                    } else {
                        res.json(event);
                    }
                },
                function(error) {
                    res.send(error);
                }
            )
    }

    // find organizations by name
    function findEvents(req,res) {
        var eventName = req.query.eventName;
        if(eventName) {
            // username request
            eventModel
                .findEventsByName(eventName)
                .then(
                    function(events) {
                        res.json({elements: events});
                    }, 
                    function(error) {
                        res.send(error);
                    }
                )
        } else {
            // all events request
            eventModel
                .findAllEvents()
                .then(
                    function(events) {
                        res.json({elements: events});
                    },
                    function(error) {
                        res.send(error);
                    }
                )
        }
    }


    // find all organizations for a poster
    function findEventsForOrganization(req, res) {
        var organizationId = req.params.oid;
        eventModel
            .findEventsForOrganization(organizationId)
            .then(
                function(events) {
                    res.json({elements: events});
                },
                function(error) {
                    res.send(error);
                }
            )
    }

    // adds a follower to the event
    function addFollower(req, res) {
        var eventId = req.params.eid;
        var userId = req.body.userId;

        // check for requirements
        if(!userId || !eventId) {
            res.status(400).send("Cannot follow event");
            return;
        }
        // look for event
        eventModel
            .findEventById(eventId)
            .then(
                function(event) {
                    // check if event was found
                    if(event === null) {
                        res.status(400).send("Event does not exist");
                    } else {
                        var index = -1;
                        // check if user is already in array
                        for(var i = 0; i < event.attendees.length; i++) {
                            if(event.attendees[i] && event.attendees[i].toString() === userId) {
                                index = i;
                                break;
                            }
                        }
                        // user found
                        if (index !== -1) {
                            res.status(400).send("This event was already being attended");
                        } else {
                            // add user to array
                            event.attendees.push(userId);
                            // update user
                            return eventModel.updateEvent(eventId, event)
                        }
                    }
                },
                function(error) {
                    // database error
                    res.send(error);
                }
            )
            .then(
                function(user) {
                    // user succesfully updated
                    res.sendStatus(200);
                },
                function(error) {
                    // database error
                    res.send(error);
                }
            );
    }

    // removes the follower from the event
    function removeFollower(req, res) {
        var eventId = req.params.eid;
        var userId = req.params.uid;

        // check that remove can be fulfilled
        if (!userId || !eventId) {
            res.status(400).send("Cannot unfollow event");
            return;
        }

        // get event in question
        eventModel
            .findEventById(eventId)
            .then(
                function (event) {
                    // check if it exists
                    if (event === null) {
                        res.status(400).send("Event does not exist");
                    } else {
                        var index = -1;
                        // find userId index since indexOf only works with ref
                        for (var i = 0; i < event.attendees.length; i++) {
                            if (event.attendees[i] && event.attendees[i].toString() === userId) {
                                index = i;
                                break;
                            }
                        }
                        // userId not found
                        if (index === -1) {
                            res.status(400).send("This event was not being attended");
                        } else {
                            // remove userId
                            event.attendees.splice(index, 1);
                            return eventModel.updateEvent(eventId, event)
                        }
                    }
                },
                function (error) {
                    // database error
                    res.send(error);
                }
            )
            .then(
                function (user) {
                    // user updated!
                    res.sendStatus(200);
                },
                function (error) {
                    // database error
                    res.send(error);
                }
            );
    }

    function uploadImage(req, res) {
        //fs.unlink for delete?

        var eventId      = req.body.eventId;
        var myFile        = req.file;

        if(myFile == null) {
            res.redirect("/project/index.html#/event/" + eventId + "/edit");
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        eventModel
            .findEventById(eventId)
            .then(
                function(event) {
                    event.images.push(filename);
                    eventModel
                        .updateEvent(eventId, event)
                        .then(
                            function(response) {
                                // reload the page
                                res.redirect("/project/index.html#/event/" + eventId + "/edit");

                            },
                            function(error) {
                                res.send(error);
                            }
                        )
                },
                function(error) {
                    res.send(error);
                }
            );
    }

    /* Delete an image from an event and from the server */
    function deleteImage(req, res) {
        var eventId = req.params.eid;
        var url = req.params.url;

        if(!eventId || !url) {
            res.status(400).send("Image or event does not exist");
        }

        eventModel
            .findEventById(eventId)
            .then(
                function(event) {
                    var index = -1;
                    for(var i = 0; i < event.images.length; i++) {
                        if(event.images[i] === url) {
                            index = url;
                            break;
                        }
                    }
                    if(index === -1) {
                        res.status(400).send("Image does not exist");
                    } else {
                        event.images.splice(index, 1);
                        return eventModel.updateEvent(eventId, event);
                    }
                },
                function(error) {
                    res.send(error);
                }
            )
            .then(
                function(response) {
                    res.sendStatus(200);
                    var fullUrl = "public/project/uploads/" + url;
                    var stats = fs.stat(fullUrl,
                        function(err, stats) {
                            if(err) {
                                console.log(err);
                            } else {
                                fs.unlink(fullUrl, function(err) {
                                    if(err) {
                                        console.log(err);
                                    }
                                })
                            }
                        }
                    );

                    /*
                    if(fullUrl) {

                        fs.unrenameSync(fullUrl, "/project/uploads/apple");
                        res.sendStatus(200);
                    } else {
                        res.status(500).send("Picture not Found");
                    }
                */
                },
                function(error) {
                    res.send(error);
                }
            )

    }

};
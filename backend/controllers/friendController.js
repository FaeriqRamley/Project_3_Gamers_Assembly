//Get friend list
router.get('/api/friendList', async (req, res) => {
    const Friends = await FriendList.find();
    res.json(FriendList);
  });
  
//Get sent requests
router.get('/api/sent', async (req, res) => {
const sent = await Sent.find();
res.json(sent);
});

//Get recieved requests
router.get('/api/recieved', async (req, res) => {
const recieved = await Recieved.find();
res.json(recieved);
});

//create new request
router.post('/api/sentRequest', async (req, res) => {
const request = new Request({
    _id: req.body.id,
    name: req.body.name,
});
await request.save();
res.json({ status: 'ok', msg: 'saved' });
});

//Create new req in reciever 
router.post('/api/recievedRequest', async (req, res) => {
const recieved = new RecievedRequest({
    _id: req.body.id,
    name: req.body.name,
});
await recieved.save();
res.json({ status: 'ok', msg: 'saved' });
});

//delete request
Request.delete({ _id: req.body.id }, function (err) {
if (!err) {
    message.type = 'notification!';
} else {
    message.type = 'error';
}
});

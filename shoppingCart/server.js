var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('shoppingCart',['shoppingCart']);
var bodyParser=require('body-parser');
const PORT=9090;
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.get('/cartList',function(req,res)
		{	
			console.log("This is from db");
			db.shoppingCart.find(function(err,docs)
			{
				console.log(docs);
				res.json(docs);	
			}
				)			
		}

	)
app.post('/cartList',function(req,res)
		{
			console.log(req.body);
			db.shoppingCart.insert(req.body,function(err,docs)
					{
						res.json(docs);
					}

				)
		}

	)
app.delete('/cartList/:id',function(req,res)
		{
			var id=req.params.id;
			console.log("The record Id to be deleted: "+id);
			db.shoppingCart.remove({_id:mongojs.ObjectId(id)},function(err,docs)
					{
						res.json(docs);
					}

				)
		}

	)

app.get('/cartList/:id',function(req,res)
		{
			var id=req.params.id;
			console.log("The id to edit is :"+id);
			db.shoppingCart.findOne({_id:mongojs.ObjectId(id)},function(err,docs)
					{
						res.json(docs);
					}

				)
		}
	)

app.put('/cartList/:id',function(req,res)
		{
			var id=req.params.id;
			console.log("The contact to update is:"+req.body.item);
			db.shoppingCart.findAndModify({query:{_id:mongojs.ObjectId(id)},
				update:{$set:{item:req.body.item,quantity:req.body.quantity,price:req.body.price}},
				new:true},function(err,docs)
					{
						res.json(docs);
					}
				)
		}

	)
app.listen(PORT);
console.log("Server running on port "+PORT);
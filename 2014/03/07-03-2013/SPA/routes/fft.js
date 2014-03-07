
/*
 * GET users listing.
 */

var mongoose = require('mongoose');

//model
var fftSchema = mongoose.Schema({
    name: String
});

var Fft = mongoose.model('Fft', fftSchema);

exports.query = function(req, res){
  Fft.find({}, {}, function(err, entities){
  	if(err) {
  		res.json(500, {error: "Error occured !"});
  	} else {
  		res.json(entities);
  	}
  });
};

exports.get = function(req, res){
  var id = req.params.id;
	Fft.findById(id, function(err, entity){
		if(err) {
			res.json(500, {err:err});
		} else if(!entity) {
			res.json(404);
		} else {
			res.json(entity);
		}
	});
};

exports.put = function(req, res){
	var entity = req.body;
	delete entity._id;
		Fft.update({_id:req.params.id}, entity, function(err, success){
			if(err) {
				res.json(500, {error: err});
			} else {
				res.json({success:success});
			}
		});
};

exports.add = function(req, res){
  var fft = req.body;
	Fft.create(fft, function(err, entity){
		if(err) {
			res.json(500, {err:err});
		} else {
			res.json(entity);
		}
	});
};

exports.delete = function(req, res){
	Fft.remove({_id:req.params.id}, function(err, entity){
		if(err) {
			res.json(500, {error: "error !"});
		} else {
			res.json({success:true});
		}
	});
};
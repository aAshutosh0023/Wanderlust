
const Fuse = require('fuse.js');

module.exports.searchLists=(list,query)=>{
const fuseOptions = {
	keys: [
		"title",
		"location",
    "country",
	"category"
	]
};

const fuse = new Fuse(list, fuseOptions);

const searchPattern = query
let result = fuse.search(searchPattern)
return result;
 }


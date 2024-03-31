
if(process.env.Node_ENV != "production"){
    require('dotenv').config();
  }     //we require it so that we can use envionment that store my sensitive info.
  
  const mapApi = process.env.MAPAPI ;
  
module.exports.mapApi = async (searchQuery) => {
   
  let url = `https://graphhopper.com/api/1/geocode?key=${mapApi}&q=`;
   
   
    try {
        let dataArr = [];
        const fetch = (await import('node-fetch')).default; // Dynamic import
        let map = await fetchData(fetch, url + searchQuery);

        let latitude = map.hits[0].point.lat;
        dataArr.push(latitude);

        let longitude = map.hits[0].point.lng;
        dataArr.push(longitude);
 
         return dataArr;   
       
      
    } catch (err) {
        console.log(err);
    }

   
};

// Function to fetch data from the provided URL
async function fetchData(fetch, url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}

 

 
const axios = require('axios').default;
const imageArray = async () => {
    try {
        const list = await axios.get('https://picsum.photos/v2/list?page=2&limit=50');
        const data = await list.data;
        //console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
module.exports=imageArray;
import http from 'http'
import app from './app.js'

let PORT =4000
let server = http.createServer(app)
server.listen(PORT,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log(`server is running on port ${PORT}`);
    }
})


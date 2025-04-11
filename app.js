const express = require('express');
const app = express();
app.set('view engine','ejs');
app.set('views','views');
const path = require('path');

const storeRouter = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/utils');
const errorsControllers = require('./controllers/errors');

app.use(express.static(path.join(rootDir,'public')));

app.use((req, res, next)=>{
     console.log(req.url,req.method);
     next();
})
 
app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);
app.use(errorsControllers.getError);

const port = 3001;
app.listen(port,()=>{
  console.log(`server is running at http://localhost:${port}`);
});
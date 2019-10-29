require('dotenv');
const Koa = require('koa');
const app = new Koa();

const bodyparser = require('koa-body');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(bodyparser());

const tasks = require('./routes/tasks');
app.use(tasks.routes());

mongoose.connect('mongodb://localhost/koajstasks', { useNewUrlParser: true });

app.listen(port, () => {
  console.log('Server running at port ' + port);
});

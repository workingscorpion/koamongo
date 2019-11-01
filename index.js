require('dotenv');
const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = new Router();

const bodyparser = require('koa-body');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(bodyparser());

const VideoSchema = require('./models/Video');

const model = mongoose.model('Video', VideoSchema);

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useFindAndModify: true
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log('connected to DB');
};

const handleError = err => {
  console.log(`Error on DB Connection : ${err}`);
};

db.once('open', handleOpen);
db.on('error', handleError);

app.use(router.routes());

router.get('/', (ctx, next) => {
  model.create({
    fileUrl: '_url',
    title: 'Happy Video',
    description: 'lalalalal'
  });
  console.log('model created');
  ctx.body = 'model created';
});

router.get('/find', (ctx, next) => {
  ctx.body = `find`;
  model.find({ title: 'Happy Video' }, (err, data) => {
    console.log('data :', data);
    // ctx.body = JSON.stringify(res);
    // return res;
  });
  // ctx.body = JSON.stringify(data);
  // model.findById(1123);
});

router.get('/update', (ctx, next) => {
  ctx.body = `update`;
  model.findOneAndUpdate(
    { title: 'Happy Video' },
    { description: 'changed!' },
    (err, data) => {
      console.log('data :', data);
    }
  );
});

router.get('/delete', (ctx, next) => {
  ctx.body = `delete`;
  model.findOneAndDelete({ description: 'lalalalal' }, (err, data) => {
    console.log('data :', data);
  });
});

app.listen(port, () => {
  console.log('Server running at port ' + port);
});

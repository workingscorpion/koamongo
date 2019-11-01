require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
// const mount = require('koa-mount');
// const serve = require('koa-static');

// app.use(mount('/template', serve('./static')));

// app.use(serve(__dirname + '/templates/'));
// app.use(serve(__dirname + './'));
// const template = require('/templates/template.js');
const template = require('./templates/template');
// console.log('__dirname :', __dirname);

const bodyparser = require('koa-body');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(bodyparser());

const VideoSchema = require('./models/Video');
const FriendSchema = require('./models/Friend');

const video = mongoose.model('Video', VideoSchema);
const friend = mongoose.model('Friend', FriendSchema);

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

const router = new Router();
// app.use(router.routes()).use(router.allowedMethods);
app.use(router.routes());

router.get('/', (ctx, next) => {
  // video.create({
  //   fileUrl: '_url',
  //   title: 'Happy Video',
  //   description: 'lalalalal'
  // });
  // console.log('video created');
  // ctx.body = 'video created';
  // ctx.body = template.input;
  // console.log('template :', template);
  // console.log('template.input :', template.input);
  ctx.body = template.input;
});

router.get('/create', (ctx, next) => {
  const { name } = ctx.request.query;
  friend.create({
    name: `${name}`
  });
  // console.log('friend created');
  // ctx.body = 'friend created';
  ctx.redirect('/find');
});

router.get('/find', (ctx, next) => {
  // ctx.body = `find`;
  // const mongodata = video.find({ title: 'Happy Video' }, (err, data) => {
  //   console.log('data :', data);
  //   // ctx.body = JSON.stringify(res);
  //   // return res;
  //   return data;
  // });
  // return mongodata;
  // ctx.body = JSON.stringify(mongodata);
  // video.findById(1123);
  // friend.find({name:})

  // const mongodata = friend.find({ name: 'test1' }, (err, data) => {
  //   console.log('data :', data);
  // });

  const mongodata = friend.find({}, (err, data) => {
    console.log('data :', data);
  });
});

router.get('/update', (ctx, next) => {
  ctx.body = `update`;
  video.findOneAndUpdate(
    { title: 'Happy Video' },
    { description: 'changed!' },
    (err, data) => {
      console.log('data :', data);
    }
  );
});

router.get('/delete', (ctx, next) => {
  ctx.body = `delete`;
  video.findOneAndDelete({ description: 'lalalalal' }, (err, data) => {
    console.log('data :', data);
  });
});

app.listen(port, () => {
  console.log('Server running at port ' + port);
});

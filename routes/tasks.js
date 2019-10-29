const Router = require('koa-router');

const Task = require('../models/Task');

const router = new Router();

router.get('/api/tasks', async ctx => {
  await Task.find()
    .then(tasks => {
      ctx.body = tasks;
    })
    .catch(err => {
      ctx.body = 'error : ' + err;
    });
});

router.post('/api/task', async ctx => {
  console.log('ctx :', ctx);
  console.log('ctx.request :', ctx.request);
  console.log('ctx.request.body :', ctx.request.body);
  console.log('ctx.request.body.task_name :', ctx.request.body.task_name);
  if (!ctx.request.body.task_name) {
    ctx.body = {
      error: 'Bad Data'
    };
  } else {
    let task = new Task();
    task.task_name = ctx.request.body.task_name;
    await task
      .save()
      .then(data => {
        ctx.body = data;
      })
      .catch(err => {
        ctx.body = err;
      });
  }
});

module.exports = router;

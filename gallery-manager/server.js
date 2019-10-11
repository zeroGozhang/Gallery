/* eslint-disable */
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const favicon = require('serve-favicon');
const serialize = require('serialize-javascript');
const { version, description, name, } = require('./package.json');
const resolve = dir => path.resolve(__dirname, dir);
const port = process.env.PORT || 8080;

const app = express();

const isProd = process.env.NODE_ENV === 'production';
let envWithVersion = {};
const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache ? 100 * 60 * 60 * 24 * 30 : 0,
  });

// app.use(favicon(resolve('public/favicon.ico')));
// app.use('/dist', serve('dist/', true));

app.get('/health', (req, res) => {
  res.setHeader('Context-Type', 'application/json');
  res.json({
    description,
    version,
    status: 'UP',
  });
});

app.use(
  compression({
    threshold: 1024,
  })
);


const devOptions = {
  server: 'http://config-server.dev.jianke.com',
  user: 'root',
  password: 'password',
  profiles: ['dev'],
};


const env ={}
env.JLD_API='http://127.0.0.1:7001'
envWithVersion = { version: `jk/${version}`, ...env, };
process.jkenv = envWithVersion;

const corsOptions = {
  origin: isProd ? ['jianke.com',] : ['jianke.com', 'localhost',],
  methods: ['GET', 'OPTIONS', 'POST',],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/configs', cors(corsOptions), async (req, res) => {
  if (!isProd) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.json(env);
});


/**
 * 读取html文件
 */
function readIndexHtml(template) {
  return new Promise((res, reject) => {
    fs.readFile(template, (err, result) => {
      if (err) {
        // console.log(err);
        // eslint-disable-next-line
        reject({ code: 404 });
        return;
      }
      const i = result.indexOf('</head>');
      const head = result.slice(0, i);
      const tail = result.slice(i + '</head>'.length);
      const envscript = `<script>window.jkenv = ${serialize(env)}</script>`;
      const html = `${head}${envscript}${tail}`;
      res(html);
    });
  });
}

app.use('/', serve('./dist', true));

app.use('*', (req, res) => {
  // res.set('content-type', 'text/html');
  // const index = resolve(`./dist/index.html`);
  // console.log('dsad');
  // console.log(index);
  // readIndexHtml(index).then((template) => {
  //   console.log(template);
  //   res.send(template);
  // })
  //   .catch(() => {
  //     res.send('404');
  //   });
  res.sendFile(resolve('./dist/index.html'));
});

app.listen(port, () => {
  console.log(`listen on: http://localhost:${port}`);
});

process.on('uncaughtException', err => {
  console.error('An uncaught error occurred!');
  console.error(err.stack);
});

process.on('unhandledRejection', err => {
  console.error('An uncaught error occurred!');
  console.error(err.stack);
});

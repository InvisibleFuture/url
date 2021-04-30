import nedb from 'nedb'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'

const url = new nedb({ filename: `url.db`, autoload: true })
const user = new nedb({ filename: `user.db`, autoload: true })
const app = express()

app.use(session({ secret: 'reurl', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } }))
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json())
app.get('/:id', function(req, res) {
  url.findOne({_id:req.params.id}, function(err, doc) {
    res.redirect(301, doc.url)
  })
}).delete('/:id', function(req, res) {
  // 验证身份取得uid
  url.remove({ _id: req.params.id, uid: 1 }, function(err, doc) {
    res.send(JSON.stringify(doc))
  })
}).patch('/:id', function(req, res) {
  // 验证身份取得uid
  url.update({ _id: req.params.id, uid: 1 }, function(err, doc) {
    res.send(JSON.stringify(doc))
  })
}).post('/list', function(req, res){
  // 验证身份取得uid
  url.insert({url:'', uid:1}, function(err, doc) {
    res.send(JSON.stringify(doc))
  })
}).get('/list', function(req, res) {
  // 验证身份取得uid
  url.find({uid:1}, function(err, docs){
    res.send(JSON.stringify(docs))
  })
}).post('/user', function(req, res) {
  // 创建新用户, 记录创建时间和最后活跃时间, 超时删除
  user.insert({account:'', password:'', name:'', email:''}, function(err, doc) {
    res.send(JSON.stringify(doc))
  })
}).get('/user', function(req, res) {
  // 读取全部用户
}).get('/user/:id', function(req, res) {
  // 读取指定用户
})
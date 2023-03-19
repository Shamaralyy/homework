const express = require('express')
const Student = require('./Student.js')

const router = express.Router()

router.get('/', (req, res) => {
    // 获取学生信息列表
    Student.read((err, array) => {
        if (err) {
            res
                .sendStatus(500)
                .send('SERVE ERROR')
        }
        else {
            // console.log(array)
            res.render('index.html', { array })
        }
    })
})

// 渲染学生添加页面
router.get('/students/create', (req, res) => {
    res.render('studentCreate.html')
})

// 添加学生信息
router.post('/students/create', (req, res) => {
    // 添加保存学生信息
    Student.save(req.body, (err) => {
        if (err) {
            res
                .sendStatus(500)
                .send('SERVE ERROR')
        }
        else {
            res.redirect('/')
        }
    })
})

// 渲染编辑学生页面
router.get('/students/edit', (req, res) => {
    // 根据学生id进行查找
    Student.editById(parseInt(req.query.id), (err, student) => {
        if (err) {
            res
                .sendStatus(500)
                .send('SERVE ERROR')
        }
        else {
            res.render('studentEdit.html', {
                student
            })
        }
    })
})

// 提交编辑学生页面
router.post('/students/edit', (req, res) => {
    // console.log(req.body)
    Student.updateById(req.body, (err) => {
        if (err) {
            res
                .sendStatus(500)
                .send('SERVE ERROR')
        }
        else {
            res.redirect('/')
        }
    })
})

// 删除学生信息
router.get('/students/delete', (req, res) => {
    Student.deleteById(req.query.id, (err) => {
        if (err) {
            res.sendStatus(500).send('SERVER ERROR')
        }
        else {
            res.redirect('/')
        }
    })
})

module.exports = router 

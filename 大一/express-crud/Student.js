const fs = require('fs')
const path = './database/db.json'

//查询所有学生信息
exports.read = (callback) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        else {
            return callback(null, JSON.parse(data).students)
        }
    })
}

// 保存学生信息
exports.save = (stuObj, callback) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        else {
            let students = JSON.parse(data).students
            stuObj.id = parseInt(students[students.length - 1].id) + 1
            stuObj.sex = parseInt(stuObj.sex)
            students.push(stuObj)
            newData = {
                students: students
            }
            fs.writeFile(path, JSON.stringify(newData), (err) => {
                if (err) {
                    return callback(err)
                }
                else {
                    return callback(null)
                }
            })
        }
    })
}

// 更改学生信息
exports.updateById = (stuObj, callback) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        else {
            let students = JSON.parse(data).students
            let newStuObj = students.find((item) => {
                return item.id == stuObj.id
            })
            for (let i in stuObj) {
                newStuObj[i] = stuObj[i]
            }
            students = {
                "students": students
            }
            fs.writeFile(path, JSON.stringify(students), (err) => {
                if (err) {
                    return callback(err)
                }
                else {
                    return callback(null)
                }
            })
        }
    })
}

// 编辑学生信息界面
exports.editById = (id, callback) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        else {
            let students = JSON.parse(data).students
            let result = students.find((i) => i.id == id)
            callback(null, result)
        }
    })
}

// 删除学生信息
exports.deleteById = (id, callback) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        else {
            let students = JSON.parse(data).students
            let index = students.findIndex((item) => {
                return item.id == id
            })
            students.splice(index, 1)
            students = {
                students
            }
            fs.writeFile(path, JSON.stringify(students), (err) => {
                callback(err)
            })
        }
    })
}

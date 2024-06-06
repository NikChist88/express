import express from 'express'
import { db } from './data/data'

const app = express()
const port = 3003

// Конфигурация для parse application/json
app.use(express.json())

// Фильтрация курсов по имени
app.get(`/courses`, (req, res) => {
  const filteredCourses = db.courses.filter(
    (c) => c.title.indexOf(req.query.title as string) > -1
  )

  if (!req.query.title) {
    res.json(db.courses)
  } else res.json(filteredCourses)
})

// Получение курса по id
app.get('/courses/:id', (req, res) => {
  const foundedCourses = db.courses.find((c) => c.id === +req.params.id)
  if (!foundedCourses) return res.sendStatus(404)
  res.json(foundedCourses)
})

// Добавление курса
app.post('/courses', (req, res) => {
  if (!req.body.title.trim()) {
    res.status(400).json({ message: 'Title is required!' })
    return
  }

  const newCourse = {
    id: +new Date(),
    title: req.body.title,
  }

  db.courses.push(newCourse)
  res.status(201).json({ message: 'Created!' })
})

// Удаление курса
app.delete('/courses/:id', (req, res) => {
  const course = db.courses.find((c) => c.id === +req.params.id)

  if (!course) {
    res.status(404).json({ message: 'No such course!' })
  } else {
    db.courses = db.courses.filter((c) => c.id !== +req.params.id)
    res.status(200).json({ message: 'Deleted!' })
  }
})

// Обновление курса
app.put('/courses/:id', (req, res) => {
  const foundedCourses = db.courses.find((c) => c.id === +req.params.id)

  if (!foundedCourses) {
    res.sendStatus(404)
  } else if (!req.body.title.trim()) {
    res.status(400).json({ message: 'Title is required!' })
  } else {
    foundedCourses.title = req.body.title
    res.status(200).json({ message: 'Updated!' })
  }
})

// Прослушивание порта
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

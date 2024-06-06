type Courses = {
  id: number
  title: string
}

type DataBase = {
  courses: Courses[]
}

export const db: DataBase = {
  courses: [
    { id: 1, title: 'html' },
    { id: 2, title: 'css' },
    { id: 3, title: 'java-script' },
    { id: 4, title: 'react' },
    { id: 5, title: 'redux' },
    { id: 6, title: 'front-end' },
    { id: 7, title: 'back-end' },
  ],
}

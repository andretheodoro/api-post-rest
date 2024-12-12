import { Router } from 'express'
import {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    deleteAllNote,
} from '../../controllers/notes/notesController'

const notesRouter = Router()

// Rota para criar uma nova nota
notesRouter.post('/notes', createNote)

// Rota para listar todas as notas de um post específico
notesRouter.get('/posts/:postId/notes', getNotes)

// Rota para atualizar uma nota existente
notesRouter.put('/notes/:noteId', updateNote)

// Rota para excluir uma nota
notesRouter.delete('/notes/:noteId', deleteNote)

notesRouter.delete('/notes', deleteAllNote)

export default notesRouter

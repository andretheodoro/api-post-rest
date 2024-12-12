import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
const prisma = new PrismaClient()

export const createNote = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { postId, text, start, end } = req.body

    try {
        // Criando o comentário
        const notes = await prisma.notes.create({
            data: {
                text: text,
                postId: postId,
                start: start,
                end: end,
            },
        })

        res.json(notes)
    } catch (error) {
        console.log('Error create note', error)
        res.status(500).json({ error: 'Erro ao criar o comentário.' })
    }
}

export const getNotes = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params

    try {
        // Buscando todas as notas associadas ao post
        const notes = await prisma.notes.findMany({
            where: {
                postId: parseInt(postId),
            },
            orderBy: [
                {
                    start: 'asc', // Ordena primeiro pelo campo start
                },
                {
                    end: 'asc', // Ordena em seguida pelo campo end
                },
            ],
        })

        res.status(200).json(notes)
    } catch (error) {
        console.log('Error get notes', error)
        res.status(500).json({ error: 'Erro ao buscar as notas.' })
    }
}

export const updateNote = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { noteId } = req.params
    const { text } = req.body

    try {
        // Atualizando a nota
        const updatedNote = await prisma.notes.update({
            where: {
                id: parseInt(noteId),
            },
            data: {
                text: text, // Atualizando o texto da nota
            },
        })

        res.status(200).json(updatedNote)
    } catch (error) {
        console.log('Error update note', error)
        res.status(500).json({ error: 'Erro ao atualizar a nota.' })
    }
}

export const deleteNote = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { noteId } = req.params
    try {
        // Deletando a nota
        const deletedNote = await prisma.notes.delete({
            where: {
                id: parseInt(noteId),
            },
        })

        res.status(200).json(deletedNote)
    } catch (error) {
        console.log('Error delete note', error)
        res.status(500).json({ error: 'Erro ao deletar a nota.' })
    }
}

export const deleteAllNote = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        // Deletando a nota
        const deletedNote = await prisma.notes.deleteMany()

        res.status(200).json(deletedNote)
    } catch (error) {
        console.log('Error delete note', error)
        res.status(500).json({ error: 'Erro ao deletar a nota.' })
    }
}

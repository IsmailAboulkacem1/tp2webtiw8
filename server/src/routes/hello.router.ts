import { Router, Request, Response } from 'express'

const router = Router()

// simple GET /hello/ → renvoie un JSON
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from your API!' })
})

export default router

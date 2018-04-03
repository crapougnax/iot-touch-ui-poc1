import { Router } from 'express'

const router = new Router()

router.get('/view', viewCartridges)

export default router

function viewCartridges(req, res) {
  res.render('cartridges/view')
}

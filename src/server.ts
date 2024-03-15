import { App } from '@/app';
import { Router } from 'express';

const router: Router = Router();
router.get('/', (req, res) => {
  res.send('Welcome to api!');
});

const app = new App([router]);

app.listen();

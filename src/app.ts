import express, { NextFunction, Request, Response } from 'express';
import rimRouter from './routes/rimmind';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.get('/',(req:Request,res:Response)=>{
    res.send('Im alive')
})
app.use('/rim',rimRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Wrong URL');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app
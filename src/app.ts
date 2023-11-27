import express, { NextFunction, Request, Response } from 'express';
import rimRouter from './routes/rimmind';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const html =`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Browser</title>
    <style>
*{
    margin:0
}
    </style>
</head>

<body>
    <div style="justify-content: center;align-items: center;overflow: hidden;display: flex;height: 100vh;background-repeat: no-repeat;background-size: cover;background-image: url(https://imgs.search.brave.com/3dkxvozs0pwzuXt5YB-iCf64yvby86ij9msaS2aM6Jk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NTM1NjM3NzctZTdm/MzE5YWY2YjQ3P2l4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRSOGZI/TmxZV3g4Wlc1OE1I/eDhNSHg4ZkRBPSZ3/PTEwMDAmcT04MA);">
        <div style="background-color: rgba(255, 255, 255, 0.685);text-align: center;border-radius: 25px;padding: 20px;font-size: 20px;font-weight: bolder;">
            <h1>
                I love you.
            </h1>
            <p>
                By u know who, love.
                be happy, dont get tensed i will try my best!
            </p>
            <img src="https://imgs.search.brave.com/3dkxvozs0pwzuXt5YB-iCf64yvby86ij9msaS2aM6Jk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NTM1NjM3NzctZTdm/MzE5YWY2YjQ3P2l4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRSOGZI/TmxZV3g4Wlc1OE1I/eDhNSHg4ZkRBPSZ3/PTEwMDAmcT04MA"
            height="100px">
        </div>
    </div>

   
</body>

</html>
`
app.get('/',(req:Request,res:Response)=>{
    res.send('html')
    
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
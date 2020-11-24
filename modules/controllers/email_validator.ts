import express from 'express';
import {EmailValidatorService} from '../service/emailValidatorService';

const app = express();
app.use(express.json());

app.post('/check', async (req, res) => {
  if (req.query && req.query.email) {
    const service = new EmailValidatorService();
    const result = await service.validate(req.query.email as string);
    console.log(result);
    res.send(result);
    return;
  }
  res.status(500);
});

app.get('/check', async (req, res) => {
  if (req.query && req.query.email) {
    const service = new EmailValidatorService();
    const result = await service.validate(req.query.email as string);
    console.log(result);
    res.send(result);
    return;
  }
  res.status(500);
});

export default app;

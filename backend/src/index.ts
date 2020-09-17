import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (_, res) => res.send({ msg: 'Hello world' }));

app.listen(3333);

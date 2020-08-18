import express from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import uuid from 'uuid';
import cyberwareBodyParts from '../src/model/parts'

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/parts', (req, res) => {
  res.status(200).json(cyberwareBodyParts);
})

app.post('/parts', (req, res) => {
  const { name } = req.body;
  if (name) {
    const insertBodyPart = {
      id: uuid(),
      createdAt: Date.now(),
      name,
    }
    cyberwareBodyParts.push(insertBodyPart);
    res.status(200).json(insertBodyPart);
  } else {
    res.status(400).json({ message: 'sorry request denied, you need a part!' });
  }
});

app.post('/parts/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const matchPart = cyberwareBodyParts.find(part => part.id === id);
  const updatedPart = {
    ...matchPart,
    name: name,
  }
  if (updatedPart) {
    cyberwareBodyParts = cyberwareBodyParts.map((part) =>
      part.id === id ? updatedPart : part
    );
      res.status(200).json(updatedPart);
  } else {
    res.status(400).json({ message: 'there are no parts to update, check id '})
  }
});

app.delete('/parts/:id', (req, res) => {
  const { id } = req.params;
  const removedPart = cyberwareBodyParts.find(part => part.id === id);
  cyberwareBodyParts = cyberwareBodyParts.filter(part => part.id !== id);
  res.status(200).json(removedPart);
});

app.listen(port, () => console.log(`Server listening on ${port}`))
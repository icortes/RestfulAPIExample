const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const dataFilePath = 'data.json';

// Helper function to read data from the file
const readData = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write data to the file
const writeData = async (data) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// GET route to retrieve all messages
app.get('api/messages', async (req, res) => {
  const data = await readData();
  res.json(data);
});

// GET route to retrieve a single message by ID
app.get('api/messages/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readData();
  const message = data.find((item) => item.id == id);

  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  res.json(message);
});

// POST route to add a new message
app.post('api/messages', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const data = await readData();
  const id = data.length + 1;
  const newMessage = { id, name, message };

  data.push(newMessage);
  await writeData(data);

  res.status(201).json(newMessage);
});

// PUT route to update a message by ID
app.put('api/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;

  const data = await readData();
  const index = data.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  data[index] = { id, name, message };
  await writeData(data);

  res.json(data[index]);
});

// DELETE route to delete a message by ID
app.delete('api/messages/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readData();
  const index = data.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  const deletedMessage = data.splice(index, 1)[0];
  await writeData(data);

  res.json(deletedMessage);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const fs = require('fs');

const app = express();
const port = 1000;

app.use(express.urlencoded({ extended: true }));

// Send Message Form
app.get('/', (req, res) => {
  
    fs.readFile('msg.txt',(err,data) => {
        if(err){
            console.log.apply(err);
            data = 'No Chat Exists'
        }

       res.send(`
         ${data}
        <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
      <input type="text" id="message" name="message" placeholder="Enter your message">
      <input type="hidden" id="username" name="username">

      <button type="submit">Send</button>
    </form>
  `);
    })

  
});

// Store Message
app.post('/', (req, res) => {
  const message = req.body.message;
  const username = req.body.username;

  fs.appendFile('msg.txt', `${username}:${message}\n`, (err) => {
    if (err) {
      console.error('Error writing to the messages file:', err);
     
    }

    res.redirect('/');
  });
});

// Login Form
app.get('/login', (req, res) => {
  res.send(`
    <form action="/" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
      <input type="text" name="username" id="username" placeholder="Enter your username">
      <button type="submit">Login</button>
    </form>
  `);
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

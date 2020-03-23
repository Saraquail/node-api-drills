/* eslint-disable semi */
'use strict';
const express = require('express')
const morgan = require('morgan')

const app = express();

//This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'))

//This is the final request handler
app.get('/', (req, res) =>{
  res.send('Hello Express!')
})

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});


app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    `
  res.send(responseText)
})

app.get('/queryViewer', (req, res) => {
  res.end()
})

app.get('/greetings', (req, res) => {
  const name = req.query.name
  const race = req.query.race

  if(!name) {
    return res.status(400).send('Please provide a name')
  }
  if(!race) {
    return res.status(400).send('Please provide a race')
  }

  const greeting = (`Greetings ${name} the ${race}`)

  res.send(greeting)
})

app.get('/sum', (req, res) => {
  const a = parseFloat(req.query.a)
  const b = parseFloat(req.query.b)
  const sum = a + b
  const sumstr = sum.toString()
  res.send(sumstr)
})

app.get('/lotto', (req, res) => {
  const numbers = req.query.arr

  numbers.forEach(num => {
    if(num < 1 || num > 20){
      res.send('Please enter a number 1-20')
    }
  })

  const lottoNums= []
  for(let i = 0; i < 6; i++){
    let num = Math.floor(Math.random() * (1 - 20 + 1))
    lottoNums.push(num)}

  const fulltick = lottoNums.join('')
  if (fulltick.replace(/-/g, '') === numbers.join('')){
    res.send('Wow! Unbelievable! You could have won the mega millions!')
  }
  const nums = []
  let response =''
  for(let i = 0; i < lottoNums.length; i++){
    nums.push(parseInt(numbers[i]))
  }
  const match = lottoNums.filter(element => nums.includes(element))

  if(match.length === 4){
    response = 'Congratulations, you win a free ticket'
  }
  else if(match.length === 5){
    response = 'Congratulations! You win $100!'
  }
  else if(match.length === 6){
    response = 'Wow! Unbelievable! You could have won the mega millions!'
  }
  else{
    response = 'Sorry, you lose'
  }

  res.send(response.toString())
})





app.get('/burgers', (req, res) => {
  res.send('We have juicy bean burgers')
})

app.get('/cipher', (req, res) => {
  const text = req.query.text //word to be encrypted
  const shift = parseInt(req.query.shift) //how many to shift by
  const chars = text.split('')

  const charcode = []
  
  chars.forEach(letter => {
    charcode.push(letter.charCodeAt(0))
  });

  const crypt = []
  charcode.forEach(code => {
    crypt.push(code+shift)
  })

  const encodedchars = []
  crypt.forEach(num => {
    encodedchars.push(String.fromCharCode(num))
  })

  const encoded = encodedchars.join('')
  //String.fromCharCode(65) //A
  //'A'.charCodeAt(0) // 65
  
  res.send(encoded.toString())
})



app.listen(8000, () => {
  console.log('Express server is listening on port 8000!')
})


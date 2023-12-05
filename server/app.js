const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Connect db
require('./db/connection');

// Import files
const Users = require('./models/Users');
const Conversations = require('./models/Conversations');
const Messages = require('./models/Messages');

// App use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8000;

// routes
app.get('/', (req, res) => {
  res.send('Welcome');
});

app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).send('Please fill all required fields');
    }else{
      const isAlreadyExist = await Users.findOne({ email });
  
      if (isAlreadyExist) {
        return res.status(400).send('User already exists');
      }else{
        const newUser = new Users({ fullName, email });
  
        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            throw err; // Handle the error, log it, or send an appropriate response
          }
    
          newUser.set('password', hashedPassword);
          newUser.save();
    
          return res.status(200).send('User registered successfully');
        });
      }
      
    }

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/login', async (req, res, next) => {
  try{
    const { email, password } = req.body;

    if(!email || !password){
      res.status(400).send('Please fill all the required fields');
    }else {
      const user = await Users.findOne({ email });
      if(!user){
        res.status(400).send('User email or password is incorrect');
      }
      else {
        const validateUser = await bcryptjs.compare(password,user.password);
        if(!validateUser){
          res.status(400).send('User email or password is incorrect');
        }else{
          const payload = {
            userId: user._id,
            email: user.email
          }
          const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "THIS_IS_A JST_SECRET_KEY";

            jwt.sign(payload, JWT_SECRET_KEY,{expiresIn: 84600}, async (err, token) => {
              await Users.updateOne({_id: user._id},{
                $set: { token }
              })
              user.save();
              return res.status(200).json({ user: { id:user._id, email: user.email, fullName: user.fullName}, token: token })
            })
            console.log(user.token, 'token')
        }
      }
    }
  }catch(error){
    console.log (error, 'Error')
  }
})

app.post('/api/conversation', async (req, res) =>{
  try{
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversations({ members: [senderId, receiverId]});
    await newConversation.save();
    res.status(200).send('Conversation created successfully');
  }catch(error){
   console.log(error, 'Error')
  }
})

app.get('/api/conversations/:userId', async (req, res) => {
  try{
    const userId = req.params.userId;
    const conversations = await Conversations.find({ members: { $in: [userId]}});
    const conversationUserData = Promise.all(conversations.map(async (conversation) => {
      const receiverId = conversation.members.find((member) => member !== userId);
      const user = await Users.findById(receiverId);
      return { user: { receiverId: user._id,email: user.email, fullName: user.fullName}, conversationId: conversation._id }
    }))
    res.status(200).json(await conversationUserData);
  } catch (error) {
    console.log(error, 'Error')
  }
})

app.post('/api/message', async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = '' } = req.body;

    if (!senderId || !message) {
      return res.status(400).send('Please fill all required fields');
    }

    if (!conversationId && receiverId) {
      const newConversation = new Conversations({ members: [senderId, receiverId] });
      await newConversation.save();
      const newMessage = new Messages({ conversationId: newConversation._id, senderId, message });
      await newMessage.save();
      return res.status(200).send('Message sent successfully');
    } else {
      const newMessage = new Messages({ conversationId, senderId, message });
      await newMessage.save();
      return res.status(200).send('Message sent successfully');
    }
  } catch (error) {
    console.log(error, 'Error');
    res.status(500).send('Internal Server Error'); // Handle the error appropriately
  }
});




app.get('/api/message/:conversationId', async (req, res) => {
  try{
    const conversationId = req.params.conversationId;
    if(conversationId === 'new') return res.status(200).json([])
    const messages = await Messages.find({ conversationId });
  const messageUserData = Promise.all(messages.map(async (message) => {
      const user = await Users.findById(message.senderId);
      return {user: { id: user._id, email: user.email, fullName: user.fullName}, message: message.message}
    }));
    res.status(200).json(await messageUserData);
  }
  catch(error){
    console.log('Error', error)
  }
})

app.get('/api/users', async(req,res) => {
  try{
    const users = await Users.find();
    const usersData = Promise.all(users.map(async (user) => {
      return {user: { email: user.email, fullName: user.fullName}, userId: user._id}
    }))
    res.status(200).json(await usersData)
  }catch(error) {
    console.log('Error', error)
  }
})



app.listen(port, () => {
  console.log('listening on port ' + port);
});

// app.get('/api/conversations/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const conversations = await Conversation.find({ members: userId });
//     const uniqueConversations = conversations.reduce((acc, conversation) => {
//       const receiverId = conversation.members.find((member) => member !== userId);
//       const user = Users.findById(receiverId);

//       // Check if this conversation already exists in the result array
//       const existingConversation = acc.find((item) => item.conversationId.equals(conversation._id));

//       if (!existingConversation) {
//         acc.push({
//           user: { email: user.email, fullName: user.fullName },
//           conversationId: conversation._id,
//         });
//       }

//       return acc;
//     }, []);

//     res.status(200).json(uniqueConversations);
//   } catch (error) {
//     console.log(error, 'Error');
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/api/message', async (req, res) => {
//   try {
//     const { conversationId, senderId, message, receiverId = '' } = req.body;

//     if (!senderId || !message) {
//       return res.status(400).send('Please fill all required fields');
//     }

//     let newConversationId;

//     if (!conversationId && receiverId) {
//       // If there is no conversationId but there is a receiverId, create a new conversation
//       const newConversation = new Conversation({ members: [senderId, receiverId] });
//       await newConversation.save();
//       newConversationId = newConversation._id;

//       // Create a new message in the newly created conversation
//       const newMessage = new Messages({ conversationId: newConversationId, senderId, message });
//       await newMessage.save();
//     } else {
//       // If conversationId is provided, use it to send the message
//       newConversationId = conversationId;

//       // Create a new message in the existing conversation
//       const newMessage = new Messages({ conversationId: newConversationId, senderId, message });
//       await newMessage.save();
//     }

//     return res.status(200).send('Message sent successfully');
//   } catch (error) {
//     console.log(error, 'Error');
//     return res.status(500).send('Internal Server Error');
//   }
// });
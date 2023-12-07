import React, { useEffect } from 'react';
import { useState } from 'react'; // Import useState separately if needed
import Avatar from '../../assets/avatar.svg';
import Img1 from '../../assets/Img1.png';
import Img2 from '../../assets/Img2.png';
import Img3 from '../../assets/Img3.jpg';
import Img4 from '../../assets/Img4.jpg';
import Img5 from '../../assets/Img5.jpg';
import Img6 from '../../assets/Img6.jpg';


import Input from '../../components/input/Input';



const Dashboard = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState({})
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState({})

  console.log('user :>>', user);
  console.log('conversations :>>', conversations);
  console.log('users :>>', users);

   useEffect(() =>{
    const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
    const fetchConversations = async() => {
      const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          
        },
        
      });
      
      const resdata = await res.json()
      console.log('Conversations:', resdata); // Log conversations to check if they are correct
      setConversations(resdata);
    }
    fetchConversations();
   }, [])

   useEffect(() =>{
    const fetchUsers = async() => {
      const res = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const resData = await res.json()
      setUsers(resData)
    }
    fetchUsers()
   }, [])

  const fetchMessaages = async(conversationId, user) => {
    const res = await fetch(`http://localhost:8000/api/message/${conversationId}`, {
      method: 'GET',
      ... (conversationId === 'new' && {
        body: JSON.stringify({ senderId: user?.id, receiverId: messages?.receiverId})
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    const resdata = await res.json()
    console.log('resdata :>> ', resdata);
    setMessages({messages: resdata , receiver: user, conversationId})
  }

  const sendMessage = async (e) => {
    try {
      console.log('Sending message...');
      
      const res = await fetch(`http://localhost:8000/api/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: messages?.conversationId,
          senderId: user?.id,
          message,
          receiverId: messages?.receiver?.receiverId,
        }),
      });
  
      // const resdata = await res.text();
      // const resdata = await res.json();
      // console.log('Raw response:', resdata);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='w-screen flex'>
      <div className='w-[25%]  h-screen bg-gray-100'>
        <div className='flex  items-center my-8 mx-20'>
          <div className='border border-blue-500 p-[5px] rounded-full'>
            <img src={Avatar} width={50} height={50} className=' rounded-full' />
          </div>
          <div className='ml-8'>
            <h3 className='text-2xl'>{user?.fullName}</h3>
            <p className='text-lg font-light'>My Account</p>
          </div>
        </div>
        <hr></hr>
        <div className='mt-10'>
          <div className='text-blue-500 text-lg px-20'>Messages</div>
          <div>
            {
              conversations.length > 0 ?
                conversations.map(({ conversationId, user }) => {
                  return(
                    <div className='flex items-center py-8 border-b border-b-gray-300 px-20'>
                    <div className='cursor-pointer flex items-center' onClick={() => fetchMessaages(conversationId, user)}>
                      <div><img src={Img1} width={60} height={60} className=' rounded-full' /></div>
                      <div className='ml-6'>
                        <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
                        <p className='text-sm font-light text-gray-600'>{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  )
              }) : <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>
            }
          </div>
        </div>
      </div>
      <div className='w-[50%]  h-screen bg-white flex flex-col items-center'>
        {
        messages?.receiver?.fullName &&
        <div className='w-[75%] bg-gray-100 h-[80px] my-14 rounded-full flex items-center px-14 gap-5 mb-2 shadow-lg py-2'>
          <div><img src={Img1} width={60} height={60} className='rounded-full' /></div>
          <div className='ml-6 mr-auto'>
            <h3 className='text-lg'>{messages?.receiver?.fullName}</h3>
            <p className='text-sm font-light text-gray-600'>{messages?.receiver?.email}</p>
          </div>
          <div className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              <path d="M15 9l5 -5" />
              <path d="M16 4l4 0l0 4" />
            </svg>
          </div>
        </div>
        }
        <div className='h-[75%] w-full overflow-y-auto shadow-sm'>
          <div className='h-[1000px] p-14'>
            {
              messages.messages?.length > 0 ?
              messages.messages.map(({ message, user: { id } = {} }) =>{
                  return (
                    <div className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${id === user?.id ? ' bg-blue-600 text-white rounded-tl-xl ml-auto': 'bg-gray-100 rounded-tr-xl text-black'} `}>
                          {message}
                        </div>
                  )
              }) : <div className='text-center text-lg font-semibold mt-24'>No Messages or no Conversation Selected</div>
            }
          </div>
        </div>
        {
          messages?.receiver?.fullName &&
          <div className='p-14 w-full flex items-center justify-center'>
          <Input placeholder="Type message" value={message} onChange={(e) => setMessage(e.target.value)} inputClassName='p-4 border-0 shadow-md bg-gray-100 focus:ring-0 focus:border-0 outline-none rounded-full'/>
          <div className={`ml-4 p-2 cursor-pointer bg-gray-50 rounded-full mt-5 ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
          </div>
          <div className={`ml-4 p-2 cursor-pointer bg-gray-50 rounded-full mt-5 ${!message && 'pointer-events-none'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
          </div>
        </div>
        }
      </div>
     
      <div className='w-[25%]  h-screen bg-gray-50 px-8 py-16'>
        <div className='text-blue-500 text-lg'>People</div>
        <div>
            {
              users.length > 0 ?
                users.map(({ usersId, user }) => {
                  return(
                    <div className='flex items-center py-8 border-b border-b-gray-300 px-20'>
                    <div className='cursor-pointer flex items-center' onClick={() => fetchMessaages('new', user)}>
                      <div><img src={Img1} width={60} height={60} className=' rounded-full' /></div>
                      <div className='ml-6'>
                        <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
                        <p className='text-sm font-light text-gray-600'>{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  )
              }) : <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>
            }
          </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import Avatar from '../../assets/avatar.svg';
import Input from '../../components/input/Input';

const Dashboard = () => {
  const contacts = [
    {
      name: 'John',
      status: 'Available',
      img: Avatar
    },
    {
      name: 'Doe',
      status: 'Available',
      img: Avatar
    },
    {
      name: 'Alexander',
      status: 'Available',
      img: Avatar
    },
    {
      name: 'Adam',
      status: 'Available',
      img: Avatar
    },
    {
      name: 'Tush',
      status: 'Available',
      img: Avatar
    },
    {
      name: 'Grames',
      status: 'Available',
      img: Avatar
    },
  ];

  return (
    <div className='w-screen flex'>
      <div className='w-[25%]  h-screen bg-gray-100'>
        <div className='flex  items-center my-8 mx-20'>
          <div className='border border-blue-500 p-[5px] rounded-full'>
            <img src={Avatar} width={50} height={50} className=' rounded-full' />
          </div>
          <div className='ml-8'>
            <h3 className='text-2xl'>Tutorials Dev</h3>
            <p className='text-lg font-light'>My Account</p>
          </div>
        </div>
        <hr></hr>
        <div className='mt-10'>
          <div className='text-blue-500 text-lg px-20'>Messages</div>
          <div>
            {contacts.map(({ name, status, img }) => (
              <div className='cursor-pointer flex items-center' key={name}>
                <div className='flex items-center py-8 border-b border-b-gray-300 px-20'>
                  <div><img src={img} width={50} height={50} className=' rounded-full' /></div>
                  <div className='ml-6'>
                    <h3 className='text-lg font-semibold'>{name}</h3>
                    <p className='text-sm font-light text-gray-600'>{status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-[50%]  h-screen bg-white flex flex-col items-center'>
        <div className='w-[75%] bg-gray-100 h-[80px] my-14 rounded-full flex items-center px-14 gap-5 mb-2 shadow-lg'>
          <div><img src={Avatar} width={50} height={50} className='rounded-full' /></div>
          <div className='ml-6 mr-auto'>
            <h3 className='text-lg'>Alexander</h3>
            <p className='text-sm font-light text-gray-600'>online</p>
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
        <div className='h-[75%] w-full overflow-y-auto shadow-sm'>
          <div className='h-[1000px] p-14'>
            <div className='max-w-[40%] bg-gray-100 rounded-bg-lg rounded-tr-xl p-4 mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className='max-w-[40%] bg-blue-600 rounded-bg-lg rounded-tl-xl ml-auto text-white p-4 mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className='max-w-[40%] bg-gray-100 rounded-bg-lg rounded-tr-xl p-4 mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className='max-w-[40%] bg-blue-600 rounded-bg-lg rounded-tl-xl ml-auto text-white p-4 mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className='max-w-[40%] bg-gray-100 rounded-bg-lg rounded-tr-xl p-4 mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className='max-w-[40%] bg-blue-600 rounded-bg-lg rounded-tl-xl ml-auto text-white p-4 mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
        <div className='p-14 w-full flex items-center justify-center'>
        <Input placeholder="Type message" inputClassName='p-4 border-0 shadow-md bg-gray-100 focus:ring-0 focus:border-0 outline-none rounded-full'/>
        <div className='ml-4 p-2 cursor-pointer bg-gray-50 rounded-full mt-5'>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 14l11 -11" />
          <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
        </svg>
        </div>
        <div className='ml-4 p-2 cursor-pointer bg-gray-50 rounded-full mt-5'>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
        </div>
      </div>
      </div>
     
      <div className='w-[25%]  h-screen'></div>
    </div>
  );
};

export default Dashboard;

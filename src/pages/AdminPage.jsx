import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import empty from '/empty.png';
import Navbar from '../components/Main/Navbar'

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
      return;
    }

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setMessages(messages.filter(msg => msg._id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center pb-6">
      <nav className="w-full px-7 sm:px-15 py-4 flex items-center justify-between text-white fixed bg-black bg-opacity-80 backdrop-blur-md z-50">
        <div className="text-2xl font-bold">
          MyPortfolio
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <p className='text-[11px] sm:text-sm md:text-[13px]'>Admin's Edition</p>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 cursor-pointer rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
      
      <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 mt-26">
        <h3 className='text-sm sm:text-base md:text-md font-bold border-blue-900 border-b-2 pb-1 mb-7 w-fit mx-auto text-center'>
          Contact <span className='text-gray-600/75 text-xs sm:text-sm md:text-xs ml-1'>(Messages Received)</span>
        </h3>
        
        {loading ? (
          <div className='flex justify-center items-center h-40'>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className='flex flex-col items-center justify-center mt-10 sm:mt-22'>
            <img src={empty} alt="Empty inbox" className='w-32 sm:w-40 md:w-50 opacity-75' />
            <p className="text-center text-xs sm:text-sm md:text-[14px] pt-1 text-gray-700/70 font-medium">
              Your inbox is feeling lonely.
            </p>
          </div>
        ) : (
          <ul className='w-full'>
            {messages.map(message => (
              <li key={message._id} className="bg-white mb-3 p-3 sm:p-4 md:p-5 rounded shadow-md hover:shadow-md transition-shadow duration-300">
                <div className='flex justify-between items-center'>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5">
                    <p className="font-semibold text-xs sm:text-[13.5px]">
                      From: <span className='text-gray-700 font-medium'>{message.name}</span>
                    </p>
                    <p className="font-semibold text-xs sm:text-[13.5px]">
                      Email: <span className='text-gray-700 font-medium'>{message.email}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-gray-500 text-[12px]">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                    <button 
                      onClick={() => deleteMessage(message._id)} 
                      className="text-red-500 cursor-pointer hover:text-red-400 transition-colors p-1.5 hover:bg-red-50 rounded"
                      aria-label="Delete message"
                    >
                      <FaTrashAlt className="text-xs sm:text-sm md:text-[15px]" />
                    </button>
                  </div>
                </div>
                <div className='bg-gray-50 rounded mt-3 px-3 sm:px-4 py-2 sm:py-3 border-l-2 border-blue-900'>
                <p className="text-gray-600 text-xs sm:text-sm sm:text-[13.5px] font-medium break-words whitespace-pre-wrap">
                  {message.message}
                </p>
                </div>
              </li>            
            ))}
          </ul>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default AdminPage;
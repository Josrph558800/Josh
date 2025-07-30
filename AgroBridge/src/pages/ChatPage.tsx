import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { useUser } from '../contexts/UserContext';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  role: 'farmer' | 'household' | 'business';
  lastMessage: string;
  timestamp: string;
  online: boolean;
  unreadCount: number;
  avatar?: string;
}

const ChatPage: React.FC = () => {
  const { user } = useUser();
  const [selectedContact, setSelectedContact] = useState<string | null>('contact1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: ChatContact[] = [
    {
      id: 'contact1',
      name: 'Adebayo Ogundimu',
      role: 'farmer',
      lastMessage: 'The tomatoes are ready for harvest!',
      timestamp: '2 min ago',
      online: true,
      unreadCount: 2
    },
    {
      id: 'contact2',
      name: 'Fatima Abdullahi',
      role: 'farmer',
      lastMessage: 'Thank you for your order',
      timestamp: '1 hour ago',
      online: false,
      unreadCount: 0
    },
    {
      id: 'contact3',
      name: 'Chioma Okoro',
      role: 'household',
      lastMessage: 'When can you deliver?',
      timestamp: '3 hours ago',
      online: true,
      unreadCount: 1
    },
    {
      id: 'contact4',
      name: 'Lagos Foods Ltd',
      role: 'business',
      lastMessage: 'We need bulk supplies',
      timestamp: '1 day ago',
      online: false,
      unreadCount: 0
    }
  ];

  const messages: ChatMessage[] = [
    {
      id: '1',
      senderId: 'contact1',
      senderName: 'Adebayo Ogundimu',
      message: 'Hello! I saw your interest in fresh tomatoes.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: user?.id || 'me',
      senderName: user?.name || 'Me',
      message: 'Yes, I need about 5kg for my restaurant.',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: 'contact1',
      senderName: 'Adebayo Ogundimu',
      message: 'Perfect! I have fresh tomatoes harvested this morning. They are organic and pesticide-free.',
      timestamp: '10:33 AM',
      isOwn: false
    },
    {
      id: '4',
      senderId: user?.id || 'me',
      senderName: user?.name || 'Me',
      message: 'Great! What\'s your price per kg?',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: '5',
      senderId: 'contact1',
      senderName: 'Adebayo Ogundimu',
      message: '₦2,500 per kg. I can deliver to your location today.',
      timestamp: '10:36 AM',
      isOwn: false
    },
    {
      id: '6',
      senderId: 'contact1',
      senderName: 'Adebayo Ogundimu',
      message: 'The tomatoes are ready for harvest!',
      timestamp: '10:45 AM',
      isOwn: false
    }
  ];

  const selectedContactData = contacts.find(c => c.id === selectedContact);
  const currentMessages = selectedContact ? messages : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // In a real app, send message to backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Contacts Sidebar */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedContact === contact.id ? 'bg-green-50 border-r-2 border-r-green-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          contact.role === 'farmer' 
                            ? 'bg-green-100 text-green-600'
                            : contact.role === 'business'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}>
                          <span className="font-medium">
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                        {contact.online && (
                          <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                          <span className="text-xs text-gray-500">{contact.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                          {contact.unreadCount > 0 && (
                            <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                              {contact.unreadCount}
                            </span>
                          )}
                        </div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                          contact.role === 'farmer' 
                            ? 'bg-green-100 text-green-800'
                            : contact.role === 'business'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {contact.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedContactData ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedContactData.role === 'farmer' 
                            ? 'bg-green-100 text-green-600'
                            : selectedContactData.role === 'business'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}>
                          <span className="font-medium">
                            {selectedContactData.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedContactData.name}</h3>
                          <p className="text-sm text-gray-600">
                            {selectedContactData.online ? 'Online' : 'Offline'} • {selectedContactData.role}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Phone className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover: text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Video className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                      <button
                        type="button"
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Paperclip className="h-5 w-5" />
                      </button>
                      
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type your message..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-green-600"
                        >
                          <Smile className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={!messageInput.trim()}
                        className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a contact to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
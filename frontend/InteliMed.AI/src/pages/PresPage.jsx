import React, { useState } from 'react';
import Meniu from '../components/meniu';
import { axiosInstanceToApi } from '../../utils/network';

const PresPage = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');

    // Function to send a message to the backend and receive it back
    const sendMessageToBackend = async () => {
        try {
            // Make a POST request to your backend endpoint with the input message
            const response = await axiosInstanceToApi.post('/api/echo-endpoint', { message: inputMessage });
            
            // Extract the echoed message from the response
            const echoedMessage = response.data;
            
            // Set the echoed message to state
            setReceivedMessage(echoedMessage);
        } catch (error) {
            // Handle errors
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <Meniu />
            <h1>Welcome to the Presentation Page!</h1>
            <p>This is a basic page template.</p>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Enter your message"
                />
                <button onClick={sendMessageToBackend}>Send Message</button>
            </div>
            {receivedMessage && (
                <div style={{ border: '1px solid red', padding: '10px', marginTop: '20px' }}>
                    <p>Received Message: {receivedMessage}</p>
                </div>
            )}
        </div>
    );
};

export default PresPage;

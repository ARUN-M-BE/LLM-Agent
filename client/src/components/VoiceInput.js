
import React, { useState, useRef } from 'react';

const VoiceInput = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const handleToggleRecording = () => {
        if (isRecording) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        } else {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder.current = new MediaRecorder(stream);
                    mediaRecorder.current.ondataavailable = (event) => {
                        audioChunks.current.push(event.data);
                    };
                    mediaRecorder.current.onstop = async () => {
                        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                        audioChunks.current = [];
                        await transcribeVoice(audioBlob);
                    };
                    mediaRecorder.current.start();
                    setIsRecording(true);
                })
                .catch(err => console.error('Error accessing microphone', err));
        }
    };

    const transcribeVoice = async (audioBlob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transcribe-voice`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to transcribe voice');
            }

            const data = await response.text();
            setTranscribedText(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <button
                className={`px-4 py-2 text-white ${isRecording ? 'bg-red-500' : 'bg-green-500'} rounded`}
                onClick={handleToggleRecording}
            >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {transcribedText && (
                <div className="mt-4">
                    <p className="font-bold">Transcribed Text:</p>
                    <p>{transcribedText}</p>
                </div>
            )}
        </div>
    );
};

export default VoiceInput;

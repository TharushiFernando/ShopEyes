import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

function AudioUpload() {
  const [audioFile, setAudioFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setAudioFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.mp3, .wav',
    multiple: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!audioFile) {
      alert('Please select an audio file.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      await axios.post('http://localhost:8070/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Audio uploaded successfully!');
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  return (
    <div>
      <h2>Upload Audio</h2>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an audio file here, or click to select one.</p>
      </div>
      {audioFile && (
        <div>
          <p>Selected file: {audioFile.name}</p>
          <Button variant="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default AudioUpload;
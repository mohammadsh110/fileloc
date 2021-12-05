import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

const DropImage = (props) => {
    const [statusDrop, setStat] = useState('Drag File Here and submit');
    const getUploadParams = ({ meta }) => {
        const url = 'https://osanalyzer.herokuapp.com:3000/uploadImage/'
        return { url, meta: { fileUrl: `${url}` } }
    }
    const handleChangeStatus = ({ meta }, status) => {
        console.log('status', 'meta')
    }
    const sendLocation = () => {
        const formData = new FormData();
        formData.append("lat", props.lat);
        formData.append("lon", props.lon);
        fetch(
            'https://osanalyzer.herokuapp.com:3000/location/',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                setStat("Error in File uploading")
                console.error('Error:', error);
            });
    }
    const handleSubmit = (files, allFiles) => {
        fetch(
            'https://osanalyzer.herokuapp.com:3000/uploadImage/',
            {
                method: 'POST',
                body: files.map(f => f.meta),
            }
        )
            .then((response) => response.json())
            .then((result) => {
                setStat("File uploaded : " + result)
                console.log('Success:', result);
                // props.passedFunction()
            })
            .catch((error) => {
                setStat("Error in File uploading")
                console.error('Error:', error);
            });
        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={sendLocation}
            accept="*"
            inputContent={(files, extra) => (extra.reject ? 'Image files only' : statusDrop)}
            styles={{
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
            }}
        />
    )
}
export default DropImage;

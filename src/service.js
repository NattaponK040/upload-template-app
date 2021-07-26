import axios from 'axios';

const Host = "https://upload-template-port.herokuapp.com";

export const createTemplate = async (files,id) => {
    await axios.post(`${Host}/upload-template`, {
        files: files,
        folderId: id,
    })
}

export const getIdImagePreview = async (img) => {
    const response = await axios.post(`${Host}/uploadFileToStorage`, {
        img: img
    })
    return response.data.message
}


export const createFolder =async (folder)=>{

    const response = await axios.post(`${Host}/create-folder`, {
        folder: folder
    })
    return response.data.message.id

}

export const getCode= async ()=>{
    const response = await axios.post(`${Host}/getCode`, {
    })
    return response.data.message
}

export const getPublicLink =async (folder)=>{
    const response = await axios.post(`${Host}/getPublicFile`, {
        id: folder
    })
    return response.data.message.webViewLink
}

export const insertPort =async (data)=>{
    const response = await axios.post(`${Host}/insert-db`, data)
    return response.data.message

}

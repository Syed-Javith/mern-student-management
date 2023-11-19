import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies()
const url = 'http://localhost:5000';
const token = cookies.get('token')
const Headers = { headers : {
    'Authorization' : 'Bearer ' + token
} }
console.log(token);

export const getStudentDetailsById = async (userid) => {

try {
    const response = await axios.get(`${url}/student/${userid}`, Headers  )
    // console.log(response);
    // response.data?.user?.password = ''
    return response
} catch (err) {
    console.log(err);
    throw err;
}

}

export const addMark = async (userid,marks , token , email) => {
    Headers.headers.Authorization = 'Bearer ' + token
    console.log(Headers);
    try {
        const response = await axios.patch(`${url}/student/add/${userid}`,{ marks , email } , Headers)
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const removeMark = async (userid,code , token , email) => {
    try {
        const response = await axios.post(`${url}/student/remove/${userid}`,{ code , email} , Headers)
        console.log(response);
        return response
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const editMark = async(userid , marks , token , email) => {
    Headers.headers['Authorization'] = 'Bearer ' + token
    try {
        const response = await axios.patch(`${url}/student/edit/${userid}`,{ marks , email },Headers)
        console.log(response);
        return response
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getStudent = async (rollNumber , year , department ,token ) => {
    Headers.headers['Authorization'] = 'Bearer ' + token
    try {
        const response = await axios.post( `${url}/admin/getstudent/`, { rollNumber , year , department } , Headers )
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }

}

export const getIndidualMark = async (userid , subjectid , token) => {
    Headers.headers['Authorization'] = 'Bearer ' + token
    try {
        const response = await axios.get(`${url}/student/${userid}/${subjectid}`,Headers)
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const registerNewUser = async (user ,token) => {
    Headers.headers['Authorization'] = 'Bearer ' + token;
    try {
        console.log("lll");
        const response = await axios.post(`${url}/admin/register`,user , Headers)
        return response;
    } catch (error) {
        console.log(error);
        throw error
    }
}
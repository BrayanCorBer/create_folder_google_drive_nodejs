const fs = require('fs');
const { google }= require('googleapis');

const apikeys = require('./apiKey.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

// A Function that can provide access to google drive api
async function authorize(){
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}

// A Function that will upload the desired file to google drive folder
async function uploadFile(authClient){
    return new Promise((resolve,rejected)=>{
        const drive = google.drive({version:'v3',auth:authClient}); 

        var fileMetaData = {
            name:'20235134',
            mimeType: 'application/vnd.google-apps.folder',
            parents:['1tedCr_YUZuPBUbHUPECIaHfW1SJdFIlI'] // A folder ID to which file will get uploaded, give editor permission previously using the client_email in the Json file
        }

        drive.files.create({
            resource:fileMetaData,
            fields:'id'
        },function(error,file){
            if(error){
                return rejected(error)
            }
            resolve(file);
        })
    });
}

authorize().then(uploadFile).catch("error",console.error()); // function call
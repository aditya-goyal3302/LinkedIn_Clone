import AWS from 'aws-sdk';

const generateRandomString = async (tfile) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    randomString += "." + tfile.name.split('.')[1];
    return randomString;
};

const verify_file = async (tfile) => {
    console.log(tfile);
    let tname = tfile.name.toString().split('.')[1];
    if (tname == "jpg" || tname == "jpeg" || tname == "png" || tname == "gif" || tname == "webp") {
        return true;
    }
    else {
        return false;
    }
}
const Upload = async (file,randomString) => {
    try {
        if (verify_file(file)) {
            AWS.config.update({
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
            });
            const s3 = new AWS.S3({
                params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
                region: process.env.REACT_APP_AWS_REGION,
            });

            const params = {
                Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
                Key: randomString,
                Body: file,
                ACL: 'public-read',
            };
            const Upload = s3
                .putObject(params)
                .on("httpUploadProgress", (evt) => {
                    console.log(
                        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
                    );
                })
                .promise();

            Upload.then((err, data) => {
               console.log("data", data)
            }).catch((err) => {
                console.log(err);
            });


        }
        else {
            return "Invalid file type";
        }
    }
    catch (err) {
        console.error(err);
    }
}
let Uploader = (files) => {
    let urls = [];
    files.forEach( async (file) => {
        const randomString = await generateRandomString(file);
        const base_url = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`
        let url = base_url + randomString;
        Upload(file,randomString);
        urls.push(url);
    });
}

export default Uploader;

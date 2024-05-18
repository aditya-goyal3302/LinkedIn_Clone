const AWS = require('aws-sdk');

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

const Uploader = async (file, randomString) => {
    try {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        });
        const s3 = new AWS.S3({
            params: { Bucket: process.env.AWS_BUCKET_NAME },
            region: process.env.AWS_REGION,
        });

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: randomString,
            Body: file,
        };
        const Upload = s3
            .putObject(params)
            .on("httpUploadProgress", (evt) => console.log(`${parseInt(`${(evt.loaded * 100) / evt.total}`)}%`))
            .promise();
        return 'uploading'
    }
    catch (err) {
        console.log("ERROR_IN_AWS", err);
        return "error"
    }
}
let Upload = async (req, res, next) => {
    const files = req.files
    const urls = await Promise.all(
        files.map(async (file) => {
            const randomString = await generateRandomString(file);
            const base_url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
            let url = base_url + randomString;
            const resp = await Uploader(file, randomString, setFileStatus)
            if (resp !== "error")
                return url
            console.log('error');
        })
    )
    req.urls
}

export default Upload;

const fs = require('fs');
const archiver = require('archiver');
const ftp = require('basic-ftp');
const cron = require('node-cron');
const { exeName, loop, targetBackup, targetFTPSave, outputName, hostFTP, userFTP, passwordFTP } = require('./config.json')

// Fungsi untuk meng-zip folder
async function zipFolder(sourceFolder, zipFileName) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipFileName);
        const archive = archiver('zip');
        output.on('close', function () {
            console.log('Folder berhasil di-zip.');
            resolve();
        });
        archive.on('error', function (err) {
            console.error('Gagal men-zip folder:', err);
            reject(err);
        });
        archive.pipe(output);
        archive.directory(sourceFolder, false);
        archive.finalize();
    });
}

// Fungsi untuk mengunggah file ke server FTP
async function uploadFileToFTP(filePath, host, user, password, remotePath) {
    const client = new ftp.Client();
    try {
        await client.access({
            host,
            user,
            password,
            secure: false
        });
        // Mendapatkan daftar file yang sudah ada di direktori
        const fileNames = await client.list(remotePath);
        const zipFiles = fileNames.filter(file => file.name.endsWith('.zip'));
        const zipFileCount = zipFiles.length;
        // Menambahkan angka ke nama file zip baru
        const newZipFileName = zipFileName.replace('.zip', `_${zipFileCount + 1}.zip`);
        // Mengunggah file zip baru
        await client.uploadFrom(filePath, `${remotePath}/${newZipFileName}`);
        console.log(`File suskes di upload ke FTP Nomor: ${zipFileCount + 1}`);
    } catch (error) {
        console.error('Gagal mengunggah file ke server FTP:', error);
    } finally {
        client.close();
    }
}

function backup() {
    const sourceFolder = targetBackup;
    const zipFileName = outputName;
    const host = hostFTP;
    const user = userFTP;
    const password = passwordFTP;
    const remotePath = targetFTPSave;
try {
     zipFolder(sourceFolder, zipFileName);
    console.log('File berhasil di-zip.');
     uploadFileToFTP(zipFileName, host, user, password, remotePath);
} catch (error) {
    console.error('Terjadi kesalahan:', error);
}
}

// Jadwalkan proses zip dan unggah setiap 1 jam
cron.schedule('0 */1 * * *', async () => {
    isRunning(exeName, (status) => {
	if (status == false) {
	   console.log("server down, backup holded. because no change saved.")
       	   break;
	}
	backup();
    }) 
});

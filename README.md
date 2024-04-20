# auto-backup
Growtopia Private Server auto backup with FTP (File Transfer Protocol)

# mulai mengedit
Edit `config.json` sampai keluar:
```json
{
    "loop": 1, // 1 = 1 JAM
    "exeName": "./Release/servr.exe", // NAMA/LOKASI EXE
    "targetBackup": "./Release/database", // TARGET FOLDER YANG MAU DI BACKUP
    "targetFTPSave": "./backup", // LOKASI SIMPANAN BACKUP DI FTP
    "outputName": "backup.zip", // LOKASI OUTPUT ZIP DESKTOP
    "hostFTP": "abc.my.id", // HOST FTP MU
    "userFTP": "username@abc.my.id", // USER FTP MU
    "passFTP": "pass" // PASSWORD FTP MU
}
```

- Detail
- `"loop"`: 1 = 1 JAM
- `"exeName"`: NAMA/LOKASI EXE
- `"targetBackup"`: TARGET FOLDER YANG MAU DI BACKUP
- `"targetFTPSave"`: LOKASI SIMPANAN BACKUP DI FTP
- `"outputName"`: LOKASI OUTPUT ZIP DESKTOP
- `"hostFTP"`: HOST FTP MU
- `"userFTP"`: USER FTP MU
- `"passFTP"`: PASSWORD FTP MU

# memulai program
- Mulai dengan
```npm install```

ketika selesai lanjutkan dengan
```node main.js```

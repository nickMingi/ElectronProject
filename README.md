# ElectronProject

>This project is based on electron-start
>Electron is powerful framework which support 3 OSs
>

Windows
+MAC OSX
+Linux

I could make fine app with electron within a week


we need to implement **require** to get start electron

```javascript
        const electron = require('electron');
        const fs = require('fs');
        const {ipcRenderer} = electron;
        const form = document.querySelector('form');
```
![Alt text](file:///Users/nickhopper/Desktop/electron1.png "electron")

```javascript
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'stutool',
        });
```

>This is the setting for mysql

```javascript
       function globalkeyConfig(){
            globalShortcut.register('CommandOrControl+1', () => {
                mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
            })
            globalShortcut.register('CommandOrControl+2', () => {
                mainWindow.isMinimized() ? mainWindow.show()  : mainWindow.minimize();
            })
            globalShortcut.register('CommandOrControl+a', () => {
                mainWindow.webContents.send('global:key','a');
            })
            globalShortcut.register('CommandOrControl+d', () => {
                mainWindow.webContents.send('global:key','d');
            })
            globalShortcut.register('CommandOrControl+f', () => {
                mainWindow.webContents.send('global:key','f');
            })
            globalShortcut.register('CommandOrControl+g', () => {
                mainWindow.webContents.send('global:key','g');
            })
        }
```

>This is setting for globalShortcut

const electron = require('electron');
const url = require('url');
const path = require('path');
const mysql = require('mysql');
const dialog = electron.dialog;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'stutool2'
});
var dbconnect = 0;
var loginSession = 0;

const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = require('electron');

let mainWindow;
let memberWindow;

// Listen for app to be ready
function createWindow() {
    // Create new window
    mainWindow = new BrowserWindow(
        { 
         width: 800,
         height: 1200,
         frame: false
          });
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.openDevTools();

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    globalkeyConfig();

    mainWindow.on('closed', function () {
        mainWindow = null;
        connection.end();
        app.quit();
    });
};

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

function createMemberWindow() {
    // Create new window
    memberWindow = new BrowserWindow({ width: 600, height: 600 });
    // Load html into window
    memberWindow.loadURL(url.format({
        pathname: path.join(__dirname, './member/memberWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.send('set-information-membership', 1);
    console.log('Send: mainWindow->infomember ' + 1);
    memberWindow.webContents.send('sendInfoMember');
    console.log('Send: memberWindow->infomember');
    memberWindow.on('closed', function () {
        mainWindow.webContents.send('set-information-membership', 0);
        console.log('Send: mainWindow->infomember ' + 0);
        memberWindow = null;
    });
};



app.on('ready', createWindow);

app.on('window-all-closed', function () {
    // On OS X
    if (process.platform !== 'darwin') {
        mainWindow = null;
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X
    if (mainWindow === null) {
        createWindow();
    }
});
function locateToLogin() {
    if (memberWindow != null) {
        memberWindow.close();
    }
    mainWindow.webContents.send('login-activate');
}

function openFile(){
    console.log("Receiving Open File");
    dialog.showOpenDialog(
        /*{
        filters: [
            { name: 'text', extensions:['txt']},
            { name: 'docs', extensions:['docx']}    
        ]} ,*/
        function (fileName) {
            if(fileName == undefined)
                return;
            var name = filenameCutter(fileName[0]);
            mainWindow.webContents.send("F:open File",fileName[0],name);
            
    });
}

function saveFile(){
    mainWindow.webContents.send('save-file');
}

function dbOpenCheck() {
    if (dbconnect != 1) {
        console.log("dpconnect inside");

        connection.connect(function (err) {
            if (err) {
                console.log(err.code);
                console.log(err.errno);
                console.log("Connection Fail!");
                errcheck(err.errno);
                //mainWindow.send("DB:Open Fail",err.errno);
                return false;
            } else {
                dbconnect = 1;
                console.log("Connected!");
            }
        });
    }
    return true;
}

function filenameCutter(fileName)
{
        var names = fileName.split("/");
        var name = names[names.length-1];
        return name;
}

function dbClose() {
    console.log("Recieve: DB close");
    if (loginSession != 0) {
        console.log(loginSession);
        console.log(dbconnect);
        loginSession = 0;
        mainWindow.webContents.send('DB:CloseSuccess');
    }
}

ipcMain.on('memberWindow-open', function (e) {
    createMemberWindow();
});

ipcMain.on('open-directory-dialog', function (e,data) {
    console.log("Receiving Save File");
    dialog.showSaveDialog({
        properties: ['openDirectory']
    }, function (fileName) {
        if(fileName == undefined)
            return;
        var name = filenameCutter(fileName);
        mainWindow.webContents.send("F:save File",name,fileName,data);
    });
});

ipcMain.on('DB:DbClose', function (e) {
    dbClose();
});

ipcMain.on('DB:InsertMember', function (e, mid, mpw, muniversity, menyear, menmonth) {
    if (loginSession != 0) {
        loginSession == 0;
    }
    dbOpenCheck();
    var query = connection.query('select * from member', function (err, result, fields) {
        if (err) {
            console.log(err);
            console.log('Query Fail!');
        } else {
            console.log('success!');
            console.log(result);
        }
    })
    var post = { id: mid, pw: mpw, university: muniversity, enyear: parseInt(menyear), enmonth: menmonth };
    console.log(post);
    var query = connection.query("insert into member set ?", post, function (err, result, fields) {
        if (err) {
            console.log(err);
            console.log('Query Fail!');
        } else {
            console.log('success!');
            mainWindow.webContents.send("DB:Login admin");
        }
    })
});

ipcMain.on('Login-mainWindow', function (e, id, pw) {
    var check = dbOpenCheck();
        selectmember(id,pw);
    
});

        function selectmember(id,pw)
        {
            var query = connection.query("select * from member where id ='" + id + "' and pw='" + pw + "'", function (err, result, fields) {
                if (err) {
                    console.log(err.code);
                    console.log('Query Fail!');
                    mainWindow.webContents.send("DB:Query Fail",err.errno);
                    errcheck(err.errno);
                } else {
                    console.log('success!');
                    console.log(result);
                    mainWindow.webContents.send('login-Success', result);
                    loginSession = result[0].seq;
                    console.log(loginSession);
                }
            });
        }
        function querysend(sentquery){
            dbOpenCheck();
            var query = connection.query(sentquery, function (err, result, fields) {
                if (err) {
                    console.log(err.code);
                    console.log('DB:Query Fail!');
                    console.log(sentquery);
                    if(sentquery == 'use stutool'){
                        mainWindow.webContents.send("DB:use DB fail",err.errno);
                    }
                } else {
                    console.log('DB:Query success!');
                    console.log(result);
                    console.log(sentquery);
                    if(sentquery == 'create database stutool2')
                    {
                        createTable();
                    }
                }
            });
        }

        ipcMain.on("DB:Create Database", function(e){
            console.log("DB:Create Database() .js ");
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '1234'
            });
            connection.connect(function (err) {
                if (err) {
                    console.log(err.code);
                    console.log(err.errno);
                    console.log("Re:Connection Fail!");
                    errcheck(err.errno);
                    //mainWindow.send("DB:Open Fail",err.errno);
                    return false;
                } else {
                    dbconnect = 1;
                    console.log("Connected!");
                }
            });
            querysend("create database stutool2");
        });


        function errcheck(key){
            console.log('DB:error check()');
            switch (key) {
                case 1046:
                case 1049:
                    createDB();
                    break;
                
                default:
                    break;
            }
        }

        function createDB(){
            // DB check
            if('stutool' != connection.config.database)
            {
                console.log("Create DB !!");
                querysend('use stutool');
            }else{
                console.log("Create DB Fail = samename");
            }
        }

        function createTable(){
            console.log("Real Create Table!");
            querysend('use stutool2');
            var query = connection.query("CREATE TABLE member (seq int(255) AUTO_INCREMENT primary key not null, id varchar(10) unique not null, pw varchar(16) not null, university varchar(12), enyear int(4), enmonth int(1) )",
             function (err, result, fields) {
                if (err) {
                    console.log(err.code);
                    console.log(err.errno);
                    console.log('Create Table Fail!');
                    errcheck(err.errno);
                } else {
                    console.log('success!');
                    var post = { id: 'admin', pw: 'admin', university: 'dsu', enyear: 2018, enmonth: 2 };
                    console.log(post);
                    var query = connection.query("insert into member set ?", post, function (err, result, fields) {
                        if (err) {
                            console.log(err);
                            console.log('Admin Query Fail!');
                        } else {
                            console.log('success! Admin Created');
                            console.log(result);
                            locateToLogin();
                        }
                    })
                }
            });
        }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mainMenuTemplate = [
    {
        label: 'Information',
        submenu: [
            {
                label: 'Membership',
                accelerator: process.platform == 'darwin' ? 'Command+M' : 'Ctrl+M',
                click() {
                    createMemberWindow();
                }
            },
            {
                label: 'Login/out',
                accelerator: process.platform == 'darwin' ? 'Command+L' : 'Ctrl+L',
                click() {
                    if (loginSession == 0) {
                        locateToLogin();
                    } else {
                        dbClose();
                    }
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Configuration',
        submenu: [
            {
                label: 'Add',
                click() {

                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'File',
        submenu:[
            {
                label: 'Open File',
                click(){
                    openFile();
                }
            },
            {
                label: 'Save',
                click(){
                    saveFile();
                }
            }
        ]
    }
];

if (process.env.Node_ENV !== 'production') {
    mainMenuTemplate.unshift({});
}

if (loginSession == 0) {
    console.log('push login');
    mainMenuTemplate.push({

        label: 'login',
        accelerator: process.platform == 'darwin' ? 'Command+L' : 'Ctrl+L',
        click() {
            locateToLogin();
        }

    })
} else {
    console.log('push logout');
    mainMenuTemplate.push({

        label: 'logout',
        accelerator: process.platform == 'darwin' ? 'Command+L' : 'Ctrl+L',
        click() {
            dbClose();
        }

    })
}

if (process.env.Node_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}
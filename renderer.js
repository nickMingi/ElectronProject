// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

/*const { remote } = require('electron')
const { Menu } = remote
const myContextMenu = Menu.buildFromTemplate([
    { label: 'Cut', role: 'cut'},
    { label: 'Copy', role: 'copy'},
    { label: 'Paste', role: 'paste'},
    { label: 'Select All', role: 'selectall'},
    { type: 'separator' },
    { label: 'Custom', click(){ console.log('Custom Menu') } }
])

Window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    myContextMenu.popup()
})*/



/*const ipc = require('electron').ipcRenderer
asyncMsgBtn.addEventListener('click', function(){
    ipc.send('asynchronous-message', 'Thats one small step for man');
})
ipc.on('asynchronous-reply', function(event, arg){
    const message = 'Asynchronous message reply: ${arg}';
    document.getElementById('asyncReply').innerHTML = message;
})

const ipc = electron.ipcMain;
ipc.on('asynchronous-message', function(event, arg){
    if (arg === 'Thats one small step for man'){
        event.sender.send('asynchronous-reply', ', one giant leap for mankind.');
    }
})*/

    class mysqlErrCheck
    {

        constructor(Connection)
        {
            this.connection = Connection;
            this.db = 'stutool';
            this.dbconnect = 0;
        }

        errcheck(key){
            switch (key) {
                case 1046:
                case 1049:
                    createDB();
                    break;
            
                default:
                    break;
            }
        }

        createDB(){
            // DB check
            if(this.db != this.connection.database)
            {
                console.log("Create DB!!");
            }else{
                console.log("Create DB Fail");
            }
        }

        dbOpenCheck() {
            if (this.dbconnect != 1) {
                connection.connect(function (err) {
                    if (err) {
                        console.log(err.code);
                        console.log("Connection Fail!");
                        mainWindow.send("DB:Open Fail",err.errno);
                        return;
                    } else {
                        dbconnect = 1;
                        console.log("Connected!");
                    }
                });
            }
        }

    }
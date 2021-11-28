const { app, ipcMain, BrowserWindow } = require("electron")
const sqlite3 = require("sqlite3")
const path = require("path")
const url = require("url")

// database
const db = new sqlite3.Database(
    process.env.ELECTRON_START_URL
        ? path.join(__dirname, "database_test.db")
        : path.join(process.resourcesPath, "database.db"),
    (err) => {
        if (!err) {
            db.serialize(
                () => {
                    db.run(
                        "DROP TABLE IF EXISTS [TEST_TABLE]"
                    ).run(
                        "CREATE TABLE IF NOT EXISTS [TEST_TABLE](CNT_INDEX INTEGER, CNT_VALUE INTEGER)"
                    ).run(
                        "INSERT INTO [TEST_TABLE] VALUES(0, 0)"
                    )
                }
            )
            console.log("database established")
        } else {
            console.log(err.message)
        }
    }
)

// communication
ipcMain.on("setComm", (e, arg) => {
    console.log(arg)
    e.returnValue = "pong"
})

ipcMain.on("setData", (e, arg) => {
    db.run(`UPDATE [TEST_TABLE] SET CNT_VALUE=${arg} WHERE CNT_INDEX=0`)
    db.each("SELECT CNT_VALUE FROM [TEST_TABLE] WHERE CNT_INDEX=0", (_, row) => {
        e.returnValue = row.CNT_VALUE
        console.log(row.CNT_VALUE)
    })
})

// initiate
function makeWin() {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, "../build/index.html"),
        protocol: "file",
        slashes: true
    })

    win.loadURL(startUrl)
}

app.whenReady().then(
    () => {
        makeWin()
    }
)

app.on("window-all-closed",
    () => {
        db.close()
        app.quit()
    }
)
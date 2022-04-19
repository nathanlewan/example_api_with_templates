const path = require( 'path' );

const functions = {
    "runShellProcess": {
        "listFolderContents": require( path.join(__dirname, 'functions', 'runShellProcess_listFolderContents') )
    }
}



exports.WebRouter = () => {

    const express = require( 'express' );
    const router = express.Router()

    router.use( (req, res, next) => { 
        console.log("[testing route]: route accessed")
        next()
    })

    router.get('/runShellProcess/:scriptName/:scriptArgument', async (req, res) => { 

        const testScriptName = (scriptNameAttribute) => {
            return (req.params.scriptName).includes(scriptNameAttribute);
        }

        switch (true) {

            case testScriptName("list_folder_contents"): {

                let controllerReturn = await functions.runShellProcess.listFolderContents.controller(req.params.scriptArgument);
                let data = await functions.runShellProcess.listFolderContents.view.renderJson(controllerReturn);
                res.send(data)
                break;
            }

            default: {
                res.send( 'no script specified' )
            }
        }

    })

    return router

}

exports.IoRouter = async (socket, data) => {
    
    switch (data.path) {

        case "/runScript": {
            let message = await functions.run_shell_processes("../external_scripts", req.params.scriptName)
            console.log( `[testing route][runShellProcess]: ${message}` )
            //socket.emit('/examples/echo', await data_processors.generate_html.generateEchoHtml( message ))
            break;
        }


        default: {
            console.log( `[testing route][socketio]: no good route` )
        }

    }
}

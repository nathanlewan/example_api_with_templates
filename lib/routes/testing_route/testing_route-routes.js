const path = require( 'path' );


const functions = {
    "runShellProcess": {
        "listFolderContents": require( path.join(__dirname, 'functions', 'runShellProcess_listFolderContents') )
    }
}


const testIncludesPattern = (sentAttribute, scriptNameAttribute) => {
    return (sentAttribute).includes(scriptNameAttribute);
}


exports.WebRouter = () => {

    const express = require( 'express' );
    const router = express.Router()

    router.use( (req, res, next) => { 
        console.log("[testing route]: route accessed")
        next()
    })

    router.get('/runShellProcess/:scriptName/:scriptArgument', async (req, res) => { 

        switch (true) {

            case testIncludesPattern(req.params.scriptName, "list_folder_contents"): {

                let controllerReturn = await functions.runShellProcess.listFolderContents.controller(req.params.scriptArgument);
                await functions.runShellProcess.listFolderContents.view.renderJson(controllerReturn, {
                    "type": "WebRouter",
                    "req": req,
                    "res": res
                });
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

        case "/runShellProcess": {

            switch (true) {

                case testIncludesPattern(data.scriptName, "list_folder_contents"): {

                    let controllerReturn = await functions.runShellProcess.listFolderContents.controller(data.scriptArgument);
                    await functions.runShellProcess.listFolderContents.view.renderJson(controllerReturn, {
                        "type": "IoRouter",
                        "socket": socket,
                        "data": data,
                        "emitEventName": "/testing/list_folder_contents"
                    });

                }

            } 

            break;
        }


        default: {
            console.log( `[testing route][socketio]: no good route` )
        }

    }
}

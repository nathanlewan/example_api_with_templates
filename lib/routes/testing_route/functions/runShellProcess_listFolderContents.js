const path = require( 'path' );

const functions = {
    "run_shell_processes": require( path.join(__dirname, '../', '../', '../', 'base', 'lib', 'utility_functions', 'run_shell_processes') )
}

exports.controller = async (argument) => {

    let message = await functions.run_shell_processes(`../../../routes/testing_route/external_scripts`, `list_folder_contents.sh ${argument}`)
    return message

}

exports.view = {
    "renderJson": async (controllerData) => {
        let baseArray = controllerData.split("\n");
        
        let finalJsonData = [];

        baseArray.forEach( (element) => {
            let splitAttrs = element.split(" : ")
            let currentObject = {};

            currentObject.type = splitAttrs[0]
            currentObject.name = splitAttrs[1]
            currentObject.userOwner = splitAttrs[2]
            currentObject.groupOwner = splitAttrs[3]
            currentObject.size = splitAttrs[4]
            currentObject.creationDate = splitAttrs[5]
            currentObject.modificationDate = splitAttrs[6]

            finalJsonData.push(currentObject)
            
        })

        return JSON.stringify(finalJsonData)
    }
}
/*
 *  @deprecated
 */
function flagError(res, data, flag, code, message) {
    if (data.includes(flag)){
        return res.status(400).send({message:message})
    } else return false;
}

function clientError(res, message) {
    res.status(400).send({message: message});
}

function serverError(res, message) {
    res.status(500).send({message: message});
}

function success(res, message, create) {
    const code = create ? 201 : 200;
    return res.status(code).send({message: message});
}



export {flagError, clientError, serverError, success}
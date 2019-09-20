const respondJSON = (request, response, status, object) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondXML = (request, response, status, content) => {
    const headers = {
        'Content-Type': 'text/xml',
    };

    response.writeHead(status, headers);
    response.write(content);
    response.end();
};

const createResponse = (request, response, responseObj, type, status) => {
    if (type[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <type>${responseObj.type}</type>`;
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;
        respondXML(request, response, status, responseXML);
    } else {
        respondJSON(request, response, status, responseObj);
    }
};

const success = (request, response, params, acceptedTypes) => {
    const successObj = {
        message: 'This is a successful response',
        type: 'Success',
    };

    createResponse(request, response, successObj, acceptedTypes, 200);
    };

    const notFound = (request, response, params, acceptedTypes) => {
    const responseObj = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
        type: 'Not Found',
    };

    createResponse(request, response, responseObj, acceptedTypes, 404);
};

const badRequest = (request, response, params, acceptedTypes) => {
    const responseObj = {
        message: 'Contains valid parameters',
        type: 'Bad Request',
    };

    if (!params.valid || params.valid !== 'true') {
        responseObj.message = 'Missing valid query parameter, needs to be set to true';
        responseObj.id = 'badRequest';
        createResponse(request, response, responseObj, acceptedTypes, 400);
    } else {
        createResponse(request, response, responseObj, acceptedTypes, 200);
    }
};

const unauthorized = (request, response, params, acceptedTypes) => {
    const responseObj = {
        message: 'Unauthorized to use this page',
        type: 'Unauthorized',
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseObj.message = 'Missing loggedIn query parameter set to yes';
        responseObj.id = 'Unauthorized';
        createResponse(request, response, responseObj, acceptedTypes, 401);
    } else {
        responseObj.message = 'You have successfully viewed the content';
        createResponse(request, response, responseObj, acceptedTypes, 200);
    }
};

const forbidden = (request, response, params, acceptedTypes) => {
    const responseObj = {
        message: 'You do not have access to this content',
        id: 'forbidden',
        type: 'Forbidden',
};

createResponse(request, response, responseObj, acceptedTypes, 403);
};

const internalError = (request, response, params, acceptedTypes) => {
    const responseObj = {
        message: 'Internal Server Error. Something went wrong.',
        id: 'internalError',
        type: 'Internal Server Error',
    };

    createResponse(request, response, responseObj, acceptedTypes, 500);
};

const notImplemented = (request, response, params, acceptedTypes) => {
    const responseObj = {
        message: 'A get request for this page has not been implemented yet. Check later.',
        id: 'notImplemented',
        type: 'Not Implemented',
    };

    createResponse(request, response, responseObj, acceptedTypes, 501);
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internalError,
    notImplemented,
    notFound
};
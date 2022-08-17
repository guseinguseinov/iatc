function generateResponseMessage(status, message, data) {
    return {
        status,
        message, 
        data,
    }
}

export default generateResponseMessage;
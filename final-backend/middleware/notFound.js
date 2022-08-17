import generateResponseMessage from "../utils/resGenerate.js";

const notFound = (_, res) => {
    res.status(404).json( generateResponseMessage(404, 'Requested url not found', null) );
}

export default notFound;
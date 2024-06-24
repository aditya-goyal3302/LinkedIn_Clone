const { company_service } = require('../services')

exports.search = async (req, res) => {
    try {
        const resp = await company_service.search(req)
        if(!resp.length)
            return res.status(204).send("No Content Found")
        res.status(200).send(resp)
    } catch (error) {
        console.log('error_in_comp._cont: ', error);
        res.status(error.status || 500).send(error.message || "Internal Server Error")
    }
}

exports.get_company_data = async (req, res) => {
    try {
        const resp = await company_service.get_company_data(req)
        // if(!resp.length)
        //     return res.status(204).send("No Content Found")
        res.status(200).send(resp)
    } catch (error) {
        console.log('error_in_comp._cont: ', error);
        res.status(error.status || 500).send(error.message || "Internal Server Error")
    }
}
exports.set_company_data = async (req, res) => {
    try {
        const resp = await company_service.set_company_data(req)
        // if(!resp.length)
        //     return res.status(204).send("No Content Found")
        res.status(200).send(resp)
    } catch (error) {
        console.log('error_in_comp._cont: ', error);
        res.status(error.status || 500).send(error.message || "Internal Server Error")
    }
}
exports.patch_company_data = async (req, res) => {
    try {
        const resp = await company_service.patch_company_data(req)
        // if(!resp.length)
        //     return res.status(204).send("No Content Found")
        res.status(200).send(resp)
    } catch (error) {
        console.log('error_in_comp._cont: ', error);
        res.status(error.status || 500).send(error.message || "Internal Server Error")
    }
}
exports.delete_company_data = async (req, res) => {
    try {
        const resp = await company_service.delete_company_data(req)
        // if(!resp.length)
        //     return res.status(204).send("No Content Found")
        res.status(200).send(resp)
    } catch (error) {
        console.log('error_in_comp._cont: ', error);
        res.status(error.status || 500).send(error.message || "Internal Server Error")
    }
}
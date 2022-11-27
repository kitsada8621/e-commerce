const rules = require("../common/rules");

exports.InternalServer = {
    status: 500,
    success: false,
    data: rules.internal_server_error,
    obj: null
}
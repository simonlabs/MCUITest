/**
 * DovesService module
 * It represents a service performing the GET, POST, PUT, and DELETE AJAX calls to the backend.
 * It utilizes jQuery's AJAX API as its internal implementation.
 */

/**
 * GET: get a list of doves, with or without a filter.
 * param = { callback, filter }
 */
function getDoves(param) {
    if (!param || !param.callback) {
        return;
    }

    let url = "/doves";
    let filter = param.filter ? param.filter.trim() : null;
    if (filter && filter.length > 0) {
        url = url+"?"+filter;
    }
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        contentType : "application/json; charset=utf-8"
    }).then((resp, textStatus, jqXHR) => {        // onFullfill
        param.callback(resp);
    }, (jqXHR, textStatus, error) => {            // onReject
        var debug = 1;
    });
}

/**
 * POST: add new dove.
 * param = {
 *     details: { active, color, deorbit_dt, images_collected, last_command },
 *     callback
 * }
 */
function postDove(param) {
    if (!param) {
        return;
    }
    let details = param.details;
    if (!details ||
        Object.keys(details).sort().join(',') != "active,color,deorbit_dt,images_collected,last_command") {
        return;
    }
    let callback = param.callback;

    $.ajax({
        url: "/doves",
        type: "POST",
        dataType: "json",
        contentType : "application/json; charset=utf-8",
        data: JSON.stringify(details)
    }).then((resp, textStatus, jqXHR) => {        // onFullfill
        if (callback) {
            callback(resp);
        }
    }, (jqXHR, textStatus, error) => {            // onReject
        var debug = 1;
    });
}

/**
 * PUT: change a dove.
 * param = {
 *     details: { active, color, deorbit_dt, id, images_collected, last_command },
 *     callback
 * }
 */
function putDove(param) {
    if (!param) {
        return;
    }
    let details = param.details;
    if (!details ||
        Object.keys(details).sort().join(',') != "active,color,deorbit_dt,id,images_collected,last_command") {
        return;
    }
    let callback = param.callback;

    let url = "/doves/"+details.id;
    $.ajax({
        url: url,
        type: "PUT",
        dataType: "json",
        contentType : "application/json; charset=utf-8",
        data: JSON.stringify(details)
    }).then((resp, textStatus, jqXHR) => {        // onFullfill
        if (callback) {
            callback(resp);
        }
    }, (jqXHR, textStatus, error) => {            // onReject
        var debug = 1;
    });
}

/**
 * DELETE: delete a dove.
 * param = { id, callback }
 */
function deleteDove(param) {
    if (!param || !param.id) {
        return;
    }
    let callback = param.callback;

    let url = "/doves/"+param.id;
    $.ajax({
        url: url,
        type: "DELETE",
        dataType: "json",
        contentType : "application/json; charset=utf-8"
    }).then((resp, textStatus, jqXHR) => {        // onFullfill
        if (callback) {
            callback(resp);
        }
    }, (jqXHR, textStatus, error) => {            // onReject
        var debug = 1;
    });
}

module.exports = {
    getDoves,
    postDove,
    putDove,
    deleteDove
};


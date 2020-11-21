let timerId = undefined;
const debounceFunction = function (func, delay, form) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
        func(form);
    }, delay);
}
let showNotification = function (type, message) {
    new Noty({
        theme: 'relax',
        text: message,
        type: type,
        layout: 'topRight',
        timeout: 1500
    }).show();
}
const ajaxAddDB = function (form) {
    $.ajax({
        type: 'post',
        url: "/property/add_db",
        data: form.serialize(),
        success: function (res) {
            console.log("Response : ", res);
            window.location.assign("/property/list");
        },
        error: function (err) {
            console.log('Error:', err.responseText);
        }
    });
}

const allEventSetter = () => {
    let form = $('#property-details-form');
    form.submit(function (e) {
        e.preventDefault();
        console.log("Submit property details button clicked!");
        debounceFunction(ajaxAddDB, 1000, form);
    })
}
window.addEventListener("DOMContentLoaded", () => {
    allEventSetter();
});
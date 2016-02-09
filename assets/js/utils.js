
function triggerAlert(type, msg) {
    var types = {
        success: '<div class="alert alert-success">{text}</div>',
        error: '<div class="alert alert-error">{text}</div>',
        info: '<div class="alert alert-info">{text}</p>',
    };
    var alert = (types[type]).replace('{text}', msg);

    $('#alert_container').empty();
    $('#alert_container').append(alert);
    $('#alert_container').addClass('enter');
    setTimeout(function () {
        $('#alert_container').removeClass('enter');
        $('#alert_container').addClass('leave');
    }, 2600);
}
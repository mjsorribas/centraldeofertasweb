/**
 * @author Joaquin Campero <juacocampero@gmail.com>
 */

$(document).ready(function () {
    var pathArray = location.pathname.split('/');
    var id = '#sidebar_li';
    for (var i = 1; i < pathArray.length; i ++) {
        id += '_' + pathArray[i];
    }
    $('ul.sidebar-menu li').removeClass('active');
    $(id).addClass('active');
});
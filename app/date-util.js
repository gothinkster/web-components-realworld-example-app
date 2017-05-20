"use strict";
export function formatDate(dateToFormat) {
    dateToFormat = new Date(dateToFormat);
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    var date = dateToFormat.getDate();
    var monthIndex = dateToFormat.getMonth();
    var year = dateToFormat.getFullYear();
    var day = dateToFormat.getDay();
    return days[day] + ' ' + monthNames[monthIndex] + ' ' + date + ' ' + year;
}

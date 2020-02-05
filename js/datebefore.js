"use strict";

export const dateBefore = timeStamp => {
    const now = Math.round(Date.now() / 1000);
    timeStamp = timeStamp / 1000;
    const min = 60;
    const hour = min * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = month * 12;
    if (now - timeStamp - year > 0) {
        const years = Math.round((now - timeStamp - year) / year);
        return `${years || 1}Y`;
    }
    if (now - timeStamp - month > 0) {
        const months = Math.round((now - timeStamp - month) / month);
        return `${months || 1}M`;
    }
    if (now - timeStamp - week > 0) {
        const weeks = Math.round((now - timeStamp - week) / week);
        return `${weeks || 1}W`;
    }
    if (now - timeStamp - day > 0) {
        const days = Math.round((now - timeStamp - day) / day);
        return `${days || 1}D`;
    }
    if (now - timeStamp - hour > 0) {
        const hours = Math.round((now - timeStamp - hour) / hour);
        return `${hours || 1}h`;
    }
    if (now - timeStamp - min > 0) {
        const mins = Math.round((now - timeStamp - min) / min);
        return `${mins || 1}m`;
    }
    return "now";
}; 
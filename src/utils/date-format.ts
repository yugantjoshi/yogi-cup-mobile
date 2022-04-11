import moment from "moment";

export const getDayOfWeek = (time: Date) => {
    const date = new Date(time);
    const formatted = moment(date.getDate(), "YYYY-MM-DD HH:mm:ss");
    const day = formatted.format("dddd");
    return day;
}

export const getTimeOfDay = (time: Date) => {
    const formatTime = moment(time).format("h:mm a");
    return formatTime;
}
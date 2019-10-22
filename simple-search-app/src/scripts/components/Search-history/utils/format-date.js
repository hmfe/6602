export  default function(date) {
    try {
        date = new Date(date);
        date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}, ${date.getHours()}:${date.getMinutes()}`;
    } catch (e) {}

    return date;
}
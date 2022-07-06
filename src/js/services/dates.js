const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function currentDate() {
    return new Date();
}

export function daysAfterToday(num) {
    return new Date(currentDate().getTime() + (24 * 60 * 60 * 1000)*num)
}

export function formatDate(date) {
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function currentDay(date) {
    return weekDays[date.getDay()];
}


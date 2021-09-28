export default function convertTime(values) {
    const timeStart = new Date(values.dateStart.format().split("T")[0]+"T"+values.duration[0].format().split("T")[1])
    const timeEnd = new Date(values.dateStart.format().split("T")[0]+"T"+values.duration[1].format().split("T")[1])
    const duration = timeEnd.getHours() - timeStart.getHours();

    return { timeStart, timeEnd, duration }
};
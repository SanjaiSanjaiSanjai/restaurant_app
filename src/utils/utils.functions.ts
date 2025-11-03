export function timeChanger(Usertime: string) {
    const [time,meridian] = Usertime.split(" ")
    const [hours,minutes] = time.split(":")
    const getMeridianTime = meridian === "PM" ? parseInt(hours) + 12 : hours
    return `${getMeridianTime}:${minutes}`
}
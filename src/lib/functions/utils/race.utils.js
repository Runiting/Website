export const generateJoinCode = () => {

    const time = Date.now().toString();

    let startPosition = time.length % 2 ? 2 : 3;

    let joinCode = "";

    for (let i = startPosition; i <= time.length; i = i + 2) {
        const car = time[i];
        const previousCar = time[i - 1];

        const asciiCode = parseInt(car + "" + previousCar);

        const char = (asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122) ? String.fromCharCode(asciiCode) : "" + asciiCode;

        joinCode += char;
    }

    return joinCode;
}
function randomString() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

let dataArray = [];

for (let i = 0; i < 10; i++) {
    let data = {
        "bodyPart": randomString(),
        "equipment": randomString(),
        "gifUrl": randomString(),
        "id": randomString(),
        "name": randomString(),
        "target": randomString()
    };
    dataArray.push(data);
}

let jsonDataArray = JSON.stringify(dataArray);
console.log(jsonDataArray);
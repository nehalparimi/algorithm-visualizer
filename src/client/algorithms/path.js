function capitalize(string) {
    if (string.length == 0) return;
    for (let i = 1; i < string.length; ++i) {
        if (string[i - 1] == ' ') string[i] = string[i].toUpperCase();
        console.log(string[i]);
    }
    string[0] = string[0].toUpperCase();
    return string;
}

let string = "bonjour, je m'appelle nehal";
capitalize(string);
console.log(string);
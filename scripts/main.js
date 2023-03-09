let inputText = document.querySelector("#inputText");
let EncriptButton = document.querySelector("#inputEncript");
let DecriptButton = document.querySelector("#inputDecript");
let output = document.querySelector("#outputText");

const formulaGenerator = () => {
    let index = Math.ceil(Math.random() * 30 + 12);
    let direction = Math.ceil(Math.random() * 2);
    if (direction == 1) {
        index *= -1;
    }
    let skip = Math.ceil(Math.random() * 7 + 12);
    
    return [index, skip];
}
let formula = formulaGenerator();

let database = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', ',', '.', '/', '?', '|', '`', '~'
];

EncriptButton.addEventListener("click", () => {
    Encription(inputText.value);
})

const Encription = input => {
    let start = formula[0];
    let skip = formula[1];
    let inputWords = input.split(" ");
    let outputString = "";

    
    for (let i = 0; i < inputWords.length; i++) {
        
        for (let j = 0; j < inputWords[i].length; j++) {
            let newPosition = positionChecker((start + j * skip) + database.indexOf(inputWords[i][j]));
            outputString += database[newPosition];
        }
        outputString += " ";
    }
    outputString = database[Math.abs(start)] + "-" + database[skip] + outputString;
    start > 0 ? outputString = "x" + outputString:outputString = "c" + outputString;

    output.innerHTML = outputString;
}

DecriptButton.addEventListener("click", () => {
    Decription(inputText.value);
})

const Decription = inputRaw => {
    let start = database.indexOf(inputRaw[1]);
    inputRaw[0] == "c" ? start *= -1 : null;
    let skip = database.indexOf(inputRaw[3]);
    let outputString = "";
    let input = inputRaw.substring(4);
    let inputWords = input.split(" ");

    for (let i = 0; i < inputWords.length; i++) {
        for (let j = 0; j < inputWords[i].length; j++) {
            let newPositionRaw = (start + j * skip) - database.indexOf(inputWords[i][j]);
            if (newPositionRaw < 0) {
                while (newPositionRaw < 0) {
                    newPositionRaw += database.length;
                }
                // newPositionRaw += 1;
            }
            let newIndex = 0;

            for (let i = 0; i > -2; i++) {
                if (database.length * i >= newPositionRaw) {
                    newIndex = database.length * i - newPositionRaw;
                    break;
                }
            }
            outputString += database[newIndex];
        }
        outputString += " ";
    }
    output.innerHTML = outputString;
}

const positionChecker = input => {
    while (input >= database.length -1) {
        input -= database.length;
    }
    while ( input < 0) {
        input += database.length;
    }
    return input;
}

for (let i = 62; i < database.length; i++) {
    document.querySelector("#charsupport").innerHTML += `<span class="inline-block w-4">${database[i]}</span> `;
}
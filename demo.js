const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

/* CREATE BOX */

function createBoxes(container, text){

    container.innerHTML = "";

    for(let char of text){

        const box =
            document.createElement("div");

        box.className = "char-box";

        box.innerText = char;

        container.appendChild(box);
    }
}

/* BAD CHARACTER */

function buildBadCharTable(pattern){

    let table = {};

    for(let i = 0; i < pattern.length; i++){

        table[pattern[i]] = i;
    }

    return table;
}

/* RESET */

function resetBoxes(boxes){

    for(let box of boxes){

        box.className = "char-box";
    }
}

/* MAIN */

async function startSearch(){

    const text =
        document.getElementById("text").value;

    const pattern =
        document.getElementById("pattern").value;

    const textView =
        document.getElementById("textView");

    const patternView =
        document.getElementById("patternView");

    const status =
        document.getElementById("status");

    createBoxes(textView, text);
    createBoxes(patternView, pattern);

    const textBoxes =
        textView.children;

    const patternBoxes =
        patternView.children;

    const badChar =
        buildBadCharTable(pattern);

    let shift = 0;

    while(
        shift <= text.length - pattern.length
    ){

        patternView.style.marginLeft =
            `${shift * 82}px`;

        let j = pattern.length - 1;

        status.innerHTML =
            `🔍 Đang kiểm tra tại vị trí <b>${shift}</b>`;

        await sleep(900);

        while(
            j >= 0 &&
            pattern[j] === text[shift + j]
        ){

            textBoxes[shift + j].className =
                "char-box match";

            patternBoxes[j].className =
                "char-box match";

            status.innerHTML =
                `✅ Khớp ký tự <b>${pattern[j]}</b>`;

            await sleep(700);

            j--;
        }

        /* FOUND */

        if(j < 0){

            status.innerHTML =
                `🎉 TÌM THẤY MẪU tại vị trí <b>${shift}</b>`;

            return;
        }

        /* MISMATCH */

        textBoxes[shift + j].className =
            "char-box mismatch";

        patternBoxes[j].className =
            "char-box mismatch";

        await sleep(900);

        const badCharIndex =
            badChar[text[shift + j]];

        let move;

        if(badCharIndex !== undefined){

            move = Math.max(
                1,
                j - badCharIndex
            );

        }else{

            move = j + 1;
        }

        status.innerHTML =
            `❌ Sai ký tự → Dịch sang phải <b>${move}</b> bước`;

        await sleep(1200);

        resetBoxes(textBoxes);
        resetBoxes(patternBoxes);

        shift += move;
    }

    status.innerHTML =
        `🚫 KHÔNG TÌM THẤY MẪU`;
}
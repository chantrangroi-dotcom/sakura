/* =========================
   VARIABLES
========================= */

let steps = [];

let currentStep = 0;

let autoRunning = false;

/* =========================
   SLEEP
========================= */

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

/* =========================
   CREATE BOXES
========================= */

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

/* =========================
   BAD CHARACTER TABLE
========================= */

function buildBadCharTable(pattern){

    let table = {};

    for(let i = 0; i < pattern.length; i++){

        table[pattern[i]] = i;
    }

    return table;
}

/* =========================
   SAVE STEP
========================= */

function saveStep(
    shift,
    j,
    type,
    message
){

    steps.push({

        shift,
        j,
        type,
        message
    });
}

/* =========================
   PREPARE STEPS
========================= */

function prepareSteps(){

    steps = [];

    currentStep = 0;

    const text =
        document.getElementById("text").value;

    const pattern =
        document.getElementById("pattern").value;

    const badChar =
        buildBadCharTable(pattern);

    let shift = 0;

    while(
        shift <= text.length - pattern.length
    ){

        let j = pattern.length - 1;

        /* CHECK STEP */

        saveStep(
            shift,
            j,
            "check",
            `🔍 Kiểm tra tại vị trí ${shift}`
        );

        /* MATCH */

        while(
            j >= 0 &&
            pattern[j] === text[shift + j]
        ){

            saveStep(
                shift,
                j,
                "match",
                `✅ Khớp ký tự '${pattern[j]}'`
            );

            j--;
        }

        /* FOUND */

        if(j < 0){

            saveStep(
                shift,
                j,
                "found",
                `🎉 TÌM THẤY MẪU tại vị trí ${shift}`
            );

            return;
        }

        /* MISMATCH */

        saveStep(
            shift,
            j,
            "mismatch",
            `❌ Sai tại ký tự '${text[shift + j]}'`
        );

        const badCharIndex =
            badChar[text[shift + j]];

        let move;

        if(badCharIndex !== undefined){

            move =
                Math.max(
                    1,
                    j - badCharIndex
                );

        }else{

            move = j + 1;
        }

        /* MOVE */

        saveStep(
            shift,
            j,
            "move",
            `➡ Dịch sang phải ${move} bước`
        );

        shift += move;
    }

    saveStep(
        0,
        0,
        "notfound",
        `🚫 KHÔNG TÌM THẤY MẪU`
    );
}

/* =========================
   RENDER STEP
========================= */

function renderStep(){

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

    const step =
        steps[currentStep];

    /* MOVE PATTERN */

    patternView.style.marginLeft =
        `${step.shift * 90}px`;

    /* EFFECTS */

    if(step.type === "check"){

        textBoxes[
            step.shift + step.j
        ]?.classList.add("active");

        patternBoxes[
            step.j
        ]?.classList.add("active");
    }

    if(step.type === "match"){

        textBoxes[
            step.shift + step.j
        ]?.classList.add("match");

        patternBoxes[
            step.j
        ]?.classList.add("match");
    }

    if(step.type === "mismatch"){

        textBoxes[
            step.shift + step.j
        ]?.classList.add("mismatch");

        patternBoxes[
            step.j
        ]?.classList.add("mismatch");
    }

    if(step.type === "found"){

        for(let i = 0; i < pattern.length; i++){

            textBoxes[
                step.shift + i
            ]?.classList.add("match");
        }
    }

    /* STATUS */

    status.innerHTML =

        `
        🎬 <b>BƯỚC ${
            currentStep + 1
        } / ${steps.length}</b>

        <br><br>

        ${step.message}
        `;
}

/* =========================
   AUTO RUN
========================= */

async function startSearch(){

    prepareSteps();

    autoRunning = true;

    for(
        currentStep = 0;
        currentStep < steps.length;
        currentStep++
    ){

        if(!autoRunning){

            break;
        }

        renderStep();

        await sleep(1000);
    }
}

/* =========================
   NEXT STEP
========================= */

function nextStep(){

    autoRunning = false;

    if(steps.length === 0){

        prepareSteps();

        renderStep();

        return;
    }

    if(
        currentStep <
        steps.length - 1
    ){

        currentStep++;

        renderStep();
    }
}

/* =========================
   PREV STEP
========================= */

function prevStep(){

    autoRunning = false;

    if(
        currentStep > 0
    ){

        currentStep--;

        renderStep();
    }
}

/* =========================
   RESET
========================= */

function resetDemo(){

    autoRunning = false;

    steps = [];

    currentStep = 0;

    document.getElementById(
        "textView"
    ).innerHTML = "";

    document.getElementById(
        "patternView"
    ).innerHTML = "";

    document.getElementById(
        "status"
    ).innerHTML =
        "🤖 Demo đã reset";
}
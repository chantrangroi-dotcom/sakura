/* =========================
   VARIABLES
========================= */

let steps = [];

let currentStep = 0;

let autoRunning = false;

/* =========================
   HASH FUNCTION
========================= */

function getHash(str){

    let hash = 0;

    for(let i = 0; i < str.length; i++){

        hash += str.charCodeAt(i);
    }

    return hash;
}

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
   SAVE STEP
========================= */

function saveStep(
    shift,
    type,
    message,
    matchIndexes = []
){

    steps.push({

        shift,
        type,
        message,
        matchIndexes
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

    const patternHash =
        getHash(pattern);

    const m = pattern.length;

    for(
        let i = 0;
        i <= text.length - m;
        i++
    ){

        const window =
            text.substring(i, i + m);

        const windowHash =
            getHash(window);

        saveStep(
            i,
            "check",
            `🔍 So sánh hash: ${windowHash}`
        );

        if(windowHash === patternHash){

            let matched = true;

            let matchIndexes = [];

            for(let j = 0; j < m; j++){

                if(
                    text[i + j] === pattern[j]
                ){

                    matchIndexes.push(j);

                }else{

                    matched = false;

                    break;
                }
            }

            if(matched){

                saveStep(
                    i,
                    "found",
                    `🎉 TÌM THẤY tại vị trí ${i}`,
                    matchIndexes
                );

                return;
            }

            saveStep(
                i,
                "mismatch",
                `❌ Hash giống nhưng ký tự khác`
            );

        }else{

            saveStep(
                i,
                "move",
                `➡ Hash khác → dịch sang phải`
            );
        }
    }

    saveStep(
        0,
        "notfound",
        `🚫 KHÔNG TÌM THẤY`
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

    const textRow =
        document.getElementById("textRow");

    const patternRow =
        document.getElementById("patternRow");

    const status =
        document.getElementById("status");

    createBoxes(textRow, text);
    createBoxes(patternRow, pattern);

    const textBoxes =
        textRow.children;

    const patternBoxes =
        patternRow.children;

    const step =
        steps[currentStep];

    patternRow.style.marginLeft =
        `${step.shift * 58}px`;

    if(step.type === "check"){

        for(let i = 0; i < pattern.length; i++){

            textBoxes[
                step.shift + i
            ]?.classList.add("active");

            patternBoxes[
                i
            ]?.classList.add("active");
        }
    }

    if(step.type === "found"){

        for(let i = 0; i < pattern.length; i++){

            textBoxes[
                step.shift + i
            ]?.classList.add("match");

            patternBoxes[
                i
            ]?.classList.add("match");
        }
    }

    if(step.type === "mismatch"){

        for(let i = 0; i < pattern.length; i++){

            textBoxes[
                step.shift + i
            ]?.classList.add("mismatch");

            patternBoxes[
                i
            ]?.classList.add("mismatch");
        }
    }

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

async function startDemo(){

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

        await new Promise(
            resolve =>
            setTimeout(resolve, 1000)
        );
    }
}

/* =========================
   NEXT
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
   PREV
========================= */

function prevStep(){

    autoRunning = false;

    if(currentStep > 0){

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
        "textRow"
    ).innerHTML = "";

    document.getElementById(
        "patternRow"
    ).innerHTML = "";

    document.getElementById(
        "status"
    ).innerHTML =
        "🤖 Demo đã reset";
}
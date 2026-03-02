let factors = [];
let jobs = [];

function addFactor(){

    let input = document.getElementById("factorInput");
    let factor = input.value.trim();
    let error = document.getElementById("factorError");

    error.innerText = "";

    if(!factor) return;

    if(factors.includes(factor)){
        error.innerText = "Factor already added.";
        return;
    }

    factors.push(factor);

    updateFactorList();
    renderInputs();

    input.value = "";
}

function removeFactor(index){
    factors.splice(index,1);
    updateFactorList();
    renderInputs();
    updateMatrix();
}

function updateFactorList(){

    let list = document.getElementById("factorList");
    list.innerHTML = "";

    factors.forEach((f,i)=>{

        let li = document.createElement("li");

        li.innerHTML = `
    <span>${f}</span>
    <button class="remove-btn" onclick="removeFactor(${i})">✖</button>
`;

        list.appendChild(li);
    });
}

function renderInputs(){

    let div = document.getElementById("ratings");
    div.innerHTML = "";

    factors.forEach(f => {
        let input = document.createElement("input");
        input.placeholder = f + " (1-10)";
        input.id = f;
        input.type = "number";
        input.classList.add("job-input");
        input.min = 1;
        input.max = 10;
        input.classList.add("job-input");
        div.appendChild(input);
    });
}

function addJob(){

    let companyInput = document.getElementById("company");
    let company = companyInput.value.trim();
    let error = document.getElementById("ratingError");

    error.innerText = "";

    if(!company) return;

    let ratings = {};

    for(let f of factors){

        let value = Number(document.getElementById(f).value);

        if(value < 1 || value > 10 || isNaN(value)){
            error.innerText = "All ratings must be between 1 and 10.";
            return;
        }

        ratings[f] = value;
    }

    jobs.push({company, ratings});
    updateMatrix();

    companyInput.value = "";
    factors.forEach(f=>{
        document.getElementById(f).value="";
    });
}

function updateMatrix(){

    let table = document.getElementById("matrix");
    table.innerHTML = "";

    if(jobs.length === 0 || factors.length === 0) return;

    let header = "<tr><th>Job</th>";
    factors.forEach(f => header += "<th>"+f+"</th>");
    header += "</tr>";

    table.innerHTML += header;

    jobs.forEach((job, jobIndex) => {

        let row = `<tr><td>${job.company}</td>`;

        factors.forEach(factor => {

            row += `
                <td>
                    <input 
                        type="number" 
                        min="1" 
                        max="10"
                        value="${job.ratings[factor]}"
                        onchange="editCell(${jobIndex}, '${factor}', this.value)"
                        class="matrix-input"
                    />
                </td>
            `;
        });

        row += "</tr>";
        table.innerHTML += row;
    });
}

function evaluateJobs(){

    if(jobs.length === 0 || factors.length === 0){
    alert("Please add factors and at least one job before evaluating.");
    return;
}

    fetch("/analyze", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
    .then(res=>res.json())
    .then(data=>{

        let results = document.getElementById("results");
        results.innerHTML = "";

        data.results.forEach(job=>{
            let li = document.createElement("li");
            li.innerText = job.company + " → Score: " + job.score;
            results.appendChild(li);
        });

        let bestJob = data.best_job;

// Find top priority factor (first entered factor)
let topFactor = factors[0];

let summary = bestJob + " is the most suitable job based on your priorities. ";
summary += "It achieved the highest weighted score, especially performing well in your top priority factor: ";
summary += topFactor + ".";

document.getElementById("recommendation").innerText = summary;
});

      
}

function editCell(jobIndex, factor, value){

    value = Number(value);

    if(value < 1 || value > 10 || isNaN(value)){
        alert("Ratings must be between 1 and 10.");
        updateMatrix();
        return;
    }

    jobs[jobIndex].ratings[factor] = value;
}
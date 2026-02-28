let factors = [];
let jobs = [];

function addFactor(){

    let input = document.getElementById("factorInput");
    let factor = input.value.trim();

    if(!factor) return;

    factors.push(factor);

    updateFactorList();
    renderInputs();

    // Reset field
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
        input.min = 1;
        input.max = 10;
        div.appendChild(input);
    });
}

function addJob(){

    let companyInput = document.getElementById("company");
    let company = companyInput.value.trim();

    if(!company) return;

    let ratings = {};

    factors.forEach(f => {
        ratings[f] = Number(document.getElementById(f).value);
    });

    jobs.push({company, ratings});
    updateMatrix();

    // Reset fields
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

    fetch("http://127.0.0.1:5000/evaluate",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({jobs,factors})
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

        // FINAL RECOMMENDATION
        let bestJob = data.results[0];

        let explanation = document.getElementById("recommendation");

        explanation.innerText =
            bestJob.company +
            " is the best option because it performs strongly in your highest priority factors.";
    });
}

function editCell(jobIndex, factor, value){
    jobs[jobIndex].ratings[factor] = Number(value);
}
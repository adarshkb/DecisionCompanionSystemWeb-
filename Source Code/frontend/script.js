let jobs = [];

function addJob() {
    jobs.push({
        company: document.getElementById("company").value,
        salary: Number(document.getElementById("salary").value),
        growth: Number(document.getElementById("growth").value),
        work_life: Number(document.getElementById("worklife").value),
        location: Number(document.getElementById("location").value),
        stability: Number(document.getElementById("stability").value)
    });

    alert("Job Added!");
}

function evaluate() {

    let weights = {
        salary: Number(document.getElementById("wsalary").value),
        growth: Number(document.getElementById("wgrowth").value),
        work_life: Number(document.getElementById("wworklife").value),
        location: Number(document.getElementById("wlocation").value),
        stability: Number(document.getElementById("wstability").value)
    };

    fetch("http://127.0.0.1:5000/evaluate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({jobs, weights})
    })
    .then(res => res.json())
    .then(data => {
        let resultList = document.getElementById("results");
        resultList.innerHTML = "";
        data.forEach(job => {
            let li = document.createElement("li");
            li.innerText = job.company + " - Score: " + job.score;
            resultList.appendChild(li);
        });
    });
}
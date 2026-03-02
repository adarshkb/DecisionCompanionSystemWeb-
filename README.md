# Decision Companion System – Job Offer Evaluator

## Understanding of the Problem

Upon reading and analyzing the task, and even asking to chatgpt and various ai tools I received many Decision Companion Systems that can be made. Then I thought of some problems that I face currently. Or some problems that I expect some Decision Companion Systems could have existed.

Choosing between multiple job offers is a complex real-world decision involving multiple competing criteria such as salary, stability, location, growth opportunities, work-life balance etc.
This is such a kind of problem students or young professionals face during their carrer starting phase. Which releates to me a lot now rather than any other.
Different individuals prioritize these factors differently.

The goal of my system is to:

Enable users to define what matters to them.
Allow comparison of multiple job options. 
Convert subjective preferences into structured decisions.  
Recommend the most suitable job based on personal priorities.  

This system acts as a Decision Support System (DSS) that helps users make rational and transparent decisions in a glance.


## Assumptions Made

- Users can reasonably rate job attributes on a scale of 1–10  
- Earlier-entered factors indicate higher priority  
- All ratings are comparable across jobs  
- User priorities are consistent during evaluation  
- Decision-making can be modeled using weighted scoring  


## Why the Solution Was Structured This Way

Instead of using AI-based predictions, the system uses a deterministic approach.

We structured the system using:

- User-defined decision factors  
- Priority-based automatic weighting  
- Weighted scoring model  

This ensures:

- Transparency  
- Interpretability  
- Consistency  

The architecture separates:

Frontend → Input & Visualization  
Backend → Decision Computation  

---

## Design Decisions & Trade-offs

### Decision:
Use priority order instead of asking for weights.

**Reason:**  
Users often struggle to assign numerical importance. Ordering is simpler and intuitive.
Moreover it reduces the complexity of the system. Again i made an assumption that any user will get the most priority factor fisrt to his/her mind. In case any rearrangements can also be made upon the priority

**Trade-off:**  
Less granular control than manual weight entry.



### Decision:
Use a 1–10 scale.

**Reason:**  
Easy to understand and sufficiently expressive.
Different users have their rating of various factors differed. by giving a vast 10 rating the user can also relate different factors upon their needs.(For eg the location and nearby accomodation facilities can be co releated and could give ratings.)

**Trade-off:**  
Does not capture extreme modulation.

---

### Decision:
Editable matrix.

**Reason:**  
Allows post-entry refinement.


## Edge Cases Considered

- Duplicate decision while entering factors prevented.
- Ratings outside 1–10 rejected  
- Matrix edits validated.  
- Empty evaluation blocked. 
- Missing inputs handled.  

For all these respective error messages will be given indicating
---

## How to Run the Project
## Deployed
open the link : https://decisioncompanionsystemweb.onrender.com/

This will redirect to the web app created. I created a new repository to deploy my website. All the contents used to create the web app is same as in the submitted repository. I am also including the repository which i have used for deploying my website. I have used "Render (https://render.com/)" for deploying this. A new repository is made only to formulate or to structure the way in which "Render" demands the files to be. And all the code contents remains the same.

newly made repository link : https://github.com/adarshkb/DecisionCompanionSystemWeb-

## Typical File Access Method

git clone https://github.com/adarshkb/Decision-Companion-System
cd Decision-Companion-System

pip install flask flask-cors
 
### Backend

cd backend
python app.py

### Frontend

cd frontend
index.html

### How to use the system

## Step 1:

Enter the factors that matter to you.

Examples:

Salary
Stability
Work-life balance
Location
Growth
Etc..

Remember the Most priority one should be netered first.


## Step 2:
Add Job Details

For each job:
Enter:
Company Name
Ratings (1–10) for each factor

Rating Guide:
1 - Very Poor
5 - Average
10 - Excellent


## Step 3 
Review Decision Matrix

You will see a comparison table.

You may edit values directly in the matrix if needed.

## Step 4 
Evaluate

System will:

✔ Rank jobs
✔ Show scores
✔ Recommend the best job
✔ Explain why

### How Decision is Made?

The system uses:
*Priority-based weighting
*User ratings
*Weighted scoring algorithm
*Top priority factors influence results more.

### What would I improve with more time.

I would make the system to make decisions for multiple problems.
eventually making it a Decision Companion System for almost every problems we see.
even now we can check for different problems and its solutions. But we cannot expect that the output is right or not. The Mathematical equations and algorithms are purely based for Job Offer Evaluator. I might find an algorithm aswell as the equations that satisfies for all such problems will be formulated.

I would add a Dynamic Factor System.
Factors no longer hold permanent weight or priority.
They respond to:
Time
Environment
Stakeholders
Consequences

Nothing hold a permanent leaveage on one another. Every factors do not need the dependency of one another. Priority of the system could be changed at any moment and results reflect instantly.

## This system helps users logically compare multiple job offers using priority-based decision scoring.

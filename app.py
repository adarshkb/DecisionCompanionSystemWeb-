from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Home Page
@app.route("/")
def home():
    return render_template("index.html")


# API Route (your decision logic)
@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json
    jobs = data["jobs"]
    factors = data["factors"]

    weights = {}

    # Auto-generate weights
    total = len(factors)
    for i, factor in enumerate(factors):
        weights[factor] = total - i

    results = []

    for job in jobs:
        score = 0
        for factor in factors:
            score += job["ratings"][factor] * weights[factor]

        results.append({
            "company": job["company"],
            "score": score
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    best_job = results[0]["company"]

    return jsonify({
        "weights": weights,
        "results": results,
        "best_job": best_job
    })


if __name__ == "__main__":
    app.run(debug=True)
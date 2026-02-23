from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    
    jobs = data['jobs']
    weights = data['weights']
    
    results = []

    for job in jobs:
        score = (
            job['salary'] * weights['salary'] +
            job['growth'] * weights['growth'] +
            job['work_life'] * weights['work_life'] +
            job['location'] * weights['location'] +
            job['stability'] * weights['stability']
        )
        results.append({
            "company": job['company'],
            "score": score
        })

    results.sort(key=lambda x: x['score'], reverse=True)

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
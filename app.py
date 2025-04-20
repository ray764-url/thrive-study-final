from flask import Flask, request, jsonify
from predictor import predict_exam_score, suggest_improvements

app = Flask(__name__)
    
@app.route('/predict', methods=['POST'])
def predict():
    try:
        student_data = request.json
        desired_score = float(student_data.pop('desired_score', 90)) if student_data else 90
        predicted_score = predict_exam_score(student_data)
        suggestions = suggest_improvements(student_data, predicted_score, desired_score)
        return jsonify({
            'predicted_score': round(float(predicted_score), 2),
            'desired_score': desired_score,
            'score_gap': desired_score - predicted_score,
            'suggestions': suggestions
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
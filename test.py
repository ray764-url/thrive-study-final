
import requests
import json

# Sample Test Case 1 - Student needing moderate improvement
test_1 = {
    "age": 18,
    "gender": "Male",
    "study_hours_per_day": 2.5,
    "social_media_hours": 3.5,
    "netflix_hours": 2.0,
    "part_time_job": "No",
    "attendance_percentage": 80,
    "sleep_hours": 6.5,
    "diet_quality": "Fair",
    "exercise_frequency": 2,
    "parental_education_level": "Bachelor",
    "internet_quality": "Good",
    "mental_health_rating": 6,
    "extracurricular_participation": "Yes",
    "desired_score": 85  # Explicit desired score
}

# Sample Test Case 2 - High achiever
test_2 = {
    "age": 19,
    "gender": "Female",
    "study_hours_per_day": 4.0,
    "social_media_hours": 1.0,
    "netflix_hours": 0.5,
    "part_time_job": "No",
    "attendance_percentage": 95,
    "sleep_hours": 8.0,
    "diet_quality": "Good",
    "exercise_frequency": 4,
    "parental_education_level": "Master",
    "internet_quality": "Good",
    "mental_health_rating": 8,
    "extracurricular_participation": "Yes",
    "desired_score": 90  # Already meeting goal
}

# Sample Test Case 3 - Needs significant improvement
test_3 = {
    "age": 20,
    "gender": "Other",
    "study_hours_per_day": 1.0,
    "social_media_hours": 5.0,
    "netflix_hours": 3.0,
    "part_time_job": "Yes",
    "attendance_percentage": 65,
    "sleep_hours": 5.0,
    "diet_quality": "Poor",
    "exercise_frequency": 0,
    "parental_education_level": "High School",
    "internet_quality": "Poor",
    "mental_health_rating": 3,
    "extracurricular_participation": "No",
    "desired_score": 75  # Ambitious goal
}

def run_test(test_case):
    print(f"\nTesting with desired_score = {test_case['desired_score']}")
    response = requests.post('http://localhost:5000/predict', json=test_case)
    result = response.json()
    print(json.dumps(result, indent=2))
    return result
results = []
results.append(run_test(test_1))
results.append(run_test(test_2))
results.append(run_test(test_3))
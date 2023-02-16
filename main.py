import os
import shutil
from analyze import *
from flask import Flask, jsonify, request, render_template
 
app = Flask(__name__)
 
# Define the list of metrics to be calculated
METRICS = ["Cyclomatic complexity", "Maintainability index", "Fan-in and fan-out",
           "Nesting depth", "Number of methods", "Lines of code"]
 
# Define the directory to store the uploaded zip archives
UPLOAD_DIRECTORY = "uploads"
 
# Define the directory to store the temporary extracted code files
EXTRACT_DIRECTORY = "extracts"

 
def calculate_metrics(directory):
    """Calculates various metrics for the code files in the given directory"""
 
    # Implement the code analysis logic here using the METRICS list
    # Use the directory path to access the code files and analyze them
    # Return the metrics as a dictionary
 
    metrics = {"Cyclomatic complexity": 0, "Maintainability index": 0,
               "Fan-in and fan-out": 0, "Nesting depth": 0,
               "Number of methods": 0, "Lines of code": 0}
 
    return metrics
 
 
def extract_zip(file_path, extract_directory):
    """Extracts a zip file to the given directory"""
 
    # Extract the zip file to the extract_directory
    shutil.unpack_archive(file_path, extract_directory)
 
 
def cleanup_directory(directory):
    """Removes all files and subdirectories in the given directory"""
 
    # Remove all files and subdirectories in the directory
    for root, dirs, files in os.walk(directory):
        for file in files:
            os.remove(os.path.join(root, file))
        for dir in dirs:
            shutil.rmtree(os.path.join(root, dir))
 
 
@app.route("/analyze", methods=["POST"])
def analyze():
    """Analyzes the code in the uploaded zip archive"""
 
    # Get the uploaded file from the request
    file = request.files.get("file")
 
    # Save the uploaded file to the uploads directory
    file.save(os.path.join(UPLOAD_DIRECTORY, file.filename))
 
    # Extract the zip archive to the extracts directory
    extract_zip(os.path.join(UPLOAD_DIRECTORY, file.filename), EXTRACT_DIRECTORY)
 
    # Calculate the metrics for the extracted code files
    metrics = calculate_metrics(EXTRACT_DIRECTORY)
 
    # Clean up the extracts directory
    cleanup_directory(EXTRACT_DIRECTORY)
 
    # Remove the uploaded zip archive
    os.remove(os.path.join(UPLOAD_DIRECTORY, file.filename))
 
    # Return the metrics as JSON
    return jsonify(metrics)
 
@app.route('/')
def index():
    title = 'Code analyzing platform'
    return render_template('index.html', title=title)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
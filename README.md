# OnlineCodeAnalyzer
 
OnlineCodeAnalyzer is a web application for analyzing Python code. It provides a simple user interface for uploading and analyzing Python packages, displaying metrics such as lines of code, cyclomatic complexity, fan-in and fan-out, nesting depth, and number of methods.
 
## How to use
 
1. Clone the repository using `git clone https://github.com/ksverchkov/OnlineCodeAnalyzer.git`.
2. Navigate to the repository folder using `cd OnlineCodeAnalyzer`.
3. Build the Docker image using `docker build -t online-code-analyzer .`.
4. Run the Docker container using `docker run -p 5000:5000 online-code-analyzer`.
5. Open your web browser and go to `http://localhost:5000`.
6. Click on the "Select a code package to analyze" button and select the Python package you want to analyze.
7. Click the "Analyze" button and wait for the results to appear.
 
## How to contribute
 
1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine using `git clone https://github.com/<your-username>/OnlineCodeAnalyzer.git`.
3. Create a new branch for your changes using `git checkout -b my-branch`.
4. Make your changes to the code.
5. Commit your changes using `git commit -m "Add new feature"`.
6. Push your changes to your forked repository using `git push origin my-branch`.
7. Create a pull request on the original repository.
 
## License
 
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Install using HELM (experimental)

[Helm](helm/README.md)
 
## Screenshots

![image](https://github.com/ksverchkov/OnlineCodeAnalyzer/assets/107706691/a41cb110-0c8c-48c7-9d38-867a7679dcf4)
![image](https://github.com/ksverchkov/OnlineCodeAnalyzer/assets/107706691/796c8ff0-5e1d-44f8-83ae-3295272f3411)
![image](https://github.com/ksverchkov/OnlineCodeAnalyzer/assets/107706691/faa93f32-876c-49a4-a392-619ea587b609)

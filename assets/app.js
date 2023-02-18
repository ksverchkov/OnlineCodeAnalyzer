function analyze() {
    let fileInput = document.getElementById('file');
    let file = fileInput.files[0];

    let formData = new FormData();
    formData.append('file', file);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://onlinecodeanalyzer-production.up.railway.app/analyze?timestamp='+(+new Date).toString(36));
    xhr.onload = function() {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let resultDiv = document.getElementById('result_res');
            resultDiv.innerHTML = '';
            for (let r in response){
                let resp = response[r];
                if (resp.error){
                    console.log('Error');
                }else{
                    let resultDivChild = document.createElement('div');
                    resultDivChild.classList.add('result-item');
                    let metrics_results = {};
                    if (resp.metrics["Cyclomatic complexity"] > 15){
                        metrics_results["Cyclomatic complexity"] = 'good';
                    }else{
                        metrics_results["Cyclomatic complexity"] = 'bad';
                    }
                    if (resp.metrics["Fan-in and fan-out"]["in"] > 30){
                        metrics_results["Fan-in"] = 'bad';
                    }else{
                        metrics_results["Fan-in"] = 'good';
                    }
                    if (resp.metrics["Fan-in and fan-out"]["out"] > 30){
                        metrics_results["Fan-out"] = 'bad';
                    }else{
                        metrics_results["Fan-out"] = 'good';
                    }
                    if (resp.metrics["Lines of code"] > resp.metrics["Fan-in and fan-out"]["out"] * 15){
                        metrics_results["Lines of code"] = 'bad';
                    }else{
                        metrics_results["Lines of code"] = 'good';
                    }
                    if (resp.metrics["Maintainability index"] < 20){
                        metrics_results["Maintainability index"] = 'bad';
                    }else{
                        if (resp.metrics["Maintainability index"] > 98 && resp.metrics["Maintainability index"] < 103){
                            metrics_results["Maintainability index"] = 'good';
                        }else{
                            metrics_results["Maintainability index"] = 'average';
                        }
                    }
                    if (resp.metrics["Nesting depth"] > resp.metrics["Maintainability index"]){
                        metrics_results["Nesting depth"] = 'bad';
                    }else{
                        metrics_results["Nesting depth"] = 'good';
                    }
                    if (resp.metrics["Number of methods"] > resp.metrics["Fan-in and fan-out"]["in"] * 3){
                        metrics_results["Number of methods"] = 'bad';
                    }else{
                        metrics_results["Number of methods"] = 'good';
                    }
                    resultDivChild.innerHTML = '<div class="result-item-name">' + resp.filename + '</div>' +
                                            '<div class="result-item-metrics">' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Cyclomatic complexity</div>' +
                                                        '<div class="result-item-metrics-item-value ' + metrics_results["Cyclomatic complexity"] + '">' + resp.metrics["Cyclomatic complexity"] + '</div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Fan-in</div>' +
                                                        '<div class="result-item-metrics-item-value ' + metrics_results["Fan-in"] + '">' + resp.metrics["Fan-in and fan-out"]["in"] + '</div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Fan-out</div>' +
                                                        '<div class="result-item-metrics-item-value ' + metrics_results["Fan-out"] + '">' + resp.metrics["Fan-in and fan-out"]["out"] + '</div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Lines of code</div>' +
                                                        '<div class="result-item-metrics-item-value ' + metrics_results["Lines of code"] + '">' + resp.metrics["Lines of code"] + '</div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Maintainability index</div>' +
                                                        '<div class="result-item-metrics-item-value ' + metrics_results["Maintainability index"] + '">' + resp.metrics["Maintainability index"] + '</div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Nesting depth</div>' +
                                                        '<div class="result-item-metrics-item-value ' + metrics_results["Nesting depth"] + '">' + resp.metrics["Nesting depth"] + '</div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Number of methods</div>' +
                                                        '<div class="result-item-metrics-item-value ' + metrics_results["Number of methods"] + '">' + resp.metrics["Number of methods"] + '</div>' +
                                                    '</div>' +
                                            '</div>';
                    resultDiv.append(resultDivChild);
                }
            }
    } else {
        alert('An error occurred!');
    }
};
xhr.send(formData);
}

const nextUpload = function(){
    
}
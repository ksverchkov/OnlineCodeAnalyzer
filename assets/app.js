function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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
            let resultDiv = document.querySelector('.result_res');
            resultDiv.innerHTML = '';
            for (let r in response){
                let resp = response[r];
                if (resp.error){
                    console.log('Error');
                }else{
                    let documentID = 'icon_' + String(makeid(10));
                    let resultDivChild = document.createElement('div');
                    resultDivChild.classList.add('result-item');
                    resultDivChild.classList.add(documentID);
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
                    if (resp.metrics["Lines of code"] < resp.metrics["Fan-in and fan-out"]["out"]){
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
                            metrics_results["Maintainability index"] = 'normal';
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
                    let percent = 0;
                    let good = 0;
                    let bad = 0;
                    let all = 0;
                    for (let k in metrics_results){
                        let mk = metrics_results[k];
                        all += 1;
                        if (mk == 'good'){
                            good += 1;
                        }
                        if (mk == 'average'){
                            good += 0.5;
                        }
                        if (mk == 'bad'){
                            bad += 1;
                        }
                    }
                    percent = (Math.round(good / all * 100));
                    resultDivChild.innerHTML = '<div class="result-item-name">' + resp.filename + '<div class="controls"><stat class="status">' + String(percent) + '</stat> <div class="open" onclick="openStat(' + "'" + documentID + "'" + '"><img src="/assets/icon-triangle-open.svg" class="icon_' + documentID + '" alt="Open triangle icon"/></div></div></div>' +
                                            '<div class="result-item-metrics m_' + documentID + '">' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Cyclomatic complexity: ' + resp.metrics["Cyclomatic complexity"] + '</div>' +
                                                        '<div class="result-item-metrics-item-value"><constat class="' + metrics_results["Cyclomatic complexity"] + '">' + metrics_results["Cyclomatic complexity"] + '</constat></div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Fan-in: ' + resp.metrics["Fan-in and fan-out"]["in"] + '</div>' +
                                                        '<div class="result-item-metrics-item-value"><constat class="' + metrics_results["Fan-in"] + '">' + metrics_results["Fan-in"] + '</constat></div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Fan-out: ' + resp.metrics["Fan-in and fan-out"]["out"] + '</div>' +
                                                        '<div class="result-item-metrics-item-value"><constat class="' + metrics_results["Fan-out"] + '">' + metrics_results["Fan-out"] + '</constat></div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Lines of code: ' + resp.metrics["Lines of code"] + '</div>' +
                                                        '<div class="result-item-metrics-item-value"><constat class="' + metrics_results["Lines of code"] + '">' + metrics_results["Lines of code"] + '</constat></div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Maintainability index: ' + resp.metrics["Maintainability index"] + '</div>' +
                                                        '<div class="result-item-metrics-item-value"><constat class="' + metrics_results["Maintainability index"] + '">' + metrics_results["Maintainability index"] + '</constat></div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Nesting depth: ' + resp.metrics["Nesting depth"] + '</div>' +
                                                        '<div class="result-item-metrics-item-value"><constat class="' + metrics_results["Nesting depth"] + '">' + metrics_results["Nesting depth"] + '</constat></div>' +
                                                    '</div>' +
                                                    '<div class="result-item-metrics-item">' +
                                                        '<div class="result-item-metrics-item-name">Number of methods: ' + resp.metrics["Number of methods"] + '</div>' +
                                                        '<div class="result-item-metrics-item-value"><constat class="' + metrics_results["Number of methods"] + '">' + metrics_results["Number of methods"] + '</constat></div>' +
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
    document.querySelector('.button-container').remove();
    let blocks = document.querySelector('.blocks');
    blocks.classList.add('selection-form');
    blocks.classList.remove('blocks');
    blocks.innerHTML = `<form>
        <label for="file"><img src="/assets/archive-icon.svg" alt="Archive Icon"> Select a file</label>
        <input type="file" id="file" name="file">
        <button type="button" onclick="analyze()">Continue</button>
    </form>`;
    document.querySelector('.h1').innerHTML='Select your project archive';
    let documentResult = document.createElement('div');
    documentResult.innerHTML = '<div class="h1 centered max-width">Results of the analyzis</div>';
    documentResult.classList.add('results');
    let documentResultRES = document.createElement('div');
    documentResultRES.classList.add('result_res');
    documentResult.append(documentResultRES);
    document.body.append(documentResult);
    const input = document.querySelector("input")
    input.onchange = (e) => {
        const [file] = e.target.files
        document.querySelector('label').innerHTML = '<img src="/assets/archive-icon.svg" alt="Archive Icon"> '+(file.name);
    }
}
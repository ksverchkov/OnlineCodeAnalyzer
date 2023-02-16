import radon.metrics as radon
import fnmatch
import os

def calculate_metrics(directory):
    allMetrics = []
    pythonfiles = []
    for root, dirnames, filenames in os.walk(directory):
        for filename in fnmatch.filter(filenames, '*.py'):
            pythonfiles.append(os.path.join(root, filename))
    for pfile in pythonfiles:
        try:
            currentMetric = {"filename" : pfile, "metrics" : calculate_metrics(pfile)}
            pass
        except Exception as e:
            currentMetric = {"filename" : pfile, "metrics" : {}, "error": str(e)}
            pass
    return allMetrics

def calculate_metrics(filename):
        # calculate LOC
    with open(filename, 'r') as f:
        loc = len(f.readlines())
    
    # calculate Cyclomatic Complexity
    cc = radon.cc_visit(filename)
    
    # calculate Maintainability Index
    mi = radon.mi_visit(filename)
    
    # calculate Fan-in and Fan-out
    fan_in = radon.raw_analysis(filename).fan_in
    fan_out = radon.raw_analysis(filename).fan_out
    
    # calculate Nesting Depth
    nd = radon.raw_analysis(filename).max_nesting_depth
    
    # calculate Number of Methods
    nom = radon.raw_analysis(filename).nb_methods

    metrics = {
        "Cyclomatic complexity": cc,
        "Maintainability index": mi,
        "Fan-in and fan-out": {
            "in" : fan_in,
            "out" : fan_out
        },
        "Nesting depth": nd,
        "Number of methods": nom,
        "Lines of code": loc
    }
 
    return metrics
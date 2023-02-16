import radon.metrics as radon
import os, fnmatch


def find_files(directory, pattern):
    for root, dirs, files in os.walk(directory):
        for basename in files:
            if fnmatch.fnmatch(basename, pattern):
                filename = os.path.join(root, basename)
                yield filename

def calculate_metrics(directory):
    allMetrics = []
    for pfile in find_files(directory, '*.py'):
        print(pfile)
        try:
            currentMetric = {"filename" : pfile, "metrics" : calculate_metric(pfile)}
            allMetrics.append(currentMetric)
            pass
        except Exception as e:
            currentMetric = {"filename" : pfile, "metrics" : {}, "error": str(e)}
            allMetrics.append(currentMetric)
            pass
    return allMetrics

def calculate_metric(filename):
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
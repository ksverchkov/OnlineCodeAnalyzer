import os, fnmatch
import math
import ast
import re


def find_files(directory, pattern):
    for root, dirs, files in os.walk(directory):
        for basename in files:
            if fnmatch.fnmatch(basename, pattern):
                filename = os.path.join(root, basename)
                yield filename

# Calculating metrics functions

def calculate_cc(filepath):
    with open(filepath, 'r') as f:
        code = f.read()
    # count the number of if, for, while, switch statements
    num_branches = code.count('if') + code.count('for') + code.count('while') + code.count('switch')
    # calculate the number of nodes and edges
    num_nodes = num_branches + 1
    num_edges = num_branches * 2
    # calculate the number of connected components (assume 1)
    num_components = 1
    # calculate Cyclomatic Complexity
    cc = num_edges - num_nodes + 2 * num_components
    return cc
 
def calculate_mi(filepath):
    with open(filepath, 'r') as f:
        code = f.read()
    # calculate the Halstead Volume
    unique_operators = len(set(re.findall(r'[+\-*/%&|^~<>=!]+', code)))
    unique_operands = len(set(re.findall(r'\b\w+\b', code)))
    total_operators = len(re.findall(r'[+\-*/%&|^~<>=!]+', code))
    total_operands = len(re.findall(r'\b\w+\b', code))
    volume = (total_operators + total_operands) * math.log2(unique_operators + unique_operands)
    # calculate the Maintainability Index
    cc = calculate_cc(filepath)
    loc = len(code.split('\n'))
    mi = 171 - 5.2 * math.log(volume) - 0.23 * cc - 16.2 * math.log(loc)
    return mi

def calculate_fan_in_out(filepath):
    with open(filepath, 'r') as f:
        code = f.read()
    tree = ast.parse(code)
    fan_in = 0
    fan_out = 0
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            fan_in += len(node.calls)
            fan_out += len([x for x in ast.walk(node) if isinstance(x, ast.Call)])
    return {"fan_in": fan_in, "fan_out": fan_out}

def calculate_nesting_depth(filepath):
    with open(filepath, 'r') as f:
        code = f.read()
    tree = ast.parse(code)
    max_depth = 0
    current_depth = 0
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            current_depth = 0
            for child in ast.walk(node):
                if isinstance(child, (ast.FunctionDef, ast.ClassDef)):
                    current_depth += 1
                    max_depth = max(max_depth, current_depth)
        elif isinstance(node, ast.ClassDef):
            current_depth = 1
            max_depth = max(max_depth, current_depth)
    return max_depth

def calculate_number_of_methods(filepath):
    with open(filepath, 'r') as f:
        code = f.read()
    tree = ast.parse(code)
    nb_methods = 0   
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            nb_methods += 1
        elif isinstance(node, ast.ClassDef):
            nb_methods += len([x for x in node.body if isinstance(x, ast.FunctionDef)])
    return nb_methods

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
    cc = calculate_cc(filename)
    
    # calculate Maintainability Index
    mi = calculate_mi(filename)
    
    # calculate Fan-in and Fan-out
    fan_in = calculate_fan_in_out(filename).fan_in
    fan_out = calculate_fan_in_out(filename).fan_out
    
    # calculate Nesting Depth
    nd = calculate_nesting_depth(filename)
    
    # calculate Number of Methods
    nom = calculate_number_of_methods(filename)

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
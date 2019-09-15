# -*- coding: utf-8 -*-
"""
Created on Fri Sep 13 03:02:56 2019

@author: jquin
"""

import urllib.request
import time
from bs4 import BeautifulSoup

def query(url, str_pattern, collection1, collection2, collection3, opt):
    page = urllib.request.urlopen(url)
    soup = BeautifulSoup(page)
    links = soup.find_all("a")
    
    for link in links:
        current_link = link.get("href")
        if current_link is not None and str_pattern in current_link:
            if opt == "links":
                collection1.add("https://www.drugbank.ca" + current_link)
            elif opt == "strings_links":
                collection1.add(link.string)
                collection2.add("https://www.drugbank.ca" + current_link)
            elif opt == "strings_links_names":
                collection1.add(link.string)
                collection2.add("https://www.drugbank.ca" + current_link)
                collection3.add(soup.h1.string)                
            else:
                return
            
# Step 1: Find links to all results pages
url_base = 'https://www.drugbank.ca/unearth/q?c=_score&d=down&query=alzheimer%27s&searcher=drugs'

# Initialize set to store results urls
base_url_set = {url_base}
sample = set()
query(url_base, "/unearth/q?c=", base_url_set, sample, sample,"links")

# Step 2: Find drug names associated with Alzheimer's
# Initialize sets that stores all drug names + their urls
drug_name_set = set()
drug_link_set = set()

# Loop through all results urls
for url in base_url_set:
    query(url, "/drugs/", drug_name_set, drug_link_set,sample, "strings_links")

# Step 3: Find CHEMBL data for listed drugs
# Initialize lists to store CHEMBL names + links
chembl_names = set()
chembl_links = set()
common_names = set()

# Dictionary to include both lists
chembl_dictionary = {"Name": chembl_names, "Links": chembl_links}

for url in drug_link_set:
    query(url, "/chembldb", chembl_names, chembl_links, common_names, "strings_links_names")
    
for i in chembl_names:
    print(i)
    
for i in chembl_links:
    print(i)

for i in common_names:
    print(i)
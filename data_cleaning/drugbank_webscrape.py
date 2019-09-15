# -*- coding: utf-8 -*-
"""
Created on Thu Sep 12 21:22:24 2019

@author: jquin
"""

import requests
import urllib.request
import time
from bs4 import BeautifulSoup
from pymed import PubMed
import pandas as pd

    
# Step 1: Find links to all results pages
url_base = 'https://www.drugbank.ca/unearth/q?c=_score&d=down&query=alzheimer%27s&searcher=drugs'
page_base = urllib.request.urlopen(url_base)
soup_base = BeautifulSoup(page_base)

all_links = soup_base.find_all("a")

# Set stores all of our results pages
base_url_set = {url_base}

# Add to set all links (no duplicates)
for link in all_links:      
    current_link = link.get("href")
    
    if current_link is not None and "/unearth/q?c=" in current_link:
        base_url_set.add("https://www.drugbank.ca" + current_link)
        
# Initialize another set that stores all drug names (no duplicates)
drug_link_set = set()
drug_name_set = set()
    
# Loop through results urls and add all drug links to drug_link_set
for url in base_url_set:
    page = urllib.request.urlopen(url)
    soup = BeautifulSoup(page)
    drug_links = soup.find_all("a")
    
    for drug_link in drug_links:      
        current_link = drug_link.get("href")
        if current_link is not None and "/drugs/" in current_link:
            drug_name_set.add(drug_link.string)
            drug_link_set.add("https://www.drugbank.ca" + current_link)
            
# Initialize lists to store CHEMBL names + links
common_names = []
chembl_names = []
chembl_links = []
iupac_names = []

# Now we loop through the actual drug urls
for link in drug_link_set:
    page_drug = urllib.request.urlopen(link)
    soup_drug = BeautifulSoup(page_drug)
    drug_names = soup_drug.find_all("a")
    common_name = soup_drug.h1.string
    
    for d in drug_names:      
        current_link = d.get("href")
       
        if current_link is not None and "/chembldb/" in current_link:
            common_names.append(common_name)
            chembl_links.append(current_link)
            chembl_names.append(d.string)
            
for i in chembl_names:
    print(i)
    
for j in chembl_links:
    print(j)

for k in common_names:
    print(k)
    
pubmed = PubMed(tool="PubMedSearcher", email="myemail@ccc.com")

# Final drug lists: only those found to have relevant publications on PubMed make the final dataset
# so final drugs must have: chemblID + pubmed results
final_drug_common_names = set()
final_drug_chembl_names = set()
final_drug_chembl_links = set()

#test1 = []
#test2 = []

# Loop through drug names
for i, name in enumerate(common_names, 0):
    # Create a GraphQL query in plain text
    query = '\"alzheimers\"' + "+" + '\"' + name + '\"'
    
    # Execute the query against the API
    results = pubmed.query(query, max_results=100)
    
    print(name)
    print('')
    
    # Loop through article results
    for article in results:
#        test1.append(article.title)  
#        print(article.title)
#        test2.append(article.abstract)
        if article.title is not None and article.abstract is not None:
            if "alzheimer's" in article.abstract or "Alzheimer's" in article.abstract and name in article.abstract:
                final_drug_common_names.add(name)
#                print(name)
                final_drug_chembl_names.add(chembl_names[i])
                print(chembl_names[i])
                final_drug_chembl_links.add(chembl_links[i])
                print(chembl_links[i])
    print('')
    time.sleep(1)

for i in final_drug_common_names:
    print(i)
    
for i in final_drug_chembl_names:
    print(i)

#test3 = {"name": test1, "abstract": test2}
#df = pd.DataFrame.from_dict(test3)
#export_csv = df.to_csv (r'C:\Users\jquin\Desktop\export_dataframe.csv', index = None, header=True)

final_drug_list = {"common_name": final_drug_common_names, "chembl_name": final_drug_chembl_names, "chembl_link": final_drug_chembl_links}

# Generate Pandas DataFrame from list of dictionaries
df = pd.DataFrame.from_dict(final_drug_list)
export_csv = df.to_csv (r'C:\Users\jquin\Desktop\export_dataframe.csv', index = None, header=True)
     




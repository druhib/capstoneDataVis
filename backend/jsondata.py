import pandas as pd

file = "data/eaglei_outages_2015.csv"

df1 = pd.read_csv(file, dtype={'fips_code':str})
print(df1.head())

df2 = df1[df1['state'] == 'Texas']
print(df1.head())




df2.to_json("eaglei_outages_2015_Texas.json", orient = 'records' )
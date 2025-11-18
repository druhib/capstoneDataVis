import pandas as pd

file = "data/eaglei_outages_2015.csv"
file2 = "eaglei_outages_total_people_affected_per_county_2015_Texas.csv"

# df1 = pd.read_csv(file, dtype={'fips_code':str})
# # print(df1.head())

# df2 = df1[df1['state'] == 'Texas']
# print(df2.head())

# num_rows = len(df2)
# print(num_rows)
# df2 = df2.groupby(['fips_code', 'county', 'state'])['sum'].sum(min_count=1)

# num_rows = len(df2)
# print(num_rows)
# print(df2.head())

# df2.to_csv('eaglei_outages_total_people_affected_per_county_2015_Texas.csv')

df2 = pd.read_csv(file2)

df2.to_json("eaglei_outages_total_people_affected_per_county_2015_Texas.json", orient = 'records' )
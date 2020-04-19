import pandas
import numpy as np
import json

js = {}

storms = pandas.read_excel('storms.xlsx')

for x in range(0,21):
	loc = str(storms['loc'][x])+" "+str(storms['locd'][x])
	js[loc]=["31800.0 Municipal Drains"]

js['248100 West Nile Virus']=['24800 West Nile Virus']

roads = pandas.read_excel('roads.xlsx')

curLoc = ""

for x in range(0,44):
	if(pandas.isnull(roads['loc'][x])==False):
		curLoc = str(roads['loc'][x])+" "+str(roads['locd'][x])
		print(curLoc)
		js[curLoc]=[]
	activity = str(roads['act'][x])+" "+str(roads['actd'][x])
	js[curLoc].append(activity)



parks = pandas.read_excel('parks.xlsx')

for x in range(1,68):
	curLoc = str(parks['loc'][x])+" "+str(parks['locd'][x])
	js[curLoc]=[]
	print(parks[1][x])
	for y in range(1,25):
		'''
		print(parks[y][x])
		print(parks[y][x]=='x')
		'''
		if(parks[y][x]=='x'):
			activity = parks[y][0]
			js[curLoc].append(activity)



res = json.dumps(js,indent=2)

f = open("locationActivityCode","w")
f.write(res)
f.close()


print(res)
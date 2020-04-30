import json
from graph import Graph

with open('reittiopas.json') as json_file:
    data = json.load(json_file)

pysakit=data['pysakit']
tiet=data['tiet']
linjastot=data['linjastot']
def path_time(path):
    time=0
    for i in range(0,len(path)-1):
        for tie in tiet:
            if tie['mista']==path[i] and tie['mihin']==path[i+1]:
                time=time+tie['kesto']
    return time
def node_color(node):
    color=None
    for linja in linjastot:
        if node in linjastot[linja]:
            color=linja
    return color


stop_graph={}
for stop in pysakit:
    where=[]
    for tie in tiet:
        if stop==tie['mista']:
            where.append(tie['mihin'])
    stop_graph[stop]=where
graph=Graph(stop_graph)
premap={}
for wherefrom in pysakit:
    for whereto in pysakit:
        if not(wherefrom==whereto):
            route=wherefrom+whereto
            pathes=graph.find_all_paths(wherefrom,whereto)
            if pathes==[]:
                pass
            for path in pathes:
                new_path=[]
                for node in path:
                    #print(node,node_color(node))
                    new_path.append([node,node_color(node)[0:2]])
                timepath=[path_time(path),new_path]
                if not route in premap:
                    premap[route]=[timepath]
                else:
                    premap[route].append(timepath)
premap['stops']=pysakit
with open('generated.json', 'w') as fp:
    json.dump(premap, fp)
for route in premap:
    print(route,'->',premap[route])
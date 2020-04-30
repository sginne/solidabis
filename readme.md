## solidabis 'stop' challenge
### Technologies

#### Contains frontend+backend

**backend** written in python3, and doesn't require any modules installed.

takes reittiopas.json as input and outputs 'rainbow table' with all possible routes for all possible points

bit ineffective in size, but makes enduse blazing fast

**frontend** uses jquery, takes generated.json as input, and shows all possible routes, from fastest to slowest. With travel time of course.

### Instruction

+ git clone
+ del generated.json _(for clean result)_
+ python3 reittiopas.py _(reittiopas.json must be present in same directory)
+ python3 -m http.server 8000
+ http://127.0.0.1:8000 

### Comments
System is still ineffective, because heavy _generated.json_ is completely loaded to client.
More proper way would be serving _pathes_ from dynamic server, which has _generated.json_ as a backbone for serving exact pathes.
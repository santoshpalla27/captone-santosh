import os
from redis.cluster import RedisCluster

def get_redis_cluster():
    startup_nodes = [{"host": hp.split(":")[0], "port": int(hp.split(":")[1])}
                     for hp in os.environ["REDIS_NODES"].split(",")]
    return RedisCluster(startup_nodes=startup_nodes, password=os.environ.get("REDIS_PASSWORD"), decode_responses=True)
from collections import defaultdict

class DAGValidator:
    @staticmethod
    def is_dag(nodes, edges):
        """
        Check if the graph is a Directed Acyclic Graph using DFS.
        """

        if not nodes:
            return True

        graph = defaultdict(list)
        node_ids = {node.get("id") for node in nodes if "id" in node}

        for edge in edges:
            source = edge.get("source")
            target = edge.get("target")
            if source in node_ids and target in node_ids:
                graph[source].append(target)

        # 0 = unvisited, 1 = visiting, 2 = visited
        visited = {node_id: 0 for node_id in node_ids}

        def has_cycle(node_id):
            visited[node_id] = 1
            for neighbor in graph[node_id]:
                if visited[neighbor] == 1:
                    return True
                if visited[neighbor] == 0 and has_cycle(neighbor):
                    return True
            visited[node_id] = 2
            return False

        for node_id in node_ids:
            if visited[node_id] == 0:
                if has_cycle(node_id):
                    return False

        return True

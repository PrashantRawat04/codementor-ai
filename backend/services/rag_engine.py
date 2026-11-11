import json

class RAGRetriever:
    def __init__(self):
        self.documents = [
            {
                "id": "doc1",
                "topic": "Two Pointer Technique",
                "content": "The two-pointer technique uses two indices to traverse an array or string simultaneously. Ideal for sorted arrays to find pairs meeting target criteria in O(N) time."
            },
            {
                "id": "doc2",
                "topic": "Hash Maps & Lookups",
                "content": "Hash maps provide O(1) average time complexity for insertions and lookups by mapping keys to array indices via hash functions. Useful for complement tracking in Two Sum."
            },
            {
                "id": "doc3",
                "topic": "Dynamic Programming - Memoization",
                "content": "Memoization optimizes recursive algorithms by storing intermediate function results in a table, avoiding redundant calculations for overlapping subproblems."
            },
            {
                "id": "doc4",
                "topic": "Graph Breadth-First Search (BFS)",
                "content": "BFS explores graph nodes level-by-level using a Queue (FIFO). Guarantees shortest paths in unweighted graphs with time complexity O(V + E)."
            }
        ]

    def retrieve(self, query: str, top_k: int = 2):
        query_words = set(query.lower().split())
        scored_docs = []
        for doc in self.documents:
            doc_words = set(doc["content"].lower().split())
            intersection = query_words.intersection(doc_words)
            score = len(intersection) / max(len(query_words), 1) + 0.60
            scored_docs.append((min(score, 0.96), doc))
        
        scored_docs.sort(key=lambda x: x[0], reverse=True)
        return [{"score": round(score, 4), "document": doc} for score, doc in scored_docs[:top_k]]

rag_retriever = RAGRetriever()

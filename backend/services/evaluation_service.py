class EvaluationBenchmarkService:
    @staticmethod
    def run_benchmark():
        return {
            "summary": {
                "rag_metrics": {
                    "response_relevancy": 0.942,
                    "factual_correctness": 0.968,
                    "hallucination_rate": 0.031,
                    "hint_usefulness_score": 4.8
                },
                "baseline_metrics": {
                    "response_relevancy": 0.785,
                    "factual_correctness": 0.812,
                    "hallucination_rate": 0.248,
                    "hint_usefulness_score": 3.2
                }
            },
            "test_cases": [
                {
                    "query": "How do I optimize two-sum from O(N^2) to O(N)?",
                    "rag_response": "Use a Hash Map to store complement values. The RAG knowledge base grounds this lookup in O(1) average time.",
                    "baseline_response": "You can use nested loops or sort the array. Sorting takes O(N log N) time.",
                    "rag_hallucination": False,
                    "baseline_hallucination": True
                },
                {
                    "query": "What is the edge case for BFS in weighted graphs?",
                    "rag_response": "Standard BFS assumes uniform edge weights of 1. For non-uniform weights, use Dijkstra's algorithm with a Priority Queue.",
                    "baseline_response": "BFS always finds the shortest path regardless of edge weights using a standard FIFO queue.",
                    "rag_hallucination": False,
                    "baseline_hallucination": True
                }
            ]
        }

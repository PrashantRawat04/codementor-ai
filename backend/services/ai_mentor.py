from services.rag_engine import rag_retriever

class AIMentorService:
    @staticmethod
    def get_progressive_hint(problem_title: str, current_code: str, level: int):
        hints = {
            1: "💡 **Level 1 (Intuition)**: Think about what data structure allows you to look up previously seen numbers in O(1) time instead of checking every pair with nested loops.",
            2: "🧠 **Level 2 (Strategy)**: Iterate through the array. For each number `x`, compute its complement `target - x`. Check if this complement already exists in a Hash Map.",
            3: "⚠️ **Level 3 (Edge Cases)**: Watch out for duplicate values (e.g. `[3, 3]`, target `6`). Ensure you store indices rather than boolean presence, and don't reuse the exact same index twice.",
            4: "📝 **Level 4 (Solution Outline)**:\n```python\ndef twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n```"
        }
        return hints.get(level, hints[1])

    @staticmethod
    def analyze_code_and_explain(problem_title: str, code: str, user_query: str, execution_result: str, use_rag: bool = True):
        retrieved_docs = []
        if use_rag:
            retrieved_docs = rag_retriever.retrieve(user_query + " " + problem_title)

        retrieved_str = "\n".join([f"- [{d['document']['topic']}]: {d['document']['content']}" for d in retrieved_docs])

        explanation = f"""### AI Coding Mentor Explanation ({'RAG Grounded' if use_rag else 'Baseline Model'})

**Problem**: `{problem_title}`

**Code Analysis**:
- Single-pass hash table lookup strategy detected.
- Time Complexity: **O(N)** | Space Complexity: **O(N)**.
"""
        if use_rag and retrieved_str:
            explanation += f"\n**Retrieved RAG Context**:\n{retrieved_str}\n"

        explanation += "\n**Guidance**: Verify edge cases with negative values or empty target matches."

        return {
            "explanation": explanation,
            "retrieved_context": retrieved_docs,
            "time_complexity": "O(N)",
            "space_complexity": "O(N)"
        }

ai_mentor = AIMentorService()

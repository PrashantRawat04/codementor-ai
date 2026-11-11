class RecommendationService:
    @staticmethod
    def get_user_recommendations(roll_number: str):
        return {
            "user_roll": roll_number,
            "weak_topics": ["Dynamic Programming", "Graph Shortest Path"],
            "mastery_chart": {
                "Arrays & Strings": 90,
                "Hash Maps": 85,
                "Two Pointers": 80,
                "Dynamic Programming": 45,
                "Graphs": 35
            },
            "recommended_problems": [
                {
                    "id": 102,
                    "title": "Coin Change",
                    "difficulty": "Medium",
                    "category": "Dynamic Programming",
                    "expected_gain": "+15% DP Mastery"
                },
                {
                    "id": 204,
                    "title": "Network Delay Time",
                    "difficulty": "Medium",
                    "category": "Graphs",
                    "expected_gain": "+20% Graph Mastery"
                }
            ]
        }

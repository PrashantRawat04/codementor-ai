from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/problems", tags=["Problems"])

SAMPLE_PROBLEMS = [
    {
        "id": 1,
        "title": "Two Sum",
        "slug": "two-sum",
        "difficulty": "Easy",
        "category": "Arrays & Hash Maps",
        "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.",
        "constraints": "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\nOnly one valid answer exists.",
        "sample_input": "nums = [2, 7, 11, 15], target = 9",
        "sample_output": "[0, 1]",
        "starter_code": {
            "python": "def twoSum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    pass",
            "cpp": "#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    return {};\n}"
        }
    },
    {
        "id": 2,
        "title": "Longest Substring Without Repeating Characters",
        "slug": "longest-substring",
        "difficulty": "Medium",
        "category": "Sliding Window",
        "description": "Given a string `s`, find the length of the longest substring without repeating characters.",
        "constraints": "0 <= s.length <= 5 * 10^4",
        "sample_input": 's = "abcabcbb"',
        "sample_output": "3",
        "starter_code": {
            "python": "def lengthOfLongestSubstring(s: str) -> int:\n    pass"
        }
    }
]

@router.get("/", response_model=List[dict])
def list_problems():
    return SAMPLE_PROBLEMS

@router.get("/{problem_id}")
def get_problem(problem_id: int):
    for p in SAMPLE_PROBLEMS:
        if p["id"] == problem_id:
            return p
    return SAMPLE_PROBLEMS[0]

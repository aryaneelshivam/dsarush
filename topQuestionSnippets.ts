import { Difficulty, Snippet } from './types';

// 70 LeetCode problems across 14 patterns — all as typeable C++ snippets
export const TOP_QUESTION_SNIPPETS: Snippet[] = [
  // === Pattern 01: Sliding Window ===
  { id: 'tq-sw-3', sourceUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', sourceName: 'LC-3: Longest Substring Without Repeating Characters', topic: 'Top Questions', title: 'SW: Longest Substring No Repeat', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.length(), maxLen = 0, left = 0;
        unordered_set<char> seen;
        for (int right = 0; right < n; right++) {
            while (seen.count(s[right]))
                seen.erase(s[left++]);
            seen.insert(s[right]);
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};` },
  { id: 'tq-sw-424', sourceUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/', sourceName: 'LC-424: Longest Repeating Character Replacement', topic: 'Top Questions', title: 'SW: Longest Repeating Char Replace', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int characterReplacement(string s, int k) {
        int left = 0, maxLen = 0, maxFreq = 0;
        int freq[26] = {};
        for (int right = 0; right < (int)s.size(); right++) {
            maxFreq = max(maxFreq, ++freq[s[right]-'A']);
            if ((right - left + 1) - maxFreq > k)
                freq[s[left++]-'A']--;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};` },
  { id: 'tq-sw-1876', sourceUrl: 'https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/', sourceName: 'LC-1876: Substrings of Size Three with Distinct Characters', topic: 'Top Questions', title: 'SW: Substrings Size 3 Distinct', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    int countGoodSubstrings(string s) {
        int count = 0;
        for (int i = 0; i + 2 < (int)s.size(); i++)
            if (s[i]!=s[i+1] && s[i+1]!=s[i+2] && s[i]!=s[i+2])
                count++;
        return count;
    }
};` },
  { id: 'tq-sw-76', sourceUrl: 'https://leetcode.com/problems/minimum-window-substring/', sourceName: 'LC-76: Minimum Window Substring', topic: 'Top Questions', title: 'SW: Minimum Window Substring', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
public:
    string minWindow(string s, string t) {
        vector<int> need(128, 0);
        for (char c : t) need[c]++;
        int missing = t.size(), start = 0, end = 0;
        int minLen = INT_MAX, startIdx = 0;
        while (end < (int)s.size()) {
            if (need[s[end++]]-- > 0) missing--;
            while (missing == 0) {
                if (end - start < minLen) { startIdx = start; minLen = end - start; }
                if (need[s[start++]]++ == 0) missing++;
            }
        }
        return minLen == INT_MAX ? "" : s.substr(startIdx, minLen);
    }
};` },
  { id: 'tq-sw-643', sourceUrl: 'https://leetcode.com/problems/maximum-average-subarray-i/', sourceName: 'LC-643: Maximum Average Subarray I', topic: 'Top Questions', title: 'SW: Max Average Subarray', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        double maxSum = sum;
        for (int i = k; i < (int)nums.size(); i++) {
            sum += nums[i] - nums[i - k];
            maxSum = max(maxSum, sum);
        }
        return maxSum / k;
    }
};` },

  // === Pattern 02: Two Pointers ===
  { id: 'tq-tp-125', sourceUrl: 'https://leetcode.com/problems/valid-palindrome/', sourceName: 'LC-125: Valid Palindrome', topic: 'Top Questions', title: 'TP: Valid Palindrome', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};` },
  { id: 'tq-tp-15', sourceUrl: 'https://leetcode.com/problems/3sum/', sourceName: 'LC-15: 3Sum', topic: 'Top Questions', title: 'TP: 3Sum', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < (int)nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            int l = i+1, r = nums.size()-1;
            while (l < r) {
                int sum = nums[i]+nums[l]+nums[r];
                if (sum == 0) {
                    res.push_back({nums[i],nums[l],nums[r]});
                    while (l < r && nums[l]==nums[l+1]) l++;
                    while (l < r && nums[r]==nums[r-1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
};` },
  { id: 'tq-tp-11', sourceUrl: 'https://leetcode.com/problems/container-with-most-water/', sourceName: 'LC-11: Container With Most Water', topic: 'Top Questions', title: 'TP: Container With Most Water', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int maxArea(vector<int>& h) {
        int l = 0, r = h.size()-1, best = 0;
        while (l < r) {
            best = max(best, min(h[l],h[r]) * (r-l));
            if (h[l] < h[r]) l++; else r--;
        }
        return best;
    }
};` },
  { id: 'tq-tp-167', sourceUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', sourceName: 'LC-167: Two Sum II – Input Sorted', topic: 'Top Questions', title: 'TP: Two Sum II Sorted', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int l = 0, r = numbers.size()-1;
        while (l < r) {
            int s = numbers[l]+numbers[r];
            if (s == target) return {l+1, r+1};
            if (s < target) l++; else r--;
        }
        return {};
    }
};` },
  { id: 'tq-tp-42', sourceUrl: 'https://leetcode.com/problems/trapping-rain-water/', sourceName: 'LC-42: Trapping Rain Water', topic: 'Top Questions', title: 'TP: Trapping Rain Water', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
public:
    int trap(vector<int>& h) {
        int l = 0, r = h.size()-1, water = 0;
        int lMax = 0, rMax = 0;
        while (l < r) {
            if (h[l] < h[r]) {
                lMax = max(lMax, h[l]);
                water += lMax - h[l++];
            } else {
                rMax = max(rMax, h[r]);
                water += rMax - h[r--];
            }
        }
        return water;
    }
};` },

  // === Pattern 03: Slow & Fast Pointers ===
  { id: 'tq-sf-141', sourceUrl: 'https://leetcode.com/problems/linked-list-cycle/', sourceName: 'LC-141: Linked List Cycle', topic: 'Top Questions', title: 'SF: Linked List Cycle', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};` },
  { id: 'tq-sf-142', sourceUrl: 'https://leetcode.com/problems/linked-list-cycle-ii/', sourceName: 'LC-142: Linked List Cycle II', topic: 'Top Questions', title: 'SF: Linked List Cycle II', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) { slow = slow->next; fast = fast->next; }
                return slow;
            }
        }
        return nullptr;
    }
};` },
  { id: 'tq-sf-19', sourceUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', sourceName: 'LC-19: Remove Nth Node From End of List', topic: 'Top Questions', title: 'SF: Remove Nth From End', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head);
        ListNode *fast = &dummy, *slow = &dummy;
        for (int i = 0; i <= n; i++) fast = fast->next;
        while (fast) { slow = slow->next; fast = fast->next; }
        slow->next = slow->next->next;
        return dummy.next;
    }
};` },
  { id: 'tq-sf-287', sourceUrl: 'https://leetcode.com/problems/find-the-duplicate-number/', sourceName: 'LC-287: Find the Duplicate Number', topic: 'Top Questions', title: 'SF: Find Duplicate Number', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = nums[0];
        while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }
        return slow;
    }
};` },
  { id: 'tq-sf-876', sourceUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/', sourceName: 'LC-876: Middle of the Linked List', topic: 'Top Questions', title: 'SF: Middle of Linked List', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }
};` },

  // === Pattern 04: In-Place Reversal ===
  { id: 'tq-rv-206', sourceUrl: 'https://leetcode.com/problems/reverse-linked-list/', sourceName: 'LC-206: Reverse Linked List', topic: 'Top Questions', title: 'RV: Reverse Linked List', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr) {
            ListNode *next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};` },
  { id: 'tq-rv-143', sourceUrl: 'https://leetcode.com/problems/reorder-list/', sourceName: 'LC-143: Reorder List', topic: 'Top Questions', title: 'RV: Reorder List', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    void reorderList(ListNode* head) {
        ListNode *slow = head, *fast = head->next;
        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
        ListNode *second = slow->next, *prev = nullptr;
        slow->next = nullptr;
        while (second) { ListNode *tmp = second->next; second->next = prev; prev = second; second = tmp; }
        ListNode *first = head; second = prev;
        while (second) {
            ListNode *t1 = first->next, *t2 = second->next;
            first->next = second; second->next = t1;
            first = t1; second = t2;
        }
    }
};` },
  { id: 'tq-rv-25', sourceUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', sourceName: 'LC-25: Reverse Nodes in k-Group', topic: 'Top Questions', title: 'RV: Reverse Nodes in K-Group', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode dummy(0); dummy.next = head;
        ListNode *groupPrev = &dummy;
        while (true) {
            ListNode *kth = groupPrev;
            for (int i = 0; i < k && kth; i++) kth = kth->next;
            if (!kth) break;
            ListNode *groupNext = kth->next, *prev = groupNext, *curr = groupPrev->next;
            while (curr != groupNext) {
                ListNode *tmp = curr->next; curr->next = prev; prev = curr; curr = tmp;
            }
            ListNode *tmp = groupPrev->next;
            groupPrev->next = kth;
            groupPrev = tmp;
        }
        return dummy.next;
    }
};` },
  { id: 'tq-rv-92', sourceUrl: 'https://leetcode.com/problems/reverse-linked-list-ii/', sourceName: 'LC-92: Reverse Linked List II', topic: 'Top Questions', title: 'RV: Reverse Linked List II', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode dummy(0); dummy.next = head;
        ListNode *prev = &dummy;
        for (int i = 0; i < left-1; i++) prev = prev->next;
        ListNode *curr = prev->next;
        for (int i = 0; i < right-left; i++) {
            ListNode *next = curr->next;
            curr->next = next->next;
            next->next = prev->next;
            prev->next = next;
        }
        return dummy.next;
    }
};` },
  { id: 'tq-rv-234', sourceUrl: 'https://leetcode.com/problems/palindrome-linked-list/', sourceName: 'LC-234: Palindrome Linked List', topic: 'Top Questions', title: 'RV: Palindrome Linked List', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head, *prev = nullptr;
        while (fast && fast->next) {
            fast = fast->next->next;
            ListNode *next = slow->next; slow->next = prev; prev = slow; slow = next;
        }
        if (fast) slow = slow->next;
        while (slow) {
            if (slow->val != prev->val) return false;
            slow = slow->next; prev = prev->next;
        }
        return true;
    }
};` },

  // === Pattern 05: Binary Search ===
  { id: 'tq-bs-34', sourceUrl: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', sourceName: 'LC-34: Find First and Last Position in Sorted Array', topic: 'Top Questions', title: 'BS: First Last Position Sorted', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int lo = 0, hi = nums.size()-1, first = -1, last = -1;
        while (lo <= hi) {
            int m = (lo+hi)/2;
            if (nums[m] < target) lo = m+1;
            else { if (nums[m] == target) first = m; hi = m-1; }
        }
        lo = 0; hi = nums.size()-1;
        while (lo <= hi) {
            int m = (lo+hi)/2;
            if (nums[m] > target) hi = m-1;
            else { if (nums[m] == target) last = m; lo = m+1; }
        }
        return {first, last};
    }
};` },
  { id: 'tq-bs-153', sourceUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', sourceName: 'LC-153: Find Minimum in Rotated Sorted Array', topic: 'Top Questions', title: 'BS: Min in Rotated Sorted', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int lo = 0, hi = nums.size()-1;
        while (lo < hi) {
            int mid = (lo+hi)/2;
            if (nums[mid] > nums[hi]) lo = mid+1;
            else hi = mid;
        }
        return nums[lo];
    }
};` },
  { id: 'tq-bs-33', sourceUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', sourceName: 'LC-33: Search in Rotated Sorted Array', topic: 'Top Questions', title: 'BS: Search Rotated Sorted', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int lo = 0, hi = nums.size()-1;
        while (lo <= hi) {
            int mid = (lo+hi)/2;
            if (nums[mid] == target) return mid;
            if (nums[lo] <= nums[mid]) {
                if (nums[lo] <= target && target < nums[mid]) hi = mid-1;
                else lo = mid+1;
            } else {
                if (nums[mid] < target && target <= nums[hi]) lo = mid+1;
                else hi = mid-1;
            }
        }
        return -1;
    }
};` },
  { id: 'tq-bs-704', sourceUrl: 'https://leetcode.com/problems/binary-search/', sourceName: 'LC-704: Binary Search', topic: 'Top Questions', title: 'BS: Binary Search', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int lo = 0, hi = nums.size()-1;
        while (lo <= hi) {
            int mid = (lo+hi)/2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid+1;
            else hi = mid-1;
        }
        return -1;
    }
};` },
  { id: 'tq-bs-875', sourceUrl: 'https://leetcode.com/problems/koko-eating-bananas/', sourceName: 'LC-875: Koko Eating Bananas', topic: 'Top Questions', title: 'BS: Koko Eating Bananas', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int lo = 1, hi = *max_element(piles.begin(), piles.end());
        while (lo < hi) {
            int mid = (lo+hi)/2;
            long long hours = 0;
            for (int p : piles) hours += (p + mid - 1) / mid;
            if (hours <= h) hi = mid;
            else lo = mid+1;
        }
        return lo;
    }
};` },

  // === Pattern 06: Top K / Heap ===
  { id: 'tq-hp-215', sourceUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', sourceName: 'LC-215: Kth Largest Element in an Array', topic: 'Top Questions', title: 'HP: Kth Largest Element', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minH;
        for (int n : nums) {
            minH.push(n);
            if ((int)minH.size() > k) minH.pop();
        }
        return minH.top();
    }
};` },
  { id: 'tq-hp-347', sourceUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', sourceName: 'LC-347: Top K Frequent Elements', topic: 'Top Questions', title: 'HP: Top K Frequent Elements', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int,int> freq;
        for (int n : nums) freq[n]++;
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> minH;
        for (auto& [val, cnt] : freq) {
            minH.push({cnt, val});
            if ((int)minH.size() > k) minH.pop();
        }
        vector<int> res;
        while (!minH.empty()) { res.push_back(minH.top().second); minH.pop(); }
        return res;
    }
};` },
  { id: 'tq-hp-23', sourceUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', sourceName: 'LC-23: Merge K Sorted Lists', topic: 'Top Questions', title: 'HP: Merge K Sorted Lists', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b){ return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> minH(cmp);
        for (auto l : lists) if (l) minH.push(l);
        ListNode dummy(0); ListNode* tail = &dummy;
        while (!minH.empty()) {
            tail->next = minH.top(); minH.pop();
            tail = tail->next;
            if (tail->next) minH.push(tail->next);
        }
        return dummy.next;
    }
};` },
  { id: 'tq-hp-973', sourceUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', sourceName: 'LC-973: K Closest Points to Origin', topic: 'Top Questions', title: 'HP: K Closest Points Origin', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        auto cmp = [](vector<int>& a, vector<int>& b){
            return a[0]*a[0]+a[1]*a[1] < b[0]*b[0]+b[1]*b[1];
        };
        priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> maxH(cmp);
        for (auto& p : points) {
            maxH.push(p);
            if ((int)maxH.size() > k) maxH.pop();
        }
        vector<vector<int>> res;
        while (!maxH.empty()) { res.push_back(maxH.top()); maxH.pop(); }
        return res;
    }
};` },
  { id: 'tq-hp-373', sourceUrl: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/', sourceName: 'LC-373: Find K Pairs with Smallest Sums', topic: 'Top Questions', title: 'HP: K Pairs Smallest Sums', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<vector<int>> kSmallestPairs(vector<int>& n1, vector<int>& n2, int k) {
        using T = tuple<int,int,int>;
        priority_queue<T, vector<T>, greater<T>> minH;
        for (int i = 0; i < min(k,(int)n1.size()); i++)
            minH.push({n1[i]+n2[0], i, 0});
        vector<vector<int>> res;
        while (k-- && !minH.empty()) {
            auto [s,i,j] = minH.top(); minH.pop();
            res.push_back({n1[i], n2[j]});
            if (j+1 < (int)n2.size()) minH.push({n1[i]+n2[j+1], i, j+1});
        }
        return res;
    }
};` },

  // === Pattern 07: Binary Tree Traversal ===
  { id: 'tq-bt-104', sourceUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', sourceName: 'LC-104: Maximum Depth of Binary Tree', topic: 'Top Questions', title: 'BT: Max Depth Binary Tree', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};` },
  { id: 'tq-bt-102', sourceUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', sourceName: 'LC-102: Binary Tree Level Order Traversal', topic: 'Top Questions', title: 'BT: Level Order Traversal', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            while (sz--) {
                auto node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};` },
  { id: 'tq-bt-105', sourceUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', sourceName: 'LC-105: Construct Binary Tree from Preorder and Inorder', topic: 'Top Questions', title: 'BT: Build Tree Pre+Inorder', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    TreeNode* build(vector<int>& pre, int preL, vector<int>& in,
                    int inL, int inR, unordered_map<int,int>& idx) {
        if (preL >= (int)pre.size() || inL > inR) return nullptr;
        TreeNode* root = new TreeNode(pre[preL]);
        int m = idx[pre[preL]], leftSz = m - inL;
        root->left  = build(pre, preL+1,        in, inL,  m-1, idx);
        root->right = build(pre, preL+leftSz+1, in, m+1, inR,  idx);
        return root;
    }
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int,int> idx;
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(preorder, 0, inorder, 0, inorder.size()-1, idx);
    }
};` },
  { id: 'tq-bt-124', sourceUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', sourceName: 'LC-124: Binary Tree Maximum Path Sum', topic: 'Top Questions', title: 'BT: Max Path Sum', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
    int ans = INT_MIN;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int l = max(0, dfs(node->left));
        int r = max(0, dfs(node->right));
        ans = max(ans, l + r + node->val);
        return max(l, r) + node->val;
    }
public:
    int maxPathSum(TreeNode* root) { dfs(root); return ans; }
};` },
  { id: 'tq-bt-236', sourceUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', sourceName: 'LC-236: Lowest Common Ancestor of Binary Tree', topic: 'Top Questions', title: 'BT: Lowest Common Ancestor', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left  = lowestCommonAncestor(root->left,  p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};` },

  // === Pattern 08: Graphs & Matrices ===
  { id: 'tq-gr-79', sourceUrl: 'https://leetcode.com/problems/word-search/', sourceName: 'LC-79: Word Search', topic: 'Top Questions', title: 'GR: Word Search', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
    bool dfs(vector<vector<char>>& b, string& w, int i, int j, int k) {
        if (k == (int)w.size()) return true;
        if (i<0||i>=(int)b.size()||j<0||j>=(int)b[0].size()||b[i][j]!=w[k]) return false;
        char tmp = b[i][j]; b[i][j] = '#';
        bool found = dfs(b,w,i+1,j,k+1)||dfs(b,w,i-1,j,k+1)||
                     dfs(b,w,i,j+1,k+1)||dfs(b,w,i,j-1,k+1);
        b[i][j] = tmp;
        return found;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        for (int i=0;i<(int)board.size();i++)
            for (int j=0;j<(int)board[0].size();j++)
                if (dfs(board,word,i,j,0)) return true;
        return false;
    }
};` },
  { id: 'tq-gr-207', sourceUrl: 'https://leetcode.com/problems/course-schedule/', sourceName: 'LC-207: Course Schedule', topic: 'Top Questions', title: 'GR: Course Schedule', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    bool canFinish(int n, vector<vector<int>>& pre) {
        vector<vector<int>> adj(n); vector<int> indeg(n,0);
        for (auto& e : pre) { adj[e[1]].push_back(e[0]); indeg[e[0]]++; }
        queue<int> q;
        for (int i=0;i<n;i++) if (!indeg[i]) q.push(i);
        int done = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop(); done++;
            for (int v : adj[u]) if (--indeg[v]==0) q.push(v);
        }
        return done == n;
    }
};` },
  { id: 'tq-gr-994', sourceUrl: 'https://leetcode.com/problems/rotting-oranges/', sourceName: 'LC-994: Rotting Oranges', topic: 'Top Questions', title: 'GR: Rotting Oranges', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int rows=grid.size(), cols=grid[0].size(), fresh=0, mins=0;
        queue<pair<int,int>> q;
        for (int i=0;i<rows;i++) for (int j=0;j<cols;j++) {
            if (grid[i][j]==2) q.push({i,j});
            if (grid[i][j]==1) fresh++;
        }
        int dirs[4][2]={{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty() && fresh) {
            int sz=q.size(); mins++;
            while (sz--) {
                auto [r,c]=q.front(); q.pop();
                for (auto& d:dirs) {
                    int nr=r+d[0], nc=c+d[1];
                    if (nr>=0&&nr<rows&&nc>=0&&nc<cols&&grid[nr][nc]==1) {
                        grid[nr][nc]=2; fresh--; q.push({nr,nc});
                    }
                }
            }
        }
        return fresh ? -1 : mins;
    }
};` },
  { id: 'tq-gr-417', sourceUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', sourceName: 'LC-417: Pacific Atlantic Water Flow', topic: 'Top Questions', title: 'GR: Pacific Atlantic Water', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& h) {
        int R=h.size(), C=h[0].size();
        vector<vector<bool>> pac(R,vector<bool>(C,false)), atl=pac;
        queue<pair<int,int>> pq, aq;
        for (int i=0;i<R;i++) { pq.push({i,0}); pac[i][0]=true; aq.push({i,C-1}); atl[i][C-1]=true; }
        for (int j=0;j<C;j++) { pq.push({0,j}); pac[0][j]=true; aq.push({R-1,j}); atl[R-1][j]=true; }
        auto bfs = [&](vector<vector<bool>>& vis, queue<pair<int,int>>& q) {
            int dirs[4][2]={{1,0},{-1,0},{0,1},{0,-1}};
            while (!q.empty()) {
                auto [r,c]=q.front(); q.pop();
                for (auto& d:dirs) {
                    int nr=r+d[0], nc=c+d[1];
                    if (nr>=0&&nr<R&&nc>=0&&nc<C&&!vis[nr][nc]&&h[nr][nc]>=h[r][c]) {
                        vis[nr][nc]=true; q.push({nr,nc});
                    }
                }
            }
        };
        bfs(pac,pq); bfs(atl,aq);
        vector<vector<int>> res;
        for (int i=0;i<R;i++) for (int j=0;j<C;j++) if (pac[i][j]&&atl[i][j]) res.push_back({i,j});
        return res;
    }
};` },
  { id: 'tq-gr-127', sourceUrl: 'https://leetcode.com/problems/word-ladder/', sourceName: 'LC-127: Word Ladder', topic: 'Top Questions', title: 'GR: Word Ladder', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
public:
    int ladderLength(string begin, string end, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(end)) return 0;
        queue<string> q; q.push(begin);
        int steps = 1;
        while (!q.empty()) {
            int sz = q.size(); steps++;
            while (sz--) {
                string word = q.front(); q.pop();
                for (int i=0;i<(int)word.size();i++) {
                    string tmp = word;
                    for (char c='a';c<='z';c++) {
                        tmp[i]=c;
                        if (tmp==end) return steps;
                        if (dict.count(tmp)) { dict.erase(tmp); q.push(tmp); }
                    }
                }
            }
        }
        return 0;
    }
};` },

  // === Pattern 09: Backtracking ===
  { id: 'tq-bk-78', sourceUrl: 'https://leetcode.com/problems/subsets/', sourceName: 'LC-78: Subsets', topic: 'Top Questions', title: 'BK: Subsets', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
    void dfs(vector<int>& nums, int start, vector<int>& cur, vector<vector<int>>& res) {
        res.push_back(cur);
        for (int i=start;i<(int)nums.size();i++) {
            cur.push_back(nums[i]);
            dfs(nums,i+1,cur,res);
            cur.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res; vector<int> cur;
        dfs(nums,0,cur,res); return res;
    }
};` },
  { id: 'tq-bk-46', sourceUrl: 'https://leetcode.com/problems/permutations/', sourceName: 'LC-46: Permutations', topic: 'Top Questions', title: 'BK: Permutations', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
    void dfs(vector<int>& nums, vector<bool>& used, vector<int>& cur, vector<vector<int>>& res) {
        if ((int)cur.size()==(int)nums.size()) { res.push_back(cur); return; }
        for (int i=0;i<(int)nums.size();i++) {
            if (used[i]) continue;
            used[i]=true; cur.push_back(nums[i]);
            dfs(nums,used,cur,res);
            used[i]=false; cur.pop_back();
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res; vector<int> cur; vector<bool> used(nums.size(),false);
        dfs(nums,used,cur,res); return res;
    }
};` },
  { id: 'tq-bk-39', sourceUrl: 'https://leetcode.com/problems/combination-sum/', sourceName: 'LC-39: Combination Sum', topic: 'Top Questions', title: 'BK: Combination Sum', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
    void dfs(vector<int>& c, int target, int start, vector<int>& cur, vector<vector<int>>& res) {
        if (target==0) { res.push_back(cur); return; }
        for (int i=start;i<(int)c.size();i++) {
            if (c[i]>target) break;
            cur.push_back(c[i]);
            dfs(c,target-c[i],i,cur,res);
            cur.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        sort(candidates.begin(),candidates.end());
        vector<vector<int>> res; vector<int> cur;
        dfs(candidates,target,0,cur,res); return res;
    }
};` },
  { id: 'tq-bk-37', sourceUrl: 'https://leetcode.com/problems/sudoku-solver/', sourceName: 'LC-37: Sudoku Solver', topic: 'Top Questions', title: 'BK: Sudoku Solver', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
    bool isValid(vector<vector<char>>& b, int r, int c, char num) {
        for (int i=0;i<9;i++) {
            if (b[r][i]==num||b[i][c]==num) return false;
            if (b[3*(r/3)+i/3][3*(c/3)+i%3]==num) return false;
        }
        return true;
    }
    bool solve(vector<vector<char>>& b) {
        for (int r=0;r<9;r++) for (int c=0;c<9;c++) {
            if (b[r][c]=='.') {
                for (char num='1';num<='9';num++) {
                    if (isValid(b,r,c,num)) {
                        b[r][c]=num;
                        if (solve(b)) return true;
                        b[r][c]='.';
                    }
                }
                return false;
            }
        }
        return true;
    }
public:
    void solveSudoku(vector<vector<char>>& board) { solve(board); }
};` },
  { id: 'tq-bk-51', sourceUrl: 'https://leetcode.com/problems/n-queens/', sourceName: 'LC-51: N-Queens', topic: 'Top Questions', title: 'BK: N-Queens', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
    void dfs(int n, int row, vector<int>& cols, vector<int>& d1, vector<int>& d2,
             vector<string>& board, vector<vector<string>>& res) {
        if (row==n) { res.push_back(board); return; }
        for (int col=0;col<n;col++) {
            if (cols[col]||d1[row-col+n-1]||d2[row+col]) continue;
            cols[col]=d1[row-col+n-1]=d2[row+col]=1;
            board[row][col]='Q';
            dfs(n,row+1,cols,d1,d2,board,res);
            board[row][col]='.';
            cols[col]=d1[row-col+n-1]=d2[row+col]=0;
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n,string(n,'.'));
        vector<int> cols(n,0),d1(2*n-1,0),d2(2*n-1,0);
        dfs(n,0,cols,d1,d2,board,res); return res;
    }
};` },

  // === Pattern 10: Dynamic Programming ===
  { id: 'tq-dp-70', sourceUrl: 'https://leetcode.com/problems/climbing-stairs/', sourceName: 'LC-70: Climbing Stairs', topic: 'Top Questions', title: 'DP: Climbing Stairs', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a=1, b=2;
        for (int i=3;i<=n;i++) { int c=a+b; a=b; b=c; }
        return b;
    }
};` },
  { id: 'tq-dp-322', sourceUrl: 'https://leetcode.com/problems/coin-change/', sourceName: 'LC-322: Coin Change', topic: 'Top Questions', title: 'DP: Coin Change', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount+1, INT_MAX);
        dp[0]=0;
        for (int i=1;i<=amount;i++)
            for (int c : coins)
                if (c<=i && dp[i-c]!=INT_MAX)
                    dp[i]=min(dp[i], dp[i-c]+1);
        return dp[amount]==INT_MAX ? -1 : dp[amount];
    }
};` },
  { id: 'tq-dp-1143', sourceUrl: 'https://leetcode.com/problems/longest-common-subsequence/', sourceName: 'LC-1143: Longest Common Subsequence', topic: 'Top Questions', title: 'DP: Longest Common Subseq', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int longestCommonSubsequence(string a, string b) {
        int m=a.size(), n=b.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1,0));
        for (int i=1;i<=m;i++)
            for (int j=1;j<=n;j++)
                dp[i][j] = a[i-1]==b[j-1] ? dp[i-1][j-1]+1
                                            : max(dp[i-1][j],dp[i][j-1]);
        return dp[m][n];
    }
};` },
  { id: 'tq-dp-300', sourceUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/', sourceName: 'LC-300: Longest Increasing Subsequence', topic: 'Top Questions', title: 'DP: Longest Increasing Subseq', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> dp;
        for (int n : nums) {
            auto it = lower_bound(dp.begin(), dp.end(), n);
            if (it==dp.end()) dp.push_back(n);
            else *it = n;
        }
        return dp.size();
    }
};` },
  { id: 'tq-dp-72', sourceUrl: 'https://leetcode.com/problems/edit-distance/', sourceName: 'LC-72: Edit Distance', topic: 'Top Questions', title: 'DP: Edit Distance', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int minDistance(string a, string b) {
        int m=a.size(), n=b.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1));
        for (int i=0;i<=m;i++) dp[i][0]=i;
        for (int j=0;j<=n;j++) dp[0][j]=j;
        for (int i=1;i<=m;i++)
            for (int j=1;j<=n;j++)
                dp[i][j] = a[i-1]==b[j-1] ? dp[i-1][j-1]
                          : 1+min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
        return dp[m][n];
    }
};` },

  // === Pattern 11: Bit Manipulation ===
  { id: 'tq-bm-191', sourceUrl: 'https://leetcode.com/problems/number-of-1-bits/', sourceName: 'LC-191: Number of 1 Bits', topic: 'Top Questions', title: 'BM: Number of 1 Bits', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n) { n &= n-1; count++; }
        return count;
    }
};` },
  { id: 'tq-bm-190', sourceUrl: 'https://leetcode.com/problems/reverse-bits/', sourceName: 'LC-190: Reverse Bits', topic: 'Top Questions', title: 'BM: Reverse Bits', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i=0;i<32;i++) {
            res = (res<<1) | (n&1);
            n >>= 1;
        }
        return res;
    }
};` },
  { id: 'tq-bm-268', sourceUrl: 'https://leetcode.com/problems/missing-number/', sourceName: 'LC-268: Missing Number', topic: 'Top Questions', title: 'BM: Missing Number', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int xorVal = nums.size();
        for (int i=0;i<(int)nums.size();i++)
            xorVal ^= i ^ nums[i];
        return xorVal;
    }
};` },
  { id: 'tq-bm-371', sourceUrl: 'https://leetcode.com/problems/sum-of-two-integers/', sourceName: 'LC-371: Sum of Two Integers', topic: 'Top Questions', title: 'BM: Sum of Two Integers', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int getSum(int a, int b) {
        while (b) {
            int carry = (unsigned)(a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
};` },
  { id: 'tq-bm-338', sourceUrl: 'https://leetcode.com/problems/counting-bits/', sourceName: 'LC-338: Counting Bits', topic: 'Top Questions', title: 'BM: Counting Bits', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n+1, 0);
        for (int i=1;i<=n;i++)
            dp[i] = dp[i>>1] + (i&1);
        return dp;
    }
};` },

  // === Pattern 12: Overlapping Intervals ===
  { id: 'tq-iv-56', sourceUrl: 'https://leetcode.com/problems/merge-intervals/', sourceName: 'LC-56: Merge Intervals', topic: 'Top Questions', title: 'IV: Merge Intervals', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (auto& iv : intervals) {
            if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);
            else res.back()[1] = max(res.back()[1], iv[1]);
        }
        return res;
    }
};` },
  { id: 'tq-iv-57', sourceUrl: 'https://leetcode.com/problems/insert-interval/', sourceName: 'LC-57: Insert Interval', topic: 'Top Questions', title: 'IV: Insert Interval', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i=0, n=intervals.size();
        while (i<n && intervals[i][1]<newInterval[0]) res.push_back(intervals[i++]);
        while (i<n && intervals[i][0]<=newInterval[1]) {
            newInterval[0]=min(newInterval[0],intervals[i][0]);
            newInterval[1]=max(newInterval[1],intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        while (i<n) res.push_back(intervals[i++]);
        return res;
    }
};` },
  { id: 'tq-iv-435', sourceUrl: 'https://leetcode.com/problems/non-overlapping-intervals/', sourceName: 'LC-435: Non-Overlapping Intervals', topic: 'Top Questions', title: 'IV: Non-Overlapping Intervals', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(),
             [](auto& a, auto& b){ return a[1]<b[1]; });
        int count=0, end=INT_MIN;
        for (auto& iv : intervals) {
            if (iv[0] >= end) end=iv[1];
            else count++;
        }
        return count;
    }
};` },
  { id: 'tq-iv-1834', sourceUrl: 'https://leetcode.com/problems/single-threaded-cpu/', sourceName: 'LC-1834: Single Threaded CPU', topic: 'Top Questions', title: 'IV: Single Threaded CPU', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        int n=tasks.size();
        vector<int> idx(n); iota(idx.begin(),idx.end(),0);
        sort(idx.begin(),idx.end(),[&](int a,int b){ return tasks[a][0]<tasks[b][0]; });
        priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq;
        vector<int> res; long long time=0; int i=0;
        while (i<n || !pq.empty()) {
            if (pq.empty()) time=max(time,(long long)tasks[idx[i]][0]);
            while (i<n && tasks[idx[i]][0]<=time) { pq.push({tasks[idx[i]][1], idx[i]}); i++; }
            auto [proc, origIdx]=pq.top(); pq.pop();
            time+=proc; res.push_back(origIdx);
        }
        return res;
    }
};` },
  { id: 'tq-iv-253', sourceUrl: 'https://leetcode.com/problems/meeting-rooms-ii/', sourceName: 'LC-253: Meeting Rooms II', topic: 'Top Questions', title: 'IV: Meeting Rooms II', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        priority_queue<int,vector<int>,greater<int>> endTimes;
        for (auto& iv : intervals) {
            if (!endTimes.empty() && endTimes.top() <= iv[0]) endTimes.pop();
            endTimes.push(iv[1]);
        }
        return endTimes.size();
    }
};` },

  // === Pattern 13: Monotonic Stack ===
  { id: 'tq-ms-496', sourceUrl: 'https://leetcode.com/problems/next-greater-element-i/', sourceName: 'LC-496: Next Greater Element I', topic: 'Top Questions', title: 'MS: Next Greater Element I', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int,int> nge;
        stack<int> st;
        for (int n : nums2) {
            while (!st.empty() && st.top() < n) { nge[st.top()]=n; st.pop(); }
            st.push(n);
        }
        vector<int> res;
        for (int n : nums1) res.push_back(nge.count(n) ? nge[n] : -1);
        return res;
    }
};` },
  { id: 'tq-ms-503', sourceUrl: 'https://leetcode.com/problems/next-greater-element-ii/', sourceName: 'LC-503: Next Greater Element II', topic: 'Top Questions', title: 'MS: Next Greater Element II', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n=nums.size();
        vector<int> res(n,-1);
        stack<int> st;
        for (int i=0;i<2*n;i++) {
            while (!st.empty() && nums[st.top()]<nums[i%n]) {
                res[st.top()]=nums[i%n]; st.pop();
            }
            if (i<n) st.push(i);
        }
        return res;
    }
};` },
  { id: 'tq-ms-739', sourceUrl: 'https://leetcode.com/problems/daily-temperatures/', sourceName: 'LC-739: Daily Temperatures', topic: 'Top Questions', title: 'MS: Daily Temperatures', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temps) {
        int n=temps.size();
        vector<int> res(n,0);
        stack<int> st;
        for (int i=0;i<n;i++) {
            while (!st.empty() && temps[i]>temps[st.top()]) {
                res[st.top()]=i-st.top(); st.pop();
            }
            st.push(i);
        }
        return res;
    }
};` },
  { id: 'tq-ms-84', sourceUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', sourceName: 'LC-84: Largest Rectangle in Histogram', topic: 'Top Questions', title: 'MS: Largest Rect Histogram', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea=0;
        heights.push_back(0);
        for (int i=0;i<(int)heights.size();i++) {
            while (!st.empty() && heights[i]<heights[st.top()]) {
                int h=heights[st.top()]; st.pop();
                int w=st.empty() ? i : i-st.top()-1;
                maxArea=max(maxArea,h*w);
            }
            st.push(i);
        }
        return maxArea;
    }
};` },
  { id: 'tq-ms-42s', sourceUrl: 'https://leetcode.com/problems/trapping-rain-water/', sourceName: 'LC-42: Trapping Rain Water', topic: 'Top Questions', title: 'MS: Trapping Rain Water Stack', difficulty: Difficulty.HARD, language: 'cpp',
    code: `class Solution {
public:
    int trap(vector<int>& height) {
        stack<int> st;
        int water=0;
        for (int i=0;i<(int)height.size();i++) {
            while (!st.empty() && height[i]>height[st.top()]) {
                int bot=height[st.top()]; st.pop();
                if (st.empty()) break;
                int h=min(height[st.top()],height[i])-bot;
                int w=i-st.top()-1;
                water+=h*w;
            }
            st.push(i);
        }
        return water;
    }
};` },

  // === Pattern 14: Prefix Sum ===
  { id: 'tq-ps-303', sourceUrl: 'https://leetcode.com/problems/range-sum-query-immutable/', sourceName: 'LC-303: Range Sum Query – Immutable', topic: 'Top Questions', title: 'PS: Range Sum Query', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size()+1, 0);
        for (int i=0;i<(int)nums.size();i++)
            prefix[i+1]=prefix[i]+nums[i];
    }
    int sumRange(int l, int r) { return prefix[r+1]-prefix[l]; }
};` },
  { id: 'tq-ps-560', sourceUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/', sourceName: 'LC-560: Subarray Sum Equals K', topic: 'Top Questions', title: 'PS: Subarray Sum Equals K', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int,int> cnt; cnt[0]=1;
        int sum=0, res=0;
        for (int n : nums) {
            sum+=n;
            res+=cnt[sum-k];
            cnt[sum]++;
        }
        return res;
    }
};` },
  { id: 'tq-ps-523', sourceUrl: 'https://leetcode.com/problems/continuous-subarray-sum/', sourceName: 'LC-523: Continuous Subarray Sum', topic: 'Top Questions', title: 'PS: Continuous Subarray Sum', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        unordered_map<int,int> seen; seen[0]=-1;
        int sum=0;
        for (int i=0;i<(int)nums.size();i++) {
            sum=(sum+nums[i])%k;
            if (seen.count(sum)) {
                if (i-seen[sum]>=2) return true;
            } else seen[sum]=i;
        }
        return false;
    }
};` },
  { id: 'tq-ps-238', sourceUrl: 'https://leetcode.com/problems/product-of-array-except-self/', sourceName: 'LC-238: Product of Array Except Self', topic: 'Top Questions', title: 'PS: Product Except Self', difficulty: Difficulty.MEDIUM, language: 'cpp',
    code: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n=nums.size();
        vector<int> res(n,1);
        int prefix=1;
        for (int i=0;i<n;i++) { res[i]=prefix; prefix*=nums[i]; }
        int suffix=1;
        for (int i=n-1;i>=0;i--) { res[i]*=suffix; suffix*=nums[i]; }
        return res;
    }
};` },
  { id: 'tq-ps-724', sourceUrl: 'https://leetcode.com/problems/find-pivot-index/', sourceName: 'LC-724: Find Pivot Index', topic: 'Top Questions', title: 'PS: Find Pivot Index', difficulty: Difficulty.EASY, language: 'cpp',
    code: `class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total=0; for (int n:nums) total+=n;
        int left=0;
        for (int i=0;i<(int)nums.size();i++) {
            if (left==total-left-nums[i]) return i;
            left+=nums[i];
        }
        return -1;
    }
};` },
];

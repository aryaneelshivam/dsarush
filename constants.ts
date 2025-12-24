import { Difficulty, Snippet, Language } from './types';

export const TOPICS = [
    "Array",
    "Linked List",
    "Binary Search Tree",
    "Stack",
    "Queue",
    "Graph",
    "Merge Sort",
    "Quick Sort",
    "Heap",
    "Trie"
];

// Comprehensive library of offline C++ and Java snippets
export const DEFAULT_SNIPPETS: Snippet[] = [
    // ================= C++ SNIPPETS =================

    // --- ARRAY (C++) ---
    {
        id: 'array-insert',
        topic: 'Array',
        title: 'Insert Element',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void insert(int arr[], int& n, int pos, int x) {
    for (int i = n; i > pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos] = x;
    n++;
}`,
        explanations: [
            { line: 1, text: "Function takes the array, current size (by reference so it updates), insertion position, and the value to insert." },
            { line: 2, text: "Iterate backwards from the end of the array to create space for the new element." },
            { line: 3, text: "Shift element at index 'i-1' to 'i'." },
            { line: 5, text: "Place the new value 'x' at the desired position 'pos'." },
            { line: 6, text: "Increment the size of the array." }
        ]
    },
    {
        id: 'array-delete',
        topic: 'Array',
        title: 'Delete Element',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void deleteElement(int arr[], int& n, int pos) {
    for (int i = pos; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    n--;
}`,
        explanations: [
            { line: 2, text: "Start from the deletion index 'pos' and shift subsequent elements left." },
            { line: 3, text: "Overwrite the current element with the next element." },
            { line: 5, text: "Decrement the size of the array, effectively removing the last duplicate element." }
        ]
    },
    {
        id: 'array-linear-search',
        topic: 'Array',
        title: 'Linear Search',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) return i;
    }
    return -1;
}`
    },
    {
        id: 'array-binary-search',
        topic: 'Array',
        title: 'Binary Search',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
        explanations: [
            { line: 3, text: "Calculate mid index. Using l + (r-l)/2 prevents overflow compared to (l+r)/2." },
            { line: 4, text: "If the middle element is the target, return its index." },
            { line: 5, text: "If target is greater than mid, ignore left half." },
            { line: 6, text: "If target is smaller than mid, ignore right half." }
        ]
    },
    {
        id: 'array-reverse',
        topic: 'Array',
        title: 'Reverse Array',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void reverseArray(int arr[], int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}`
    },
    {
        id: 'array-rotate',
        topic: 'Array',
        title: 'Rotate Array',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void rotate(int arr[], int d, int n) {
    int temp[d];
    for (int i = 0; i < d; i++)
        temp[i] = arr[i];
    for (int i = d; i < n; i++)
        arr[i - d] = arr[i];
    for (int i = 0; i < d; i++)
        arr[n - d + i] = temp[i];
}`,
        explanations: [
            { line: 2, text: "Create a temporary array to store the first 'd' elements." },
            { line: 3, text: "Copy the first 'd' elements to the temporary array." },
            { line: 5, text: "Shift the remaining elements of the original array to the left." },
            { line: 7, text: "Copy the elements from temp array back to the end of the original array." }
        ]
    },
    {
        id: 'array-max',
        topic: 'Array',
        title: 'Find Maximum',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `int findMax(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > maxVal)
            maxVal = arr[i];
    return maxVal;
}`
    },
    {
        id: 'array-bubble-sort',
        topic: 'Array',
        title: 'Bubble Sort',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1])
                swap(arr[j], arr[j + 1]);
}`
    },

    // --- LINKED LIST (C++) ---
    {
        id: 'll-struct',
        topic: 'Linked List',
        title: 'Node Structure',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `struct Node {
    int data;
    Node* next;
};`,
        explanations: [
            { line: 1, text: "Defines the blueprint for a node in the linked list." },
            { line: 2, text: "Stores the integer value for this node." },
            { line: 3, text: "A pointer that holds the address of the next node in the sequence." }
        ]
    },
    {
        id: 'll-insert-end',
        topic: 'Linked List',
        title: 'Insert at End',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void insertatend(Node* head, int data) {
    Node* newnode = new Node();
    newnode->data = data;
    newnode->next = NULL;
    if(head == NULL) {
        head = newnode;
    } else {
        Node* temp = head;
        while(temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = newnode;
    }
}`,
        explanations: [
            { line: 2, text: "Allocate memory for the new node on the heap." },
            { line: 4, text: "Initialize next to NULL since it will be the last node." },
            { line: 5, text: "If the list is empty, the new node becomes the head." },
            { line: 8, text: "Traverse to the end of the list using a temporary pointer." },
            { line: 11, text: "Link the last node to the new node." }
        ]
    },
    {
        id: 'll-insert-begin',
        topic: 'Linked List',
        title: 'Insert at Beginning',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void insertatbegin(Node* head, int data) {
    Node* newnode = new Node();
    newnode->data = data;
    newnode->next = head;
    head = newnode;
}`
    },
    {
        id: 'll-insert-middle',
        topic: 'Linked List',
        title: 'Insert at Middle',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void insertatmiddle(Node* head, int data, int position) {
    Node* newnode = new Node();
    newnode->data = data;
    Node* temp = head;
    while(temp != NULL && temp->data != position) {
        temp = temp->next;
    }

    newnode->next = temp->next;
    temp->next = newnode;
    cout << "Node inserted at middle" << endl;
}`
    },
    {
        id: 'll-display',
        topic: 'Linked List',
        title: 'Display List',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void displaynode(Node* head) {
    Node* temp = head;
    while(temp != NULL) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}`
    },
    {
        id: 'll-delete-node',
        topic: 'Linked List',
        title: 'Delete Value',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void deletenode(Node* head, int data) {
    Node* temp = head;
    while(temp != NULL && temp->data != data) {
        temp = temp->next;
    }
    if(temp == NULL && temp->next == NULL) {
        cout << "Node not found" << endl;
        return;
    } else {
        Node* prev = temp;
        prev->next = temp->next;
        delete temp;
        cout << "Node deleted" << endl;
    }
}`
    },
    {
        id: 'll-delete-end',
        topic: 'Linked List',
        title: 'Delete at End',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void deleteEndNode(Node* head) {
    Node* temp = head;
    while(temp->next->next != NULL) {
        temp = temp->next;
    }
    delete temp->next;
    cout << "End node deleted" << endl;
}`
    },
    {
        id: 'll-delete-begin',
        topic: 'Linked List',
        title: 'Delete at Beginning',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void deleteBeginNode(Node* head) {
    Node* temp = head;
    head = temp->next;
    delete temp;
    cout << "Begin node deleted" << endl;
}`
    },
    {
        id: 'll-reverse',
        topic: 'Linked List',
        title: 'Reverse List',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `Node* reversenode(Node* head) {
    Node* prev = NULL;
    Node* current = head;
    Node* next = NULL;
    while(current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    head = prev;
    return head;
}`,
        explanations: [
            { line: 2, text: "Initialize 'prev' to NULL, as the new tail will point to nothing." },
            { line: 5, text: "Store the next node to avoid losing the reference when breaking the link." },
            { line: 6, text: "Reverse the link: point current node's next to the previous node." },
            { line: 7, text: "Move 'prev' one step forward to the current node." },
            { line: 8, text: "Move 'current' one step forward to the stored next node." },
            { line: 10, text: "Update head to point to the new first node (prev)." }
        ]
    },
    {
        id: 'll-even-odd',
        topic: 'Linked List',
        title: 'Even/Odd Length',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void evenorodd(Node* head) {
    Node* fast = head;
    Node* slow = head;
    while(fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if(fast == NULL) {
        cout << "Even length" << endl;
    } else {
        cout << "Odd length" << endl;
    }
    cout << "Middle element is: " << slow->data << endl;
}`
    },
    {
        id: 'll-loop-detection',
        topic: 'Linked List',
        title: 'Detect Loop',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `bool loopdetection(Node* head) {
    Node* fast = head;
    Node* slow = head;
    while(fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if(fast == slow) {
        return true;
    } else {
        return false;
    }
}`
    },
    {
        id: 'll-loop-beginning',
        topic: 'Linked List',
        title: 'Find Loop Start',
        difficulty: Difficulty.HARD,
        language: 'cpp',
        code: `int loopbeginning(Node* head) {
    Node* fast = head;
    Node* slow = head;
    while(fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if(fast == slow) {
            break;
        }
    }
    slow = head;
    while(slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow->data;
}`
    },
    {
        id: 'll-palindrome',
        topic: 'Linked List',
        title: 'Check Palindrome',
        difficulty: Difficulty.HARD,
        language: 'cpp',
        code: `bool ispalindrome(Node* head) {
    Node* fast = head;
    Node* slow = head;
    while(fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    Node* secondhalf  = slow->next;
    Node* firsthalf = head;
    Node* secondhalf_reverse = reversenode(secondhalf);
    while(secondhalf_reverse != NULL) {
        if(firsthalf->data != secondhalf_reverse->data) {
            return false;
        } else {
            firsthalf = firsthalf->next;
            secondhalf_reverse = secondhalf_reverse->next;
        }
    }
    return true;
}`
    },
    {
        id: 'll-reverse-k',
        topic: 'Linked List',
        title: 'Reverse K Nodes',
        difficulty: Difficulty.HARD,
        language: 'cpp',
        code: `Node* reverseKnodes(Node* head, int k) {
    Node* current = head;
    Node* next = NULL;
    Node* prev = NULL;
    int count = 0;
    while(current != NULL && count < k) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
        count++;
    }
    if(next != NULL) {
        head->next = reverseKnodes(next, k);
    }
    return prev;
}`
    },
    {
        id: 'll-merge-sorted',
        topic: 'Linked List',
        title: 'Merge Sorted Lists',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `Node* mergeTwoSortedLists(Node* head1, Node* head2) {
    Node* dummynode = new Node();
    Node* tail = dummynode;
    while(head1 != NULL && head2 != NULL) {
        if(head1->data < head2->data) {
            tail->next = head1;
            head1 = head1->next;
        } else {
            tail->next = head2;
            head2 = head2->next;
        }
    }
    if(head1 != NULL) {
        tail->next = head1;
    } else {
        tail->next = head2;
    }
    return dummynode->next;
}`
    },

    // --- STACK (C++) ---
    // Stack using Array
    {
        id: 'stack-array-push',
        topic: 'Stack',
        title: 'Stack Array Push',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void push(int arr[], int& top, int x) {
    if(top == 4) {
        cout << "Stack Overflow" << endl;
        return;
    }
    top++;
    arr[top] = x;
}`
    },
    {
        id: 'stack-array-pop',
        topic: 'Stack',
        title: 'Stack Array Pop',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void pop(int& top) {
    if(top == -1) {
        cout << "Stack Underflow" << endl;
        return;
    }
    top--;
}`
    },
    {
        id: 'stack-array-peek',
        topic: 'Stack',
        title: 'Stack Array Top',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `int peek(int arr[], int top) {
    if(top == -1) {
        cout << "Stack is empty" << endl;
        return -1;
    }
    return arr[top];
}`
    },
    {
        id: 'stack-array-empty',
        topic: 'Stack',
        title: 'Stack Array Safe Empty',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `bool isEmpty(int top) {
    return top == -1;
}`
    },

    // Stack using Linked List
    {
        id: 'stack-ll-push',
        topic: 'Stack',
        title: 'Stack LL Push',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void push(Node*& top, int data) {
    Node* newNode = new Node();
    newNode->data = data;
    newNode->next = top;
    top = newNode;
}`
    },
    {
        id: 'stack-ll-pop',
        topic: 'Stack',
        title: 'Stack LL Pop',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void pop(Node*& top) {
    if(top == NULL) {
        cout << "Stack Underflow" << endl;
        return;
    }
    Node* temp = top;
    top = top->next;
    delete temp;
}`
    },
    {
        id: 'stack-ll-peek',
        topic: 'Stack',
        title: 'Stack LL Top',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `int peek(Node* top) {
    if(top == NULL) {
        cout << "Stack is empty" << endl;
        return -1;
    }
    return top->data;
}`
    },
    {
        id: 'stack-ll-empty',
        topic: 'Stack',
        title: 'Stack LL IsEmpty',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `bool isEmpty(Node* top) {
    return top == NULL;
}`
    },

    // --- QUEUE (C++) ---
    {
        id: 'queue-array-enqueue',
        topic: 'Queue',
        title: 'Queue Array Enqueue',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void enqueue(int arr[], int& back, int x) {
    if (back == 99) {
        cout << "Queue Overflow" << endl;
        return;
    }
    back++;
    arr[back] = x;
}`
    },
    {
        id: 'queue-array-dequeue',
        topic: 'Queue',
        title: 'Queue Array Dequeue',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void dequeue(int& front, int back) {
    if (front > back) {
        cout << "Queue Underflow" << endl;
        return;
    }
    front++;
}`
    },
    {
        id: 'queue-array-front',
        topic: 'Queue',
        title: 'Queue Array Front',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `int getFront(int arr[], int front, int back) {
    if (front > back) return -1;
    return arr[front];
}`
    },
    {
        id: 'queue-array-empty',
        topic: 'Queue',
        title: 'Queue Array IsEmpty',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `bool isEmpty(int front, int back) {
    return front > back;
}`
    },

    // Queue using Linked List
    {
        id: 'queue-ll-enqueue',
        topic: 'Queue',
        title: 'Queue LL Enqueue',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void enqueue(Node*& front, Node*& back, int x) {
    Node* newNode = new Node();
    newNode->data = x;
    newNode->next = NULL;
    if (back == NULL) {
        front = back = newNode;
        return;
    }
    back->next = newNode;
    back = newNode;
}`
    },
    {
        id: 'queue-ll-dequeue',
        topic: 'Queue',
        title: 'Queue LL Dequeue',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void dequeue(Node*& front, Node*& back) {
    if (front == NULL) return;
    Node* temp = front;
    front = front->next;
    if (front == NULL) back = NULL;
    delete temp;
}`
    },
    {
        id: 'queue-ll-front',
        topic: 'Queue',
        title: 'Queue LL Front',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `int getFront(Node* front) {
    if (front == NULL) return -1;
    return front->data;
}`
    },
    {
        id: 'queue-ll-empty',
        topic: 'Queue',
        title: 'Queue LL IsEmpty',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `bool isEmpty(Node* front) {
    return front == NULL;
}`
    },

    // --- BINARY SEARCH TREE (C++) ---
    {
        id: 'bst-insert',
        topic: 'Binary Search Tree',
        title: 'Insert Node',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `Node* insert(Node* node, int key) {
    if(node == NULL) return new Node(key);
    if(key < node->key)
        node->left = insert(node->left, key);
    else if(key > node->key)
        node->right = insert(node->right, key);
    return node;
}`
    },

    {
        id: 'bst-struct',
        topic: 'Binary Search Tree',
        title: 'Node Structure',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `struct Node {
    int key;
    Node* left;
    Node* right;
    Node(int k) {
        key = k;
        left = right = NULL;
    }
};`
    },
    {
        id: 'bst-search',
        topic: 'Binary Search Tree',
        title: 'Search Node',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `Node* search(Node* root, int key) {
    if (root == NULL || root->key == key)
       return root;
    if (root->key < key)
       return search(root->right, key);
    return search(root->left, key);
}`
    },
    {
        id: 'bst-preorder',
        topic: 'Binary Search Tree',
        title: 'Preorder Traversal',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void preorder(Node* root) {
    if (root == NULL) return;
    cout << root->key << " ";
    preorder(root->left);
    preorder(root->right);
}`
    },
    {
        id: 'bst-inorder',
        topic: 'Binary Search Tree',
        title: 'Inorder Traversal',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void inorder(Node* root) {
    if (root == NULL) return;
    inorder(root->left);
    cout << root->key << " ";
    inorder(root->right);
}`
    },
    {
        id: 'bst-postorder',
        topic: 'Binary Search Tree',
        title: 'Postorder Traversal',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void postorder(Node* root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->key << " ";
}`
    },

    {
        id: 'bst-delete',
        topic: 'Binary Search Tree',
        title: 'Delete Node',
        difficulty: Difficulty.HARD,
        language: 'cpp',
        code: `Node* minValueNode(Node* node) {
    Node* current = node;
    while (current && current->left != NULL)
        current = current->left;
    return current;
}

Node* deleteNode(Node* root, int key) {
    if (root == NULL) return root;
    if (key < root->key)
        root->left = deleteNode(root->left, key);
    else if (key > root->key)
        root->right = deleteNode(root->right, key);
    else {
        if (root->left == NULL) {
            Node* temp = root->right;
            delete root;
            return temp;
        } else if (root->right == NULL) {
            Node* temp = root->left;
            delete root;
            return temp;
        }
        Node* temp = minValueNode(root->right);
        root->key = temp->key;
        root->right = deleteNode(root->right, temp->key);
    }
    return root;
}`
    },
    {
        id: 'bst-levelorder',
        topic: 'Binary Search Tree',
        title: 'Level Order Traversal',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void levelOrder(Node* root) {
    if (root == NULL) return;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* node = q.front();
        cout << node->key << " ";
        q.pop();
        if (node->left != NULL)
            q.push(node->left);
        if (node->right != NULL)
            q.push(node->right);
    }
}`
    },

    // --- GRAPH (C++) ---
    {
        id: 'graph-bfs',
        topic: 'Graph',
        title: 'BFS Traversal',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void bfs(int startNode, vector<int> adj[], int V) {
    bool visited[V];
    for(int i = 0; i < V; i++) visited[i] = false;
    
    queue<int> q;
    visited[startNode] = true;
    q.push(startNode);
    
    while(!q.empty()) {
        int curr = q.front();
        q.pop();
        cout << curr << " ";
        
        for(int neighbor : adj[curr]) {
            if(!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`
    },
    {
        id: 'graph-adj-list',
        topic: 'Graph',
        title: 'Adjacency List',
        difficulty: Difficulty.EASY,
        language: 'cpp',
        code: `void addEdge(vector < int > adj[], int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u); // Remove for directed graph
    }`
    },
    {
        id: 'graph-dfs',
        topic: 'Graph',
        title: 'DFS Traversal',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void dfsRecursive(int curr, vector < int > adj[], bool visited[]) {
        visited[curr] = true;
        cout << curr << " ";

for (int neighbor : adj[curr]) {
    if (!visited[neighbor]) {
        dfsRecursive(neighbor, adj, visited);
    }
}
}

void dfs(int startNode, vector < int > adj[], int V) {
    bool visited[V];
    for (int i = 0; i < V; i++) visited[i] = false;
    dfsRecursive(startNode, adj, visited);
} `
    },
    {
        id: 'merge-sort',
        topic: 'Merge Sort',
        title: 'Merge Sort Recursive',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
    },
    {
        id: 'quick-sort',
        topic: 'Quick Sort',
        title: 'Quick Sort Recursive',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    },
    {
        id: 'heap-ops',
        topic: 'Heap',
        title: 'Max Heap Operations',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void insertNode(int arr[], int& n, int Key) {
    n = n + 1;
    arr[n - 1] = Key;
    int i = n - 1;
    while (i > 0 && arr[(i - 1) / 2] < arr[i]) {
        swap(arr[i], arr[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

void deleteRoot(int arr[], int& n) {
    int lastElement = arr[n - 1];
    arr[0] = lastElement;
    n = n - 1;
    heapify(arr, n, 0);
}`
    },
    {
        id: 'min-heap-ops',
        topic: 'Heap',
        title: 'Min Heap Operations',
        difficulty: Difficulty.MEDIUM,
        language: 'cpp',
        code: `void minHeapify(int arr[], int n, int i) {
    int smallest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] < arr[smallest]) smallest = l;
    if (r < n && arr[r] < arr[smallest]) smallest = r;
    if (smallest != i) {
        swap(arr[i], arr[smallest]);
        minHeapify(arr, n, smallest);
    }
}

void insertNode(int arr[], int& n, int Key) {
    n = n + 1;
    arr[n - 1] = Key;
    int i = n - 1;
    while (i > 0 && arr[(i - 1) / 2] > arr[i]) {
        swap(arr[i], arr[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

void deleteRoot(int arr[], int& n) {
    int lastElement = arr[n - 1];
    arr[0] = lastElement;
    n = n - 1;
    minHeapify(arr, n, 0);
}`
    },
    {
        id: 'trie-ops',
        topic: 'Trie',
        title: 'Trie Operations',
        difficulty: Difficulty.HARD,
        language: 'cpp',
        code: `struct TrieNode {
    struct TrieNode *children[26];
    bool isEndOfWord;
};

struct TrieNode *getNode(void) {
    struct TrieNode *pNode =  new TrieNode;
    pNode->isEndOfWord = false;
    for (int i = 0; i < 26; i++) pNode->children[i] = NULL;
    return pNode;
}

void insert(struct TrieNode *root, string key) {
    struct TrieNode *pCrawl = root;
    for (int i = 0; i < key.length(); i++) {
        int index = key[i] - 'a';
        if (!pCrawl->children[index]) pCrawl->children[index] = getNode();
        pCrawl = pCrawl->children[index];
    }
    pCrawl->isEndOfWord = true;
}

bool search(struct TrieNode *root, string key) {
    struct TrieNode *pCrawl = root;
    for (int i = 0; i < key.length(); i++) {
        int index = key[i] - 'a';
        if (!pCrawl->children[index]) return false;
        pCrawl = pCrawl->children[index];
    }
    return (pCrawl != NULL && pCrawl->isEndOfWord);
}`
    },

    // ================= JAVA SNIPPETS =================

    // --- ARRAY (Java) ---
    {
        id: 'array-insert-java',
        topic: 'Array',
        title: 'Insert Element',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int insert(int[] arr, int n, int pos, int x) {
    for (int i = n; i > pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos] = x;
    return n + 1;
} `,
        explanations: [
            { line: 1, text: "Methods takes array, current size n, pos and value x. Returns new size." },
            { line: 2, text: "Shift elements to the right to make space." }
        ]
    },
    {
        id: 'array-delete-java',
        topic: 'Array',
        title: 'Delete Element',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int deleteElement(int[] arr, int n, int pos) {
    for (int i = pos; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    return n - 1;
} `,
        explanations: [
            { line: 1, text: "Shifts elements left to cover the deleted index." },
            { line: 4, text: "Returns the new size of the array." }
        ]
    },
    {
        id: 'array-linear-search-java',
        topic: 'Array',
        title: 'Linear Search',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int linearSearch(int[] arr, int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) return i;
    }
    return -1;
} `
    },
    {
        id: 'array-binary-search-java',
        topic: 'Array',
        title: 'Binary Search',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public int binarySearch(int[] arr, int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
} `
    },
    {
        id: 'array-reverse-java',
        topic: 'Array',
        title: 'Reverse Array',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void reverseArray(int[] arr, int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
} `
    },
    {
        id: 'array-bubble-sort-java',
        topic: 'Array',
        title: 'Bubble Sort',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void bubbleSort(int[] arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
} `
    },

    // --- LINKED LIST (Java) ---
    {
        id: 'll-struct-java',
        topic: 'Linked List',
        title: 'Node Structure',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `class Node {
    int data;
    Node next;

    Node(int d) {
        data = d;
        next = null;
    }
} `,
        explanations: [
            { line: 1, text: "Standard Java Class definition for a Node." },
            { line: 3, text: "Reference to the next Node object (initialized to null)." }
        ]
    },
    {
        id: 'll-insert-end-java',
        topic: 'Linked List',
        title: 'Insert at End',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public Node insertAtEnd(Node head, int data) {
    Node newNode = new Node(data);
    if (head == null) {
        return newNode;
    }
    Node temp = head;
    while (temp.next != null) {
        temp = temp.next;
    }
    temp.next = newNode;
    return head;
} `
    },
    {
        id: 'll-insert-begin-java',
        topic: 'Linked List',
        title: 'Insert at Beginning',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public Node insertAtBegin(Node head, int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    return newNode;
} `
    },
    {
        id: 'll-delete-java',
        topic: 'Linked List',
        title: 'Delete Value',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public Node deleteNode(Node head, int key) {
    Node temp = head, prev = null;
    if (temp != null && temp.data == key) {
        return temp.next;
    }
    while (temp != null && temp.data != key) {
        prev = temp;
        temp = temp.next;
    }
    if (temp == null) return head;
    prev.next = temp.next;
    return head;
} `
    },
    {
        id: 'll-reverse-java',
        topic: 'Linked List',
        title: 'Reverse List',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public Node reverse(Node head) {
    Node prev = null;
    Node current = head;
    Node next = null;
    while (current != null) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
} `
    },
    {
        id: 'll-detect-loop-java',
        topic: 'Linked List',
        title: 'Detect Loop',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public boolean detectLoop(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
} `
    },

    // --- STACK (Java) ---
    // Stack using Array
    {
        id: 'stack-array-push-java',
        topic: 'Stack',
        title: 'Stack Array Push',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public boolean push(int[] a, int top, int x) {
    if (top >= (MAX - 1)) {
        System.out.println("Stack Overflow");
        return false;
    } else {
        a[++top] = x;
        return true;
    }
} `
    },
    {
        id: 'stack-array-pop-java',
        topic: 'Stack',
        title: 'Stack Array Pop',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int pop(int[] a, int top) {
    if (top < 0) {
        System.out.println("Stack Underflow");
        return 0;
    } else {
        int x = a[top--];
        return x;
    }
} `
    },
    {
        id: 'stack-array-peek-java',
        topic: 'Stack',
        title: 'Stack Array Peek',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int peek(int[] a, int top) {
    if (top < 0) return -1;
    return a[top];
} `
    },
    {
        id: 'stack-array-empty-java',
        topic: 'Stack',
        title: 'Stack Array IsEmpty',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public boolean isEmpty(int top) {
    return (top < 0);
} `
    },

    // Stack using Linked List
    {
        id: 'stack-ll-push-java',
        topic: 'Stack',
        title: 'Stack LL Push',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void push(Node top, int x) {
    Node temp = new Node(x);
    temp.next = top;
    top = temp;
} `
    },
    {
        id: 'stack-ll-pop-java',
        topic: 'Stack',
        title: 'Stack LL Pop',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void pop(Node top) {
    if (top == null) {
        System.out.print("Stack Underflow");
        return;
    }
    top = (top).next;
} `
    },
    {
        id: 'stack-ll-peek-java',
        topic: 'Stack',
        title: 'Stack LL Peek',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int peek(Node top) {
    if (!isEmpty(top)) {
        return top.data;
    } else {
        System.out.println("Stack is empty");
        return -1;
    }
} `
    },
    {
        id: 'stack-ll-empty-java',
        topic: 'Stack',
        title: 'Stack LL IsEmpty',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public boolean isEmpty(Node top) {
    return top == null;
} `
    },

    // --- QUEUE (Java) ---
    {
        id: 'queue-ll-java',
        topic: 'Queue',
        title: 'Queue using Linked List',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `class QueueNode {
    int key;
    QueueNode next;
    public QueueNode(int key) {
        this.key = key;
        this.next = null;
    }
}

class Queue {
    QueueNode front, rear;

    public Queue() {
        this.front = this.rear = null;
    }

    void enqueue(int key) {
        QueueNode temp = new QueueNode(key);
        if (this.rear == null) {
            this.front = this.rear = temp;
            return;
        }
        this.rear.next = temp;
        this.rear = temp;
    }

    void dequeue() {
        if (this.front == null) return;
        QueueNode temp = this.front;
        this.front = this.front.next;
        if (this.front == null) this.rear = null;
    }
}`
    },
    {
        id: 'queue-array-enqueue-java',
        topic: 'Queue',
        title: 'Queue Array Enqueue',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void enqueue(int[] arr, int rear, int x, int MAX) {
    if (rear == MAX - 1) {
        System.out.println("Queue Overflow");
        return;
    }
    arr[++rear] = x;
} `
    },
    {
        id: 'queue-array-dequeue-java',
        topic: 'Queue',
        title: 'Queue Array Dequeue',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int dequeue(int[] arr, int front, int rear) {
    if (front > rear) {
        System.out.println("Queue Underflow");
        return -1;
    }
    return arr[front++];
} `
    },
    {
        id: 'queue-array-front-java',
        topic: 'Queue',
        title: 'Queue Array Front',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int getFront(int[] arr, int front, int rear) {
    if (front > rear) return -1;
    return arr[front];
} `
    },
    {
        id: 'queue-array-empty-java',
        topic: 'Queue',
        title: 'Queue Array IsEmpty',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public boolean isEmpty(int front, int rear) {
    return front > rear;
} `
    },
    {
        id: 'queue-ll-enqueue-java',
        topic: 'Queue',
        title: 'Queue LL Enqueue',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void enqueue(Node front, Node rear, int data) {
    Node newNode = new Node(data);
    if (rear == null) {
        front = rear = newNode;
        return;
    }
    rear.next = newNode;
    rear = newNode;
} `
    },
    {
        id: 'queue-ll-dequeue-java',
        topic: 'Queue',
        title: 'Queue LL Dequeue',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void dequeue(Node front, Node rear) {
    if (front == null) return;
    Node temp = front;
    front = front.next;
    if (front == null) rear = null;
} `
    },
    {
        id: 'queue-ll-front-java',
        topic: 'Queue',
        title: 'Queue LL Front',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public int getFront(Node front) {
    if (front == null) return -1;
    return front.data;
} `
    },
    {
        id: 'queue-ll-empty-java',
        topic: 'Queue',
        title: 'Queue LL IsEmpty',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public boolean isEmpty(Node front) {
    return front == null;
} `
    },

    // --- SORTING (Java) ---
    {
        id: 'merge-sort-java',
        topic: 'Merge Sort',
        title: 'Merge Sort Recursive',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[] = new int[n1];
    int R[] = new int[n2];
    for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
    for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

public void sort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        sort(arr, l, m);
        sort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
    },
    {
        id: 'quick-sort-java',
        topic: 'Quick Sort',
        title: 'Quick Sort Recursive',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}

public void sort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        sort(arr, low, pi - 1);
        sort(arr, pi + 1, high);
    }
}`
    },

    // --- HEAP (Java) ---
    {
        id: 'heap-ops-java',
        topic: 'Heap',
        title: 'Max Heap Operations',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}

public void insert(int arr[], int n, int key) {
    n = n + 1;
    arr[n - 1] = key;
    int i = n - 1;
    while (i > 0 && arr[(i - 1) / 2] < arr[i]) {
        int swap = arr[i];
        arr[i] = arr[(i - 1) / 2];
        arr[(i - 1) / 2] = swap;
        i = (i - 1) / 2;
    }
}

public void deleteRoot(int arr[], int n) {
    int lastElement = arr[n - 1];
    arr[0] = lastElement;
    n = n - 1;
    heapify(arr, n, 0);
}`
    },
    {
        id: 'min-heap-ops-java',
        topic: 'Heap',
        title: 'Min Heap Operations',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public void minHeapify(int arr[], int n, int i) {
    int smallest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] < arr[smallest]) smallest = l;
    if (r < n && arr[r] < arr[smallest]) smallest = r;
    if (smallest != i) {
        int swap = arr[i];
        arr[i] = arr[smallest];
        arr[smallest] = swap;
        minHeapify(arr, n, smallest);
    }
}

public void insert(int arr[], int n, int key) {
    n = n + 1;
    arr[n - 1] = key;
    int i = n - 1;
    while (i > 0 && arr[(i - 1) / 2] > arr[i]) {
        int swap = arr[i];
        arr[i] = arr[(i - 1) / 2];
        arr[(i - 1) / 2] = swap;
        i = (i - 1) / 2;
    }
}

public void deleteRoot(int arr[], int n) {
    int lastElement = arr[n - 1];
    arr[0] = lastElement;
    n = n - 1;
    minHeapify(arr, n, 0);
}`
    },

    // --- BST (Java) ---
    {
        id: 'bst-insert-java',
        topic: 'Binary Search Tree',
        title: 'Insert Node',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public Node insert(Node root, int key) {
    if (root == null) {
        root = new Node(key);
        return root;
    }
    if (key < root.key)
        root.left = insert(root.left, key);
    else if (key > root.key)
        root.right = insert(root.right, key);
    return root;
} `
    },
    {
        id: 'bst-inorder-java',
        topic: 'Binary Search Tree',
        title: 'Inorder Traversal',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void inorder(Node root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.key + " ");
    inorder(root.right);
} `
    },

    {
        id: 'bst-struct-java',
        topic: 'Binary Search Tree',
        title: 'Node Structure',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `class Node {
    int key;
    Node left, right;

    public Node(int item) {
        key = item;
        left = right = null;
    }
} `
    },
    {
        id: 'bst-search-java',
        topic: 'Binary Search Tree',
        title: 'Search Node',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public Node search(Node root, int key) {
    if (root == null || root.key == key)
        return root;
    if (root.key < key)
        return search(root.right, key);
    return search(root.left, key);
} `
    },
    {
        id: 'bst-preorder-java',
        topic: 'Binary Search Tree',
        title: 'Preorder Traversal',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void preorder(Node root) {
    if (root == null) return;
    System.out.print(root.key + " ");
    preorder(root.left);
    preorder(root.right);
} `
    },
    {
        id: 'bst-postorder-java',
        topic: 'Binary Search Tree',
        title: 'Postorder Traversal',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void postorder(Node root) {
    if (root == null) return;
    postorder(root.left);
    postorder(root.right);
    System.out.print(root.key + " ");
} `
    },

    {
        id: 'bst-delete-java',
        topic: 'Binary Search Tree',
        title: 'Delete Node',
        difficulty: Difficulty.HARD,
        language: 'java',
        code: `Node minValueNode(Node node) {
    Node current = node;
    while (current.left != null)
        current = current.left;
    return current;
}

public Node deleteNode(Node root, int key) {
    if (root == null) return root;
    if (key < root.key)
        root.left = deleteNode(root.left, key);
    else if (key > root.key)
        root.right = deleteNode(root.right, key);
    else {
        if (root.left == null)
            return root.right;
        else if (root.right == null)
            return root.left;
        Node temp = minValueNode(root.right);
        root.key = temp.key;
        root.right = deleteNode(root.right, temp.key);
    }
    return root;
} `
    },
    {
        id: 'bst-levelorder-java',
        topic: 'Binary Search Tree',
        title: 'Level Order Traversal',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public void levelOrder(Node root) {
    if (root == null) return;
    Queue < Node > queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        Node tempNode = queue.poll();
        System.out.print(tempNode.key + " ");
        if (tempNode.left != null) {
            queue.add(tempNode.left);
        }
        if (tempNode.right != null) {
            queue.add(tempNode.right);
        }
    }
} `
    },

    // --- TRIE (Java) ---
    {
        id: 'trie-ops-java',
        topic: 'Trie',
        title: 'Trie Operations',
        difficulty: Difficulty.HARD,
        language: 'java',
        code: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord;
}

public void insert(TrieNode root, String key) {
    TrieNode pCrawl = root;
    for (int i = 0; i < key.length(); i++) {
        int index = key.charAt(i) - 'a';
        if (pCrawl.children[index] == null)
            pCrawl.children[index] = new TrieNode();
        pCrawl = pCrawl.children[index];
    }
    pCrawl.isEndOfWord = true;
}

public boolean search(TrieNode root, String key) {
    TrieNode pCrawl = root;
    for (int i = 0; i < key.length(); i++) {
        int index = key.charAt(i) - 'a';
        if (pCrawl.children[index] == null)
            return false;
        pCrawl = pCrawl.children[index];
    }
    return (pCrawl != null && pCrawl.isEndOfWord);
} `
    },

    // --- GRAPH (Java) ---
    {
        id: 'graph-bfs-java',
        topic: 'Graph',
        title: 'BFS Traversal',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public void bfs(int startNode, ArrayList < ArrayList < Integer >> adj, int V) {
    boolean visited[] = new boolean[V];
    LinkedList < Integer > queue = new LinkedList<Integer>();

    visited[startNode] = true;
    queue.add(startNode);

    while (queue.size() != 0) {
        startNode = queue.poll();
        System.out.print(startNode + " ");

        for (Integer n : adj.get(startNode)) {
            if (!visited[n]) {
                visited[n] = true;
                queue.add(n);
            }
        }
    }
} `,
        explanations: [
            { line: 1, text: "Uses ArrayList of ArrayLists for adjacency list representation." },
            { line: 3, text: "LinkedList implements Queue interface in Java." },
            { line: 9, text: "Poll retrieves and removes the head (first element) of the queue." }
        ]
    },
    {
        id: 'graph-dfs-java',
        topic: 'Graph',
        title: 'DFS Recursive',
        difficulty: Difficulty.MEDIUM,
        language: 'java',
        code: `public void dfs(int v, boolean visited[], ArrayList < ArrayList < Integer >> adj) {
    visited[v] = true;
    System.out.print(v + " ");
    for (Integer n : adj.get(v)) {
        if (!visited[n])
            dfs(n, visited, adj);
    }
} `
    },
    {
        id: 'graph-adj-list-java',
        topic: 'Graph',
        title: 'Adjacency List',
        difficulty: Difficulty.EASY,
        language: 'java',
        code: `public void addEdge(ArrayList < ArrayList < Integer >> adj, int u, int v) {
    adj.get(u).add(v);
    adj.get(v).add(u); // Remove for directed graph
} `
    }
];

// Helper to get available operations for a topic, filtered by language
export const getOperationsForTopic = (topic: string, language: Language = 'cpp'): string[] => {
    const snippets = DEFAULT_SNIPPETS.filter(s => s.topic === topic && s.language === language);
    const titles = snippets.map(s => s.title).filter((t): t is string => !!t);
    // Remove duplicates
    return Array.from(new Set(titles));
};
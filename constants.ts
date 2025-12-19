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
  {
    id: 'stack-array',
    topic: 'Stack',
    title: 'Stack using Array',
    difficulty: Difficulty.MEDIUM,
    language: 'cpp',
    code: `#include <iostream>
#include <stack>
using namespace std;

class Stack{
    int arr[5]; //static array of size 5
    int top;

    public:
    Stack(){ 
        top = -1; //initial index of top is -1
    }

    void push(int x){ //pushes a new element into the stack
        if(top == 4){
            cout << "stack overflow";
            return;
        } else {
            top++;
            arr[top] = x;
        }
    }  

    bool isempty(){ //checks if the stack is empty
        if(top == -1){
            return true;
        } else {
            return false;
        }
    }

    void pop(){ //pops the top element from the stack
        if(isempty()){ 
            cout << "stack underflow" << endl;
            return;
        } else {
            top--;
        }
    }

    int peek(){ //returns the top element of the stack
        if(isempty()){
            cout << "stack is empty" << endl;
            return -1;
        } else {
            return arr[top];
        }
    }
};`
  },
  {
    id: 'stack-linked-list',
    topic: 'Stack',
    title: 'Stack using Linked List',
    difficulty: Difficulty.MEDIUM,
    language: 'cpp',
    code: `class Stack{
    Node* top; 
    public:
    Stack(){
        top = NULL; 
    }

    void push(int data){ 
        Node* newnode = new Node();
        newnode->data = data;
        newnode->next = top;
        top = newnode;
    }

    void pop(){ 
        if(top == NULL){
            cout << "Stack is empty" << endl;
            return;
        } else {
            Node* temp = top;
            top = temp->next;
            delete temp;
        }
    }

    bool isempty(){ 
        if(top == NULL) return true;
        else return false;
    }
};`
  },

  // --- QUEUE (C++) ---
  {
    id: 'queue-array',
    topic: 'Queue',
    title: 'Queue using Array',
    difficulty: Difficulty.MEDIUM,
    language: 'cpp',
    code: `class Queue {
    int* arr;
    int front, back;

    public:
    Queue() {
        arr = new int[100];
        front = -1;
        back = -1;
    }

    void push(int x) {
        if (back == 99) {
            cout << "Queue Overflow" << endl;
            return;
        }
        back++;
        arr[back] = x;
        if (front == -1) front++;
    }

    void pop() {
        if (front == -1 || front > back) {
            cout << "No elements" << endl;
            return;
        }
        front++;
    }

    int peek() {
        if (front == -1 || front > back) return -1;
        return arr[front];
    }
};`
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
}`,
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
}`,
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
}`
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
}`
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
}`
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
}`
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
}`,
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
}`
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
}`
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
}`
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
}`
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
}`
  },

  // --- STACK (Java) ---
  {
    id: 'stack-array-java',
    topic: 'Stack',
    title: 'Stack using Array',
    difficulty: Difficulty.MEDIUM,
    language: 'java',
    code: `class Stack {
    static final int MAX = 1000;
    int top;
    int a[] = new int[MAX];

    Stack() {
        top = -1;
    }

    boolean push(int x) {
        if (top >= (MAX - 1)) {
            System.out.println("Stack Overflow");
            return false;
        } else {
            a[++top] = x;
            return true;
        }
    }

    int pop() {
        if (top < 0) {
            System.out.println("Stack Underflow");
            return 0;
        } else {
            int x = a[top--];
            return x;
        }
    }

    int peek() {
        if (top < 0) return -1;
        return a[top];
    }
}`
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
}`
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
}`
  },

  // --- GRAPH (Java) ---
  {
    id: 'graph-bfs-java',
    topic: 'Graph',
    title: 'BFS Traversal',
    difficulty: Difficulty.MEDIUM,
    language: 'java',
    code: `public void bfs(int startNode, ArrayList<ArrayList<Integer>> adj, int V) {
    boolean visited[] = new boolean[V];
    LinkedList<Integer> queue = new LinkedList<Integer>();

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
}`,
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
    code: `public void dfs(int v, boolean visited[], ArrayList<ArrayList<Integer>> adj) {
    visited[v] = true;
    System.out.print(v + " ");
    for (Integer n : adj.get(v)) {
        if (!visited[n])
            dfs(n, visited, adj);
    }
}`
  }
];

// Helper to get available operations for a topic, filtered by language
export const getOperationsForTopic = (topic: string, language: Language = 'cpp'): string[] => {
  const snippets = DEFAULT_SNIPPETS.filter(s => s.topic === topic && s.language === language);
  const titles = snippets.map(s => s.title).filter((t): t is string => !!t);
  // Remove duplicates
  return Array.from(new Set(titles));
};
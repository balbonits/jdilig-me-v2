---
id: state-management-cheat-sheet
slug: state-management-cheat-sheet
title: State Management Cheat Sheet
description: Complete guide to React state management patterns including Redux, Zustand, Context API, and core React state.
detailedDescription: Comprehensive state management interview guide covering Redux Toolkit, Zustand, React Context API, useReducer patterns, and comparison of different state management approaches with practical examples.
category: interview-prep
tags: [State Management, Redux, Zustand, Context API, React, useReducer]
difficulty: intermediate
lastUpdated: 2025-01-10
searchKeywords: [state, redux, zustand, context, usereducer, state management, react]
---

# State Management Cheat Sheet

## 📚 Core Concepts

### Redux Data Flow
```
┌─────────────┐    dispatch(action)    ┌─────────────┐
│             │ ─────────────────────► │             │
│ Component   │                        │   Store     │
│             │ ◄───────────────────── │             │
└─────────────┘     state update       └─────────────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │   Reducer   │
                                       │ (newState)  │
                                       └─────────────┘
                                              ▲
                                              │
                                       ┌─────────────┐
                                       │   Action    │
                                       │ {type, ...} │
                                       └─────────────┘
```

### State Management Comparison

| Solution | Complexity | Learning Curve | Bundle Size | Best For | Pros | Cons |
|----------|------------|----------------|-------------|----------|------|------|
| **useState** | Low | Minimal | Built-in | Local component state | Simple, fast, no deps | Limited to component scope |
| **useReducer** | Medium | Low | Built-in | Complex local state | Predictable, testable | More boilerplate |
| **Context API** | Medium | Medium | Built-in | Avoiding prop drilling | No external deps | Performance issues, provider hell |
| **Zustand** | Low | Low | ~8KB | Global state, simple apps | Minimal boilerplate, TypeScript | Less ecosystem |
| **Redux Toolkit** | High | High | ~45KB | Complex apps, time travel | DevTools, ecosystem, predictable | Lots of boilerplate |
| **Jotai** | Medium | Medium | ~13KB | Atomic state management | Fine-grained updates | Different mental model |

## 📚 Core Concepts

### React Core State Management

### useState - Local Component State
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });
  
  // Functional updates for dependent state
  const increment = () => setCount(prev => prev + 1);
  
  // Object state updates (immutable)
  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      
      <input
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
      />
    </div>
  );
}
```

### useReducer - Complex State Logic
```jsx
import { useReducer } from 'react';

// State shape
const initialState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all'
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ITEMS: 'SET_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_FILTER: 'SET_FILTER',
  SET_ERROR: 'SET_ERROR'
};

// Reducer function (pure, predictable)
function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };
    
    case ACTIONS.SET_ITEMS:
      return { ...state, items: action.payload, loading: false };
    
    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { id: Date.now(), ...action.payload }]
      };
    
    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  const addTodo = (text) => {
    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: { text, completed: false }
    });
  };
  
  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };
  
  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <FilterButtons filter={state.filter} onFilterChange={setFilter} />
      <TodoList items={state.items} />
      {state.error && <Error message={state.error} />}
    </div>
  );
}
```

### Context API - Global State
```jsx
import { createContext, useContext, useReducer } from 'react';

// 1. Create Context
const AppContext = createContext();

// 2. Provider Component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const value = {
    ...state,
    dispatch,
    // Derived values
    completedItems: state.items.filter(item => item.completed),
    activeItems: state.items.filter(item => !item.completed)
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// 3. Custom Hook for Context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

// 4. Usage in Components
function TodoList() {
  const { items, dispatch } = useAppContext();
  
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_ITEM', payload: id });
  };
  
  return (
    <ul>
      {items.map(item => (
        <TodoItem key={item.id} item={item} onToggle={toggleTodo} />
      ))}
    </ul>
  );
}
```

## Redux & Redux Toolkit¹

### Modern Redux with Redux Toolkit
```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

// 1. Create Slice (combines actions + reducer)
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all',
    loading: false
  },
  reducers: {
    // Redux Toolkit uses Immer internally - can "mutate" state
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    
    removeTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

// 2. Export actions (auto-generated)
export const { addTodo, toggleTodo, removeTodo, setFilter, setLoading } = todoSlice.actions;

// 3. Configure Store
const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    // Add other slices here
  },
  // Redux DevTools enabled by default in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Redux with React
```jsx
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, setFilter } from './todoSlice';

function TodoApp() {
  const dispatch = useDispatch();
  
  // Select state slices (component only re-renders when selected data changes)
  const todos = useSelector((state: RootState) => state.todos.items);
  const filter = useSelector((state: RootState) => state.todos.filter);
  const loading = useSelector((state: RootState) => state.todos.loading);
  
  // Memoized selectors for derived data
  const filteredTodos = useSelector((state: RootState) => {
    const { items, filter } = state.todos;
    if (filter === 'completed') return items.filter(item => item.completed);
    if (filter === 'active') return items.filter(item => !item.completed);
    return items;
  });
  
  const handleAddTodo = (text: string) => {
    dispatch(addTodo(text));
  };
  
  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };
  
  return (
    <div>
      <TodoForm onAdd={handleAddTodo} />
      <FilterTabs current={filter} onChange={(f) => dispatch(setFilter(f))} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TodoList items={filteredTodos} onToggle={handleToggle} />
      )}
    </div>
  );
}
```

### Async Actions with Redux Toolkit
```jsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Async Thunk
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (todoText: string) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: todoText })
    });
    return await response.json();
  }
);

// 2. Handle async states in slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    // ... synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add todo
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

// 3. Usage in components
function TodoContainer({ userId }: { userId: string }) {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.todos);
  
  useEffect(() => {
    dispatch(fetchTodos(userId));
  }, [dispatch, userId]);
  
  const handleAddTodo = (text: string) => {
    dispatch(addTodoAsync(text));
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <TodoList items={items} onAdd={handleAddTodo} />;
}
```

## Zustand - Simple State Management²

### Basic Zustand Store
```jsx
import { create } from 'zustand';

// 1. Create Store
const useBearStore = create((set, get) => ({
  // State
  bears: 0,
  fish: 0,
  
  // Actions
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  
  // Async actions
  fetchBears: async () => {
    const response = await fetch('/api/bears');
    const bears = await response.json();
    set({ bears: bears.length });
  },
  
  // Computed values
  get totalAnimals() {
    return get().bears + get().fish;
  }
}));

// 2. Use in Components
function BearCounter() {
  // Select specific state (component only re-renders when bears changes)
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  
  return (
    <div>
      <h1>{bears} around here...</h1>
      <button onClick={increasePopulation}>Add bear</button>
    </div>
  );
}

function Controls() {
  const { removeAllBears, fetchBears } = useBearStore((state) => ({
    removeAllBears: state.removeAllBears,
    fetchBears: state.fetchBears
  }));
  
  return (
    <div>
      <button onClick={removeAllBears}>Remove bears</button>
      <button onClick={fetchBears}>Fetch bears</button>
    </div>
  );
}
```

### Advanced Zustand Patterns
```jsx
import { create } from 'zustand';
import { subscribeWithSelector, persist, devtools } from 'zustand/middleware';

// Complex store with middleware
const useAppStore = create(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        // User state
        user: null,
        isAuthenticated: false,
        
        // UI state
        theme: 'light',
        sidebarOpen: false,
        
        // Data state
        todos: [],
        filter: 'all',
        
        // Actions
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        logout: () => set({ user: null, isAuthenticated: false }),
        
        toggleTheme: () => set((state) => ({ 
          theme: state.theme === 'light' ? 'dark' : 'light' 
        })),
        
        toggleSidebar: () => set((state) => ({ 
          sidebarOpen: !state.sidebarOpen 
        })),
        
        addTodo: (todo) => set((state) => ({ 
          todos: [...state.todos, { id: Date.now(), ...todo }] 
        })),
        
        removeTodo: (id) => set((state) => ({ 
          todos: state.todos.filter(todo => todo.id !== id) 
        })),
        
        setFilter: (filter) => set({ filter }),
        
        // Computed selectors
        get filteredTodos() {
          const { todos, filter } = get();
          if (filter === 'completed') return todos.filter(t => t.completed);
          if (filter === 'active') return todos.filter(t => !t.completed);
          return todos;
        },
        
        get stats() {
          const todos = get().todos;
          return {
            total: todos.length,
            completed: todos.filter(t => t.completed).length,
            active: todos.filter(t => !t.completed).length
          };
        }
      })),
      {
        name: 'app-storage', // localStorage key
        partialize: (state) => ({ 
          theme: state.theme, 
          todos: state.todos 
        }) // Only persist specific fields
      }
    ),
    { name: 'app-store' } // Redux DevTools name
  )
);

// Subscribe to specific state changes
useAppStore.subscribe(
  (state) => state.theme,
  (theme) => {
    document.documentElement.className = theme;
  }
);
```

### Zustand with TypeScript
```typescript
import { create } from 'zustand';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  setFilter: (filter: TodoState['filter']) => void;
  
  // Computed properties
  filteredTodos: Todo[];
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: 'all',
  
  addTodo: (text: string) => set((state) => ({
    todos: [...state.todos, { 
      id: Date.now(), 
      text, 
      completed: false 
    }]
  })),
  
  toggleTodo: (id: number) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  removeTodo: (id: number) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  
  setFilter: (filter) => set({ filter }),
  
  get filteredTodos() {
    const { todos, filter } = get();
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  },
  
  get stats() {
    const todos = get().todos;
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      active: todos.filter(t => !t.completed).length
    };
  }
}));
```

## State Management Comparison

### When to Use Each Approach

| Solution | Best For | Pros | Cons |
|----------|----------|------|------|
| **useState** | Local component state, simple forms | Simple, built-in, fast | Limited to component scope |
| **useReducer** | Complex local state, state machines | Predictable, testable, dispatch pattern | More boilerplate than useState |
| **Context API** | Theme, auth, moderate global state | Built-in, no dependencies | Can cause unnecessary re-renders |
| **Redux Toolkit** | Large apps, time-travel debugging | Mature ecosystem, DevTools, predictable | Learning curve, boilerplate |
| **Zustand** | Simple global state, small to medium apps | Minimal boilerplate, TypeScript friendly | Smaller ecosystem |

### Performance Considerations

```jsx
// ❌ Context causing unnecessary re-renders
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  
  // All consumers re-render when ANY value changes
  const value = { user, setUser, theme, setTheme, cart, setCart };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ✅ Split contexts by update frequency
const UserContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();

// ✅ Or use Zustand selectors
function UserProfile() {
  // Only re-renders when user changes
  const user = useStore(state => state.user);
  return <div>{user.name}</div>;
}

function ThemeToggle() {
  // Only re-renders when theme changes  
  const theme = useStore(state => state.theme);
  const setTheme = useStore(state => state.setTheme);
  return <button onClick={() => setTheme()}>{theme}</button>;
}
```

### Testing State Management

```jsx
// Testing Redux
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

function renderWithRedux(component, initialState = {}) {
  const store = configureStore({
    reducer: { todos: todoSlice.reducer },
    preloadedState: initialState
  });
  
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
}

test('adds new todo', () => {
  const { store } = renderWithRedux(<TodoApp />);
  
  fireEvent.click(screen.getByText('Add Todo'));
  
  expect(store.getState().todos.items).toHaveLength(1);
});

// Testing Zustand
import { act, renderHook } from '@testing-library/react';

test('zustand store', () => {
  const { result } = renderHook(() => useTodoStore());
  
  act(() => {
    result.current.addTodo('Test todo');
  });
  
  expect(result.current.todos).toHaveLength(1);
  expect(result.current.todos[0].text).toBe('Test todo');
});
```

## References

1. **Redux Documentation**: [Redux Toolkit - Getting Started](https://redux-toolkit.js.org/introduction/getting-started)
2. **Zustand Documentation**: [Zustand - Getting Started](https://zustand.docs.pmnd.rs/getting-started/introduction)
3. **React Documentation**: [Managing State](https://react.dev/learn/managing-state)
4. **Context API**: [React Context](https://react.dev/reference/react/useContext)
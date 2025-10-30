---
id: react-interview-cheat-sheet
slug: react-interview-cheat-sheet
title: React Interview Cheat Sheet
description: Complete React reference covering Hooks, Context API, performance optimization, and modern React patterns.
detailedDescription: Comprehensive React interview guide covering all hooks, Context API, performance optimization with memo/useMemo/useCallback, component patterns, and common React interview scenarios.
category: interview-prep
tags: [React, Hooks, Context API, Performance, Component Patterns, Interview]
difficulty: intermediate
lastUpdated: 2025-01-10
searchKeywords: [react, hooks, context, performance, memo, useeffect, interview]
---

# React Interview Cheat Sheet

## 📚 Core Concepts

### React Component Lifecycle
```
Class Components:
┌─ MOUNTING ─────────────┐  ┌─ UPDATING ─────────────┐  ┌─ UNMOUNTING ──┐
│ constructor()          │  │ componentDidUpdate()   │  │ componentWill  │
│ render()               │  │ render()               │  │ Unmount()      │
│ componentDidMount()    │  │ getSnapshotBeforeUpdate│  └────────────────┘
└────────────────────────┘  └────────────────────────┘

Function Components with Hooks:
┌─ MOUNT ─────┐  ┌─ UPDATE ─────┐  ┌─ UNMOUNT ────┐
│ useState()  │  │ re-render    │  │ cleanup      │
│ useEffect() │  │ useEffect()  │  │ functions    │
└─────────────┘  └──────────────┘  └──────────────┘
```

### Context API Data Flow
```
Provider Component
       │
       ▼
┌─────────────┐
│   Context   │ ◄─── createContext()
│   Value     │
└─────────────┘
       │
       ▼
Consumer Components (useContext)
   ┌─────┐   ┌─────┐   ┌─────┐
   │ App │   │Home │   │User │
   └─────┘   └─────┘   └─────┘
```

### React Hooks Complete Reference

### useState - State Management

**Interview Context**: This is the most basic React Hook - you must understand all its patterns.

**What it does**: Adds state to functional components. Returns current value and setter function.

**Why use it**: Functional components are simpler than class components, but need state management.

**How it works**: React tracks state between re-renders. When state changes, component re-renders.

```jsx
import { useState } from 'react';

function Counter() {
  // Simple state - most common pattern
  const [count, setCount] = useState(0);  // Initial value: 0
  const [name, setName] = useState('');   // Initial value: empty string

  // Object state - requires spreading for updates
  const [user, setUser] = useState({ name: '', email: '' });

  // ❌ WRONG - This mutates state directly
  const badUpdate = (field, value) => {
    user[field] = value;  // DON'T DO THIS
    setUser(user);        // React won't re-render!
  };

  // ✅ CORRECT - Create new object
  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
    // prev = current state, spread it, override field
  };

  // Lazy initialization - for expensive calculations
  const [expensive] = useState(() => {
    console.log('This only runs once on mount');
    // Expensive computation only runs if needed
    return computeExpensiveInitialValue();
  });
  // Without function: useState(computeExpensiveInitialValue())
  // Would run on every render!

  // Functional updates - when new state depends on old
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  // ❌ BAD in concurrent mode (React 18+)
  const badIncrement = () => setCount(count + 1);
  // If multiple updates happen, might use stale count

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>

      <input
        value={user.name}
        onChange={e => updateUser('name', e.target.value)}
        placeholder="Name"
      />
    </div>
  );
}
```

**Common Pitfalls**:
- Mutating objects/arrays directly (React won't detect changes)
- Using stale state in updates (use functional updates)
- Expensive initial values without lazy initialization

**Interview Questions**:
- "Why use functional updates?" (Avoids stale closure issues)
- "How do you update nested objects?" (Spread operator, immutable patterns)
- "What happens if you call setState with same value?" (React may skip re-render)
```

### useEffect - Side Effects & Lifecycle

**Interview Context**: This is where most React bugs happen. Understanding dependencies is crucial.

**What it does**: Performs side effects after render. Replaces componentDidMount, componentDidUpdate, componentWillUnmount.

**Why use it**: React components should be pure functions. useEffect is the "escape hatch" for impure operations.

**How it works**: Runs after DOM updates. Dependencies determine when to re-run.

```jsx
import { useEffect, useState } from 'react';

function DataComponent({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ⚠️ NO DEPENDENCIES - Runs after every render
  useEffect(() => {
    console.log('Runs after every render');
    // Usually not what you want - can cause performance issues
  });

  // ✅ EMPTY DEPENDENCIES - Runs once on mount
  useEffect(() => {
    console.log('Component mounted - runs once');
    // Perfect for: initial API calls, subscriptions, timers
  }, []); // Empty array = no dependencies = never re-run

  // ✅ SPECIFIC DEPENDENCIES - Runs when dependencies change
  useEffect(() => {
    if (userId) {
      setLoading(true);

      // Async function inside useEffect
      const fetchData = async () => {
        try {
          const userData = await fetchUserData(userId);
          setData(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userId]); // Only runs when userId changes

  // ✅ CLEANUP FUNCTION - Prevents memory leaks
  useEffect(() => {
    console.log('Setting up timer');
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    // Cleanup runs on unmount AND before effect re-runs
    return () => {
      console.log('Cleaning up timer');
      clearInterval(timer);
    };
  }, []); // Empty deps = cleanup only on unmount

  // ✅ MULTIPLE EFFECTS - Separation of concerns
  useEffect(() => {
    document.title = `User: ${data?.name || 'Loading...'}`;
  }, [data]); // Only runs when data changes

  // ✅ CONDITIONAL EFFECTS - Avoid unnecessary work
  useEffect(() => {
    if (!data) return; // Early return if no data

    const analytics = initializeAnalytics(data.id);
    analytics.track('user_viewed', { userId: data.id });

    return () => {
      analytics.cleanup();
    };
  }, [data?.id]); // Only re-run if user ID changes

  if (loading) return <div>Loading...</div>;
  return <div>{data?.name}</div>;
}
```

**Dependency Rules (Critical)**:
```jsx
// ❌ MISSING DEPENDENCIES - Can cause stale closures
useEffect(() => {
  setInterval(() => {
    setCount(count + 1); // Uses stale count!
  }, 1000);
}, []); // Missing count dependency

// ✅ FUNCTIONAL UPDATES - Avoid stale closures
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1); // Always current
  }, 1000);
  return () => clearInterval(timer);
}, []); // No dependencies needed

// ✅ INCLUDE ALL DEPENDENCIES
useEffect(() => {
  if (userId && shouldFetch) {
    fetchData(userId, apiKey);
  }
}, [userId, shouldFetch, apiKey]); // All used variables
```

**Common Mistakes**:
- Missing dependencies (stale closures)
- Infinite loops (missing dependencies or wrong dependencies)
- Memory leaks (forgetting cleanup)
- Async functions directly in useEffect

**Interview Questions**:
- "How do you fetch data on mount?" (useEffect with empty deps)
- "How do you prevent memory leaks?" (Cleanup functions)
- "What's the difference between useEffect and useLayoutEffect?" (Timing)
- "How do you handle dependencies?" (Include everything used inside effect)
```

### useContext - Global State

**Interview Context**: Context API is React's built-in state management. Know when to use it vs external libraries.

**What it does**: Shares data between components without prop drilling. Creates "global" state scoped to a provider tree.

**Why use it**: Avoids passing props through many component layers. Good for themes, auth, language settings.

**How it works**: Provider makes value available, consumers access it via useContext hook.

```jsx
import { createContext, useContext, useState, useMemo } from 'react';

// 1. CREATE CONTEXT with default value
const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {}, // Default no-op function
});

const UserContext = createContext(null);

// 2. PROVIDER COMPONENT
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  // ✅ OPTIMIZATION - Memoize context values
  const themeValue = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), [theme]);

  const userValue = useMemo(() => ({
    user,
    setUser,
    isLoggedIn: !!user,
    logout: () => setUser(null)
  }), [user]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userValue}>
        <Header />
        <MainContent />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// 3. CONSUMER COMPONENTS
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, isLoggedIn, logout } = useContext(UserContext);

  return (
    <header className={`header header--${theme}`}>
      <h1>Welcome {user?.name || 'Guest'}</h1>

      <div className="header-actions">
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>

        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => window.location.href = '/login'}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

// 4. CUSTOM HOOKS - Best practice for context consumption
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 5. USAGE WITH CUSTOM HOOKS
function ProfileCard() {
  const { theme } = useTheme();        // Type-safe, error handling
  const { user, isLoggedIn } = useUser(); // Clear, reusable

  if (!isLoggedIn) {
    return <div>Please log in to see your profile</div>;
  }

  return (
    <div className={`profile-card profile-card--${theme}`}>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

**Performance Optimization**:
```jsx
// ❌ BAD - Creates new object every render
function BadProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
  // Every render creates new object -> all consumers re-render!
}

// ✅ GOOD - Memoize context value
function GoodProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
```

**When NOT to use Context**:
- High-frequency updates (use useReducer + dispatch)
- Complex state logic (use Redux, Zustand)
- Performance-critical updates (use atomic state)
- Server state (use React Query, SWR)

**Interview Questions**:
- "When would you use Context vs Redux?" (Context for simple global state)
- "How do you prevent unnecessary re-renders?" (Memoize context values)
- "What's prop drilling and how does Context solve it?" (Passing props through component tree)
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
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ITEMS: 'SET_ITEMS',
  SET_ERROR: 'SET_ERROR',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_FILTER: 'SET_FILTER',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actionTypes.SET_ITEMS:
      return { ...state, items: action.payload, loading: false, error: null };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case actionTypes.ADD_ITEM:
      return { 
        ...state, 
        items: [...state.items, { id: Date.now(), ...action.payload }]
      };
    
    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case actionTypes.SET_FILTER:
      return { ...state, filter: action.payload };
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
}

// Component using useReducer
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  const addTodo = (text) => {
    dispatch({
      type: actionTypes.ADD_ITEM,
      payload: { text, completed: false }
    });
  };
  
  const removeTodo = (id) => {
    dispatch({
      type: actionTypes.REMOVE_ITEM,
      payload: id
    });
  };
  
  const setFilter = (filter) => {
    dispatch({
      type: actionTypes.SET_FILTER,
      payload: filter
    });
  };
  
  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <TodoFilter current={state.filter} onChange={setFilter} />
      <TodoList items={state.items} onRemove={removeTodo} />
      {state.error && <ErrorMessage error={state.error} />}
    </div>
  );
}
```

### useRef - DOM Access & Mutable Values
```jsx
import { useRef, useEffect, useState } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  const countRef = useRef(0); // Mutable value that persists
  const [renderCount, setRenderCount] = useState(0);
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Accessing previous values
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = renderCount;
  });
  const prevCount = prevCountRef.current;
  
  // Mutable values that don't cause re-renders
  const handleClick = () => {
    countRef.current += 1;
    console.log('Current count:', countRef.current);
    setRenderCount(prev => prev + 1); // This triggers re-render
  };
  
  // Storing intervals/timeouts for cleanup
  const intervalRef = useRef();
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  return (
    <div>
      <input ref={inputRef} placeholder="Auto-focused input" />
      <p>Render count: {renderCount} (prev: {prevCount})</p>
      <button onClick={handleClick}>Increment</button>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
    </div>
  );
}
```

## Performance Optimization

### React.memo - Component Memoization
```jsx
import { memo, useState } from 'react';

// Expensive component that should only re-render when props change
const ExpensiveChild = memo(function ExpensiveChild({ name, age, hobbies }) {
  console.log('ExpensiveChild rendered');
  
  // Expensive computation
  const expensiveValue = useMemo(() => {
    return hobbies.map(hobby => hobby.toUpperCase()).join(', ');
  }, [hobbies]);
  
  return (
    <div>
      <h3>{name} ({age})</h3>
      <p>Hobbies: {expensiveValue}</p>
    </div>
  );
});

// Custom comparison function
const SmartComponent = memo(function SmartComponent({ user, settings }) {
  return <div>{user.name} - {settings.theme}</div>;
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  // Return false if props are different (re-render)
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.settings.theme === nextProps.settings.theme
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [user] = useState({ name: 'John', age: 30, hobbies: ['reading', 'coding'] });
  
  // Child won't re-render when count changes
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <ExpensiveChild {...user} />
    </div>
  );
}
```

### useMemo - Expensive Computations
```jsx
import { useMemo, useState } from 'react';

function DataAnalytics({ data, filters, sortBy }) {
  // Expensive filtering and sorting
  const processedData = useMemo(() => {
    console.log('Processing data...'); // Only runs when dependencies change
    
    let result = data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        return !value || item[key].includes(value);
      });
    });
    
    if (sortBy) {
      result = result.sort((a, b) => {
        return a[sortBy].localeCompare(b[sortBy]);
      });
    }
    
    return result;
  }, [data, filters, sortBy]); // Only recalculate when these change
  
  // Expensive derived values
  const statistics = useMemo(() => ({
    total: processedData.length,
    average: processedData.reduce((sum, item) => sum + item.value, 0) / processedData.length,
    max: Math.max(...processedData.map(item => item.value))
  }), [processedData]);
  
  // Don't memoize simple operations
  const simpleCount = processedData.length; // This is fast, don't useMemo
  
  return (
    <div>
      <h2>Analytics ({statistics.total} items)</h2>
      <p>Average: {statistics.average.toFixed(2)}</p>
      <p>Max: {statistics.max}</p>
      <DataTable data={processedData} />
    </div>
  );
}
```

### useCallback - Function Memoization
```jsx
import { useCallback, useState, memo } from 'react';

// Child component that receives callback
const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log(`TodoItem ${todo.id} rendered`);
  
  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');
  
  // Without useCallback, these functions are recreated on every render
  // causing TodoItem to re-render even when memo is used
  const handleToggle = useCallback((id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // No dependencies - function never changes
  
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);
  
  // When callback depends on state
  const handleAdd = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  }, [newTodo]); // Re-create when newTodo changes
  
  // Filter logic (could also be memoized with useMemo)
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
      
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

## Advanced Hooks

### useLayoutEffect - Synchronous DOM Updates
```jsx
import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef();
  const triggerRef = useRef();
  
  // useLayoutEffect runs synchronously after DOM mutations
  // but before the browser paints (prevents flicker)
  useLayoutEffect(() => {
    if (tooltipRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calculate position to avoid viewport overflow
      let x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      let y = triggerRect.top - tooltipRect.height - 10;
      
      if (x < 0) x = 10;
      if (x + tooltipRect.width > window.innerWidth) {
        x = window.innerWidth - tooltipRect.width - 10;
      }
      
      if (y < 0) {
        y = triggerRect.bottom + 10;
      }
      
      setPosition({ x, y });
    }
  });
  
  return (
    <>
      <span ref={triggerRef}>{children}</span>
      <div
        ref={tooltipRef}
        className="tooltip"
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 1000
        }}
      >
        {text}
      </div>
    </>
  );
}
```

### Custom Hooks - Reusable Logic
```jsx
// useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
}

// useAsync hook for data fetching
function useAsync(asyncFunction, dependencies = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    let isCancelled = false;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    asyncFunction()
      .then(data => {
        if (!isCancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(error => {
        if (!isCancelled) {
          setState({ data: null, loading: false, error });
        }
      });
    
    return () => {
      isCancelled = true;
    };
  }, dependencies);
  
  return state;
}

// useDebounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage examples
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const debouncedQuery = useDebounce(query, 500);
  
  const { data: results, loading, error } = useAsync(
    () => searchAPI(debouncedQuery),
    [debouncedQuery]
  );
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      {loading && <div>Searching...</div>}
      {error && <div>Error: {error.message}</div>}
      
      {results?.map(item => (
        <SearchResult
          key={item.id}
          item={item}
          isFavorite={favorites.includes(item.id)}
          onToggleFavorite={(id) => 
            setFavorites(prev => 
              prev.includes(id) 
                ? prev.filter(fav => fav !== id)
                : [...prev, id]
            )
          }
        />
      ))}
    </div>
  );
}
```

## Component Patterns

### Higher-Order Components (HOCs)
```jsx
// HOC for loading states
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    if (props.loading) {
      return <div className="loading">Loading...</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// HOC for authentication
function withAuth(WrappedComponent, { redirectTo = '/login' } = {}) {
  return function WithAuthComponent(props) {
    const { user } = useContext(AuthContext);
    
    if (!user) {
      return <Navigate to={redirectTo} replace />;
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
const UserProfile = withAuth(withLoading(function UserProfile({ user, loading }) {
  return <div>Welcome, {user.name}!</div>;
}));
```

### Render Props Pattern
```jsx
// Data fetcher with render props
function DataFetcher({ url, children }) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error }));
  }, [url]);
  
  return children(state);
}

// Usage
function UserList() {
  return (
    <DataFetcher url="/api/users">
      {({ data: users, loading, error }) => {
        if (loading) return <div>Loading users...</div>;
        if (error) return <div>Error: {error.message}</div>;
        
        return (
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        );
      }}
    </DataFetcher>
  );
}
```

### Compound Components Pattern
```jsx
// Modal compound component
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children }) => (
  <div className="modal-header">{children}</div>
);

Modal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

Modal.Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Usage
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <h2>Confirm Action</h2>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

## Error Handling

### Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error && this.state.error.toString()}</pre>
            <pre>{this.state.errorInfo.componentStack}</pre>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Functional error boundary (using third-party library like react-error-boundary)
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="error-fallback">
      <h2>Oops! Something went wrong</h2>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error logged:', error, errorInfo);
      }}
      onReset={() => {
        // Reset any state that might be causing the error
      }}
    >
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```

## Common Interview Questions

### Q1: What's the output?
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1); // Uses stale closure
    setCount(count + 1); // Uses same stale value
    console.log(count);  // Still 0 (state hasn't updated yet)
  };
  
  return <button onClick={handleClick}>{count}</button>;
}

// Answer: Clicking increments by 1, not 2
// Solution: Use functional updates
const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

### Q2: Why doesn't this effect run?
```jsx
function UserProfile({ user }) {
  useEffect(() => {
    fetchUserDetails(user.id);
  }, [user]); // Object reference changes every render
  
  return <div>{user.name}</div>;
}

// Solution: Include only the specific value needed
useEffect(() => {
  fetchUserDetails(user.id);
}, [user.id]); // Primitive value
```

### Q3: Memory leak in useEffect
```jsx
function Timer() {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    
    // Missing cleanup!
    // return () => clearInterval(interval);
  }, []);
  
  return <div>{time}</div>;
}

// Always clean up subscriptions, timers, and event listeners
```

## Performance Best Practices

### Optimization Checklist
- ✅ Use React.memo for pure components
- ✅ Use useMemo for expensive computations  
- ✅ Use useCallback for event handlers passed to children
- ✅ Avoid creating objects/arrays in JSX
- ✅ Use keys properly in lists
- ✅ Lazy load components with React.Suspense
- ✅ Split large bundles with React.lazy
- ✅ Use React DevTools Profiler
- ✅ Implement proper error boundaries
- ✅ Avoid deeply nested context providers

### Anti-patterns to Avoid
```jsx
// ❌ Creating objects in render
function BadComponent({ items }) {
  return (
    <ItemList 
      items={items}
      style={{ margin: '10px' }} // New object every render
      config={{ sort: 'asc' }}   // New object every render
    />
  );
}

// ✅ Define objects outside render
const STYLE = { margin: '10px' };
const CONFIG = { sort: 'asc' };

function GoodComponent({ items }) {
  return <ItemList items={items} style={STYLE} config={CONFIG} />;
}

// ❌ Inline functions in JSX
<button onClick={() => handleClick(item.id)}>Click</button>

// ✅ Use useCallback or pre-bound handlers
const handleItemClick = useCallback((id) => handleClick(id), []);
<button onClick={() => handleItemClick(item.id)}>Click</button>
```
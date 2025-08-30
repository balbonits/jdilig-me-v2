import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { Solution } from '../interfaces/shared';

// Request interface
interface Request {
  type: string;
  data: unknown;
  priority?: number;
}

// Handler interface
abstract class Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: Request): string | null {
    const result = this.doHandle(request);
    
    if (result !== null) {
      return result;
    }
    
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    
    return null;
  }

  protected abstract doHandle(request: Request): string | null;
}

// Support System Example
class Level1Support extends Handler {
  protected doHandle(request: Request): string | null {
    if (request.type === 'password-reset' || request.type === 'account-locked') {
      return `Level 1 Support: Handled ${request.type} request`;
    }
    return null;
  }
}

class Level2Support extends Handler {
  protected doHandle(request: Request): string | null {
    if (request.type === 'billing-issue' || request.type === 'subscription-change') {
      return `Level 2 Support: Handled ${request.type} request`;
    }
    return null;
  }
}

class Level3Support extends Handler {
  protected doHandle(request: Request): string | null {
    if (request.type === 'technical-bug' || request.type === 'system-outage') {
      return `Level 3 Support: Handled ${request.type} request`;
    }
    return null;
  }
}

class Manager extends Handler {
  protected doHandle(request: Request): string | null {
    return `Manager: Escalated ${request.type} request to executive team`;
  }
}

// Authentication Chain Example
interface AuthRequest {
  username: string;
  password: string;
  token?: string;
  role?: string;
}

abstract class AuthHandler {
  private nextHandler: AuthHandler | null = null;

  setNext(handler: AuthHandler): AuthHandler {
    this.nextHandler = handler;
    return handler;
  }

  authenticate(request: AuthRequest): { success: boolean; message: string } {
    const result = this.doAuthenticate(request);
    
    if (!result.success && this.nextHandler) {
      return this.nextHandler.authenticate(request);
    }
    
    return result;
  }

  protected abstract doAuthenticate(request: AuthRequest): { success: boolean; message: string };
}

class CredentialsValidator extends AuthHandler {
  protected doAuthenticate(request: AuthRequest): { success: boolean; message: string } {
    if (!request.username || !request.password) {
      return { success: false, message: 'Missing credentials' };
    }
    
    if (request.username === 'admin' && request.password === 'secret123') {
      return { success: true, message: 'Credentials validated' };
    }
    
    return { success: false, message: 'Invalid credentials' };
  }
}

class TokenValidator extends AuthHandler {
  protected doAuthenticate(request: AuthRequest): { success: boolean; message: string } {
    if (request.token === 'valid-jwt-token') {
      return { success: true, message: 'Token validated' };
    }
    
    return { success: false, message: 'Invalid token' };
  }
}

class RoleValidator extends AuthHandler {
  protected doAuthenticate(request: AuthRequest): { success: boolean; message: string } {
    if (request.role === 'admin' || request.role === 'user') {
      return { success: true, message: 'Role authorized' };
    }
    
    return { success: false, message: 'Insufficient permissions' };
  }
}

// HTTP Middleware Chain Example
interface HTTPRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
  user?: { id: string; role: string };
}

abstract class Middleware {
  private nextMiddleware: Middleware | null = null;

  setNext(middleware: Middleware): Middleware {
    this.nextMiddleware = middleware;
    return middleware;
  }

  process(request: HTTPRequest): { proceed: boolean; message: string } {
    const result = this.doProcess(request);
    
    if (!result.proceed) {
      return result;
    }
    
    if (this.nextMiddleware) {
      return this.nextMiddleware.process(request);
    }
    
    return { proceed: true, message: 'Request processed successfully' };
  }

  protected abstract doProcess(request: HTTPRequest): { proceed: boolean; message: string };
}

class CORSMiddleware extends Middleware {
  protected doProcess(request: HTTPRequest): { proceed: boolean; message: string } {
    const origin = request.headers['origin'];
    const allowedOrigins = ['https://example.com', 'https://app.example.com'];
    
    if (origin && !allowedOrigins.includes(origin)) {
      return { proceed: false, message: 'CORS: Origin not allowed' };
    }
    
    return { proceed: true, message: 'CORS: Origin validated' };
  }
}

class AuthenticationMiddleware extends Middleware {
  protected doProcess(request: HTTPRequest): { proceed: boolean; message: string } {
    const authHeader = request.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { proceed: false, message: 'Authentication: Missing or invalid token' };
    }
    
    // Simulate user extraction from token
    request.user = { id: 'user123', role: 'user' };
    return { proceed: true, message: 'Authentication: User authenticated' };
  }
}

class AuthorizationMiddleware extends Middleware {
  constructor(private requiredRole: string) {
    super();
  }

  protected doProcess(request: HTTPRequest): { proceed: boolean; message: string } {
    if (!request.user) {
      return { proceed: false, message: 'Authorization: User not found' };
    }
    
    if (request.user.role !== this.requiredRole && request.user.role !== 'admin') {
      return { proceed: false, message: `Authorization: Requires ${this.requiredRole} role` };
    }
    
    return { proceed: true, message: 'Authorization: Access granted' };
  }
}

class RateLimitingMiddleware extends Middleware {
  private requests = new Map<string, number>();

  protected doProcess(request: HTTPRequest): { proceed: boolean; message: string } {
    const clientId = request.headers['x-client-id'] || 'anonymous';
    const currentCount = this.requests.get(clientId) || 0;
    
    if (currentCount >= 100) {
      return { proceed: false, message: 'Rate Limiting: Too many requests' };
    }
    
    this.requests.set(clientId, currentCount + 1);
    return { proceed: true, message: 'Rate Limiting: Request allowed' };
  }
}

// Factory functions
export function createSupportChain() {
  const level1 = new Level1Support();
  const level2 = new Level2Support();
  const level3 = new Level3Support();
  const manager = new Manager();

  level1.setNext(level2).setNext(level3).setNext(manager);

  return { chain: level1, level1, level2, level3, manager };
}

export function createAuthChain() {
  const credentials = new CredentialsValidator();
  const token = new TokenValidator();
  const role = new RoleValidator();

  credentials.setNext(token).setNext(role);

  return { chain: credentials, credentials, token, role };
}

export function createMiddlewareChain() {
  const cors = new CORSMiddleware();
  const auth = new AuthenticationMiddleware();
  const authz = new AuthorizationMiddleware('user');
  const rateLimit = new RateLimitingMiddleware();

  cors.setNext(auth).setNext(authz).setNext(rateLimit);

  return { chain: cors, cors, auth, authz, rateLimit };
}

export const metadata: PatternMetadata = {
  title: 'Chain of Responsibility Pattern',
  category: 'Behavioral',
  difficulty: 'Medium',
  description: 'Pass requests along a chain of handlers until one handles it',
  concepts: ["design patterns","software architecture","code organization","object-oriented programming"],
  detailedDescription: `
    ## ⛓️ Chain of Responsibility Pattern

    The **Chain of Responsibility Pattern** passes requests along a chain of potential handlers. Each handler decides whether to process the request or pass it to the next handler in the chain.

    ### Core Concepts

    🔹 **Handler Interface** - Common interface for all handlers  
    🔹 **Concrete Handlers** - Specific implementations that handle requests  
    🔹 **Chain Building** - Linking handlers in sequence  
    🔹 **Request Processing** - Each handler tries to process or passes along

    ### Real-World Applications

    **Support Systems** - Escalate tickets through support levels (L1 → L2 → L3 → Manager)  
    **Web Middlewares** - Process HTTP requests through authentication, authorization, rate limiting  
    **Event Handling** - GUI events bubble up through component hierarchies  
    **Validation Pipelines** - Input validation through multiple validation rules

    ### Implementation Benefits

    ✅ **Loose coupling** - Sender doesn't know which handler will process request  
    ✅ **Dynamic chains** - Add, remove, or reorder handlers at runtime  
    ✅ **Single responsibility** - Each handler has one specific responsibility  
    ✅ **Flexible processing** - Different requests can be handled by different handlers
  `,
    timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  useCases: [
    PatternUseCase.ERROR_HANDLING,
    PatternUseCase.REQUEST_PROCESSING,
    PatternUseCase.MIDDLEWARE_SYSTEMS
  ],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    advantages: [
    'Decouples sender from receiver',
    'Flexible chain configuration',
    'Easy to add or remove handlers',
    'Each handler has single responsibility'
  ],
  disadvantages: [
    'No guarantee request will be handled',
    'Performance overhead from chain traversal',
    'Can be difficult to debug chain execution',
    'May create deep call stacks'
  ],
  relatedPatterns: ['Command', 'Composite', 'Decorator']
};

export const solutions: Solution[] = [
  {
    name: 'support-system',
    tabName: 'Support System',
    approach: 'Handle support requests through escalation levels',
    code: `// Support System Chain Implementation
abstract class Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: Request): string | null {
    const result = this.doHandle(request);
    
    if (result !== null) {
      return result;
    }
    
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    
    return null;
  }

  protected abstract doHandle(request: Request): string | null;
}

class Level1Support extends Handler {
  protected doHandle(request: Request): string | null {
    if (request.type === 'password-reset' || request.type === 'account-locked') {
      return \`Level 1 Support: Handled \${request.type} request\`;
    }
    return null;
  }
}

function createSupportChain() {
  const level1 = new Level1Support();
  const level2 = new Level2Support();
  const level3 = new Level3Support();
  const manager = new Manager();

  level1.setNext(level2).setNext(level3).setNext(manager);
  return { chain: level1, level1, level2, level3, manager };
}`,
    isOptimal: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'class'
  },
  {
    name: 'authentication-chain',
    tabName: 'Auth Chain',
    approach: 'Validate credentials, tokens, and roles in sequence',
    code: `// Authentication Chain Implementation
abstract class AuthHandler {
  private nextHandler: AuthHandler | null = null;

  setNext(handler: AuthHandler): AuthHandler {
    this.nextHandler = handler;
    return handler;
  }

  authenticate(request: AuthRequest): { success: boolean; message: string } {
    const result = this.doAuthenticate(request);
    
    if (!result.success && this.nextHandler) {
      return this.nextHandler.authenticate(request);
    }
    
    return result;
  }

  protected abstract doAuthenticate(request: AuthRequest): { success: boolean; message: string };
}

class CredentialsValidator extends AuthHandler {
  protected doAuthenticate(request: AuthRequest): { success: boolean; message: string } {
    if (!request.username || !request.password) {
      return { success: false, message: 'Missing credentials' };
    }
    
    if (request.username === 'admin' && request.password === 'secret123') {
      return { success: true, message: 'Credentials validated' };
    }
    
    return { success: false, message: 'Invalid credentials' };
  }
}`,
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'class'
  },
  {
    name: 'http-middleware',
    tabName: 'HTTP Middleware',
    approach: 'Process web requests through CORS, auth, and rate limiting',
    code: `// HTTP Middleware Chain Implementation
abstract class Middleware {
  private nextMiddleware: Middleware | null = null;

  setNext(middleware: Middleware): Middleware {
    this.nextMiddleware = middleware;
    return middleware;
  }

  process(request: HTTPRequest): { proceed: boolean; message: string } {
    const result = this.doProcess(request);
    
    if (!result.proceed) {
      return result;
    }
    
    if (this.nextMiddleware) {
      return this.nextMiddleware.process(request);
    }
    
    return { proceed: true, message: 'Request processed successfully' };
  }

  protected abstract doProcess(request: HTTPRequest): { proceed: boolean; message: string };
}

class CORSMiddleware extends Middleware {
  protected doProcess(request: HTTPRequest): { proceed: boolean; message: string } {
    const origin = request.headers['origin'];
    const allowedOrigins = ['https://example.com', 'https://app.example.com'];
    
    if (origin && !allowedOrigins.includes(origin)) {
      return { proceed: false, message: 'CORS: Origin not allowed' };
    }
    
    return { proceed: true, message: 'CORS: Origin validated' };
  }
}`,
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'class'
  }
];

export const examples: PatternExample[] = [
  {
    input: `const { chain } = createSupportChain();

console.log(chain.handle({ type: 'password-reset', data: {} }));
console.log(chain.handle({ type: 'billing-issue', data: {} }));
console.log(chain.handle({ type: 'system-outage', data: {} }));
console.log(chain.handle({ type: 'complex-issue', data: {} }));`,
    output: `Level 1 Support: Handled password-reset request
Level 2 Support: Handled billing-issue request
Level 3 Support: Handled system-outage request
Manager: Escalated complex-issue request to executive team`,
    description: 'Each support level handles requests within their expertise. Unhandled requests automatically escalate to the next level until someone handles them.',
    scenario: 'Route support requests through appropriate support levels based on complexity'
  },
  {
    input: `const { chain } = createAuthChain();

const validUser = { username: 'admin', password: 'secret123' };
const tokenUser = { username: '', password: '', token: 'valid-jwt-token' };

console.log(chain.authenticate(validUser).message);
console.log(chain.authenticate(tokenUser).message);`,
    output: `Credentials validated
Token validated`,
    description: 'Authentication tries credentials first, then falls back to token validation. Each handler attempts authentication and passes to the next if unsuccessful.',
    scenario: 'Authenticate users through multiple validation steps with fallback options'
  },
  {
    input: `const { chain } = createMiddlewareChain();

const request: HTTPRequest = {
  method: 'GET',
  url: '/api/users',
  headers: {
    'origin': 'https://example.com',
    'authorization': 'Bearer valid-token',
    'x-client-id': 'client123'
  }
};

console.log(chain.process(request).message);`,
    output: `Request processed successfully`,
    description: 'HTTP requests pass through CORS validation, authentication, authorization, and rate limiting. Any middleware can reject the request and stop the chain.',
    scenario: 'Process web requests through security middleware chain'
  }
];

export type { 
  Request, 
  AuthRequest, 
  HTTPRequest 
};

export { 
  Handler,
  Level1Support, Level2Support, Level3Support, Manager,
  AuthHandler, CredentialsValidator, TokenValidator, RoleValidator,
  Middleware, CORSMiddleware, AuthenticationMiddleware, 
  AuthorizationMiddleware, RateLimitingMiddleware 
};
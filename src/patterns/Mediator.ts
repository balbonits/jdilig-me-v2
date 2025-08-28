import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

// Mediator interface
interface ChatMediator {
  sendMessage(message: string, user: ChatUser): void;
  addUser(user: ChatUser): void;
  removeUser(user: ChatUser): void;
  notifyTyping(user: ChatUser): void;
}

// Colleague interface
abstract class ChatUser {
  constructor(protected name: string, protected mediator: ChatMediator) {
    this.mediator.addUser(this);
  }

  abstract receive(message: string, from: string): string;

  send(message: string): void {
    this.mediator.sendMessage(message, this);
  }

  startTyping(): void {
    this.mediator.notifyTyping(this);
  }

  getName(): string {
    return this.name;
  }
}

// Concrete Mediator
class ChatRoom implements ChatMediator {
  private users: ChatUser[] = [];
  private messageHistory: { from: string; message: string; timestamp: Date }[] = [];

  sendMessage(message: string, sender: ChatUser): void {
    this.messageHistory.push({
      from: sender.getName(),
      message,
      timestamp: new Date()
    });

    this.users
      .filter(user => user !== sender)
      .forEach(user => user.receive(message, sender.getName()));
  }

  addUser(user: ChatUser): void {
    this.users.push(user);
    this.broadcastUserJoined(user);
  }

  removeUser(user: ChatUser): void {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.broadcastUserLeft(user);
    }
  }

  notifyTyping(user: ChatUser): void {
    this.users
      .filter(u => u !== user)
      .forEach(u => u.receive('...typing', user.getName()));
  }

  private broadcastUserJoined(user: ChatUser): void {
    this.users
      .filter(u => u !== user)
      .forEach(u => u.receive(`${user.getName()} joined the chat`, 'System'));
  }

  private broadcastUserLeft(user: ChatUser): void {
    this.users.forEach(u => u.receive(`${user.getName()} left the chat`, 'System'));
  }

  getUserCount(): number {
    return this.users.length;
  }

  getMessageHistory(): { from: string; message: string; timestamp: Date }[] {
    return [...this.messageHistory];
  }
}

// Concrete Colleagues
class RegularUser extends ChatUser {
  receive(message: string, from: string): string {
    return `${this.name} received from ${from}: "${message}"`;
  }
}

class ModeratorUser extends ChatUser {
  private mutedUsers: Set<string> = new Set();

  receive(message: string, from: string): string {
    if (this.mutedUsers.has(from)) {
      return `${this.name} (moderator): Ignored message from muted user ${from}`;
    }
    return `${this.name} (moderator) received from ${from}: "${message}"`;
  }

  muteUser(username: string): void {
    this.mutedUsers.add(username);
  }

  unmuteUser(username: string): void {
    this.mutedUsers.delete(username);
  }
}

class BotUser extends ChatUser {
  receive(message: string, from: string): string {
    // Auto-respond to questions
    if (message.includes('?')) {
      setTimeout(() => {
        this.send('I can help you with that!');
      }, 100);
    }
    return `${this.name} (bot) processed message from ${from}`;
  }
}

// Air Traffic Control Example
interface AirTrafficMediator {
  requestLanding(aircraft: Aircraft): string;
  requestTakeoff(aircraft: Aircraft): string;
  requestRunwayChange(aircraft: Aircraft, newRunway: string): string;
  registerAircraft(aircraft: Aircraft): void;
}

abstract class Aircraft {
  constructor(
    protected callSign: string,
    protected atc: AirTrafficMediator
  ) {
    this.atc.registerAircraft(this);
  }

  abstract receiveInstruction(instruction: string): string;

  requestLanding(): string {
    return this.atc.requestLanding(this);
  }

  requestTakeoff(): string {
    return this.atc.requestTakeoff(this);
  }

  getCallSign(): string {
    return this.callSign;
  }
}

class AirTrafficControl implements AirTrafficMediator {
  private aircraft: Aircraft[] = [];
  private runways: Map<string, { occupied: boolean; aircraft?: string }> = new Map([
    ['Runway 1', { occupied: false }],
    ['Runway 2', { occupied: false }],
    ['Runway 3', { occupied: false }]
  ]);

  requestLanding(aircraft: Aircraft): string {
    const availableRunway = this.findAvailableRunway();
    
    if (!availableRunway) {
      const instruction = 'Hold pattern, no runways available';
      aircraft.receiveInstruction(instruction);
      return `ATC to ${aircraft.getCallSign()}: ${instruction}`;
    }

    this.runways.set(availableRunway, { occupied: true, aircraft: aircraft.getCallSign() });
    const instruction = `Cleared to land on ${availableRunway}`;
    aircraft.receiveInstruction(instruction);
    return `ATC to ${aircraft.getCallSign()}: ${instruction}`;
  }

  requestTakeoff(aircraft: Aircraft): string {
    const runway = this.findAircraftRunway(aircraft.getCallSign());
    
    if (!runway) {
      const instruction = 'Taxi to runway first';
      aircraft.receiveInstruction(instruction);
      return `ATC to ${aircraft.getCallSign()}: ${instruction}`;
    }

    this.runways.set(runway, { occupied: false });
    const instruction = `Cleared for takeoff on ${runway}`;
    aircraft.receiveInstruction(instruction);
    return `ATC to ${aircraft.getCallSign()}: ${instruction}`;
  }

  requestRunwayChange(aircraft: Aircraft, newRunway: string): string {
    if (!this.runways.has(newRunway)) {
      return `ATC to ${aircraft.getCallSign()}: Invalid runway ${newRunway}`;
    }

    const runwayInfo = this.runways.get(newRunway)!;
    if (runwayInfo.occupied) {
      return `ATC to ${aircraft.getCallSign()}: ${newRunway} occupied`;
    }

    // Free current runway
    const currentRunway = this.findAircraftRunway(aircraft.getCallSign());
    if (currentRunway) {
      this.runways.set(currentRunway, { occupied: false });
    }

    // Assign new runway
    this.runways.set(newRunway, { occupied: true, aircraft: aircraft.getCallSign() });
    const instruction = `Cleared to taxi to ${newRunway}`;
    aircraft.receiveInstruction(instruction);
    return `ATC to ${aircraft.getCallSign()}: ${instruction}`;
  }

  registerAircraft(aircraft: Aircraft): void {
    this.aircraft.push(aircraft);
  }

  private findAvailableRunway(): string | null {
    for (const [runway, info] of this.runways) {
      if (!info.occupied) {
        return runway;
      }
    }
    return null;
  }

  private findAircraftRunway(callSign: string): string | null {
    for (const [runway, info] of this.runways) {
      if (info.aircraft === callSign) {
        return runway;
      }
    }
    return null;
  }

  getRunwayStatus(): Map<string, { occupied: boolean; aircraft?: string }> {
    return new Map(this.runways);
  }
}

class CommercialAircraft extends Aircraft {
  receiveInstruction(instruction: string): string {
    return `Commercial ${this.callSign}: Acknowledged - ${instruction}`;
  }
}

class PrivateAircraft extends Aircraft {
  receiveInstruction(instruction: string): string {
    return `Private ${this.callSign}: Roger - ${instruction}`;
  }
}

class CargoAircraft extends Aircraft {
  receiveInstruction(instruction: string): string {
    return `Cargo ${this.callSign}: Copy - ${instruction}`;
  }
}

// UI Form Example
interface FormMediator {
  notify(component: FormComponent, event: string): void;
}

abstract class FormComponent {
  constructor(protected mediator: FormMediator) {}
  abstract getValue(): string;
  abstract setValue(value: string): void;
  abstract setEnabled(enabled: boolean): void;
}

class AuthenticationForm implements FormMediator {
  private username!: TextInput;
  private password!: PasswordInput;
  private loginButton!: Button;
  private registerButton!: Button;
  private statusLabel!: Label;

  constructor() {
    this.username = new TextInput(this, 'username');
    this.password = new PasswordInput(this, 'password');
    this.loginButton = new Button(this, 'login');
    this.registerButton = new Button(this, 'register');
    this.statusLabel = new Label(this, 'status');
    
    this.updateButtonStates();
  }

  notify(component: FormComponent, event: string): void {
    if (event === 'change') {
      this.updateButtonStates();
    } else if (event === 'login') {
      this.handleLogin();
    } else if (event === 'register') {
      this.handleRegister();
    }
  }

  private updateButtonStates(): void {
    const hasUsername = this.username.getValue().length > 0;
    const hasPassword = this.password.getValue().length > 0;
    const canSubmit = hasUsername && hasPassword;
    
    this.loginButton.setEnabled(canSubmit);
    this.registerButton.setEnabled(canSubmit);
    
    if (!canSubmit) {
      this.statusLabel.setValue('Please enter username and password');
    } else {
      this.statusLabel.setValue('Ready to authenticate');
    }
  }

  private handleLogin(): void {
    this.statusLabel.setValue('Logging in...');
    // Simulate login
    setTimeout(() => {
      this.statusLabel.setValue('Login successful!');
    }, 1000);
  }

  private handleRegister(): void {
    this.statusLabel.setValue('Creating account...');
    // Simulate registration
    setTimeout(() => {
      this.statusLabel.setValue('Registration successful!');
    }, 1000);
  }

  getComponents() {
    return {
      username: this.username,
      password: this.password,
      loginButton: this.loginButton,
      registerButton: this.registerButton,
      statusLabel: this.statusLabel
    };
  }
}

class TextInput extends FormComponent {
  private value = '';
  private enabled = true;

  constructor(mediator: FormMediator, private name: string) {
    super(mediator);
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
    this.mediator.notify(this, 'change');
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getName(): string {
    return this.name;
  }
}

class PasswordInput extends FormComponent {
  private value = '';
  private enabled = true;

  constructor(mediator: FormMediator, private name: string) {
    super(mediator);
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
    this.mediator.notify(this, 'change');
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

class Button extends FormComponent {
  private enabled = false;

  constructor(mediator: FormMediator, private action: string) {
    super(mediator);
  }

  getValue(): string {
    return this.action;
  }

  setValue(_value: string): void {
    // Buttons don't have settable values
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  click(): void {
    if (this.enabled) {
      this.mediator.notify(this, this.action);
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

class Label extends FormComponent {
  private text = '';

  constructor(mediator: FormMediator, private name: string) {
    super(mediator);
  }

  getValue(): string {
    return this.text;
  }

  setValue(value: string): void {
    this.text = value;
  }

  setEnabled(_enabled: boolean): void {
    // Labels are always "enabled"
  }
}

// Factory functions
export function createChatRoom() {
  const chatRoom = new ChatRoom();
  
  const alice = new RegularUser('Alice', chatRoom);
  const bob = new RegularUser('Bob', chatRoom);
  const moderator = new ModeratorUser('ModeratorMike', chatRoom);
  const bot = new BotUser('HelpBot', chatRoom);

  return { chatRoom, alice, bob, moderator, bot };
}

export function createAirport() {
  const atc = new AirTrafficControl();
  
  const flight101 = new CommercialAircraft('AA101', atc);
  const privatePlane = new PrivateAircraft('N123AB', atc);
  const cargo = new CargoAircraft('FX500', atc);

  return { atc, flight101, privatePlane, cargo };
}

export function createAuthForm() {
  const form = new AuthenticationForm();
  return form;
}

export const metadata: PatternMetadata = {
  title: 'Mediator Pattern',
  category: 'Behavioral',
  difficulty: 'Medium',
  description: 'Reduce coupling by centralizing complex communications',
  detailedDescription: `
    ## 🤝 Mediator Pattern

    The **Mediator Pattern** defines how objects interact with each other. Instead of objects communicating directly, they communicate through a central mediator, reducing coupling between components.

    ### Core Concepts

    🔹 **Mediator Interface** - Defines communication contract  
    🔹 **Concrete Mediator** - Implements interaction logic between colleagues  
    🔹 **Colleague Classes** - Components that communicate via mediator  
    🔹 **Centralized Control** - All interactions flow through mediator

    ### Real-World Applications

    **Chat Systems** - Users communicate through chat room mediator  
    **Air Traffic Control** - Aircraft coordinate through ATC mediator  
    **UI Forms** - Form components interact through form mediator  
    **Event Systems** - Publishers and subscribers communicate via event bus

    ### Communication Patterns

    **Before Mediator**: Objects have direct references to each other (N×N complexity)  
    **After Mediator**: Objects only know about mediator (N×1 complexity)  
    **Result**: Reduced coupling and centralized interaction logic

    ### Implementation Benefits

    ✅ **Loose coupling** - Colleagues don't reference each other directly  
    ✅ **Centralized control** - Interaction logic in one place  
    ✅ **Reusable components** - Colleagues can be used in different contexts  
    ✅ **Easy to extend** - Add new interaction patterns in mediator
  `,
  useCases: [
    PatternUseCase.UI_ARCHITECTURE,
    PatternUseCase.EVENT_HANDLING,
    PatternUseCase.SYSTEM_INTEGRATION
  ],
  advantages: [
    'Reduces coupling between communicating objects',
    'Centralizes interaction logic in one place',
    'Makes object interactions more maintainable',
    'Components become more reusable'
  ],
  disadvantages: [
    'Mediator can become overly complex (God object)',
    'Can be harder to understand program flow',
    'May create performance bottleneck',
    'Single point of failure'
  ],
  relatedPatterns: ['Observer', 'Command', 'Facade']
};

export const solutions: SolutionMetadata[] = [
  {
    name: 'chat-system',
    title: 'Chat Room Mediator',
    description: 'Users communicate through centralized chat room',
    isOptimal: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium'
  },
  {
    name: 'air-traffic-control',
    title: 'Aircraft Coordination',
    description: 'Aircraft coordinate landing/takeoff through ATC',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    difficulty: 'Hard'
  },
  {
    name: 'form-validation',
    title: 'UI Form Component Interaction',
    description: 'Form components interact through form mediator',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Easy'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'Multi-User Chat System',
    scenario: 'Users communicate in chat room without direct references to each other',
    inputExample: `const { chatRoom, alice, bob, moderator } = createChatRoom();

alice.send('Hello everyone!');
bob.send('Hi Alice!');
moderator.muteUser('Bob');
alice.send('How is everyone doing?');

console.log(\`Total users: \${chatRoom.getUserCount()}\`);`,
    outputExample: `Bob received from Alice: "Hello everyone!"
HelpBot (bot) processed message from Alice
ModeratorMike (moderator) received from Alice: "Hello everyone!"
Alice received from Bob: "Hi Alice!"
HelpBot (bot) processed message from Bob
ModeratorMike (moderator) received from Bob: "Hi Alice!"
Alice received from Bob: "How is everyone doing?"
HelpBot (bot) processed message from Alice
ModeratorMike (moderator): Ignored message from muted user Alice
Total users: 4`,
    explanation: 'Users send messages through the chat room mediator, which handles distribution, user management, and moderation. Users never communicate directly with each other.'
  },
  {
    title: 'Air Traffic Control Coordination',
    scenario: 'Aircraft coordinate landing and takeoff through central ATC system',
    inputExample: `const { atc, flight101, privatePlane } = createAirport();

console.log(flight101.requestLanding());
console.log(privatePlane.requestLanding());
console.log(flight101.requestTakeoff());`,
    outputExample: `ATC to AA101: Cleared to land on Runway 1
ATC to N123AB: Cleared to land on Runway 2
ATC to AA101: Cleared for takeoff on Runway 1`,
    explanation: 'Aircraft communicate only with ATC mediator for landing/takeoff coordination. ATC manages runway availability and ensures safe operations without aircraft needing to know about each other.'
  },
  {
    title: 'Form Component Interaction',
    scenario: 'Form components interact through mediator to enable/disable buttons based on input validation',
    inputExample: `const form = createAuthForm();
const { username, password, loginButton } = form.getComponents();

console.log(\`Login enabled: \${loginButton.isEnabled()}\`);
username.setValue('john');
console.log(\`Login enabled: \${loginButton.isEnabled()}\`);
password.setValue('secret');
console.log(\`Login enabled: \${loginButton.isEnabled()}\`);`,
    outputExample: `Login enabled: false
Login enabled: false
Login enabled: true`,
    explanation: 'Form components communicate through the form mediator. When username or password changes, the mediator updates button states and status messages without components directly referencing each other.'
  }
];

export { 
  ChatMediator, ChatUser, ChatRoom, RegularUser, ModeratorUser, BotUser,
  AirTrafficMediator, Aircraft, AirTrafficControl, CommercialAircraft, PrivateAircraft, CargoAircraft,
  FormMediator, FormComponent, AuthenticationForm, TextInput, PasswordInput, Button, Label
};
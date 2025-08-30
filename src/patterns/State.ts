/* eslint-disable @typescript-eslint/no-unused-vars */
import { PatternMetadata, PatternExample, Solution, PatternUseCase } from '@/interfaces/patterns';

/**
 * 🎭 State Pattern Implementation - Dynamic Behavior Change
 * 
 * DESCRIPTION:
 * Allows an object to alter its behavior when its internal state changes.
 * The object will appear to change its class, providing different behavior
 * for the same methods based on current state.
 * 
 * EXAMPLES:
 * • Media player states - Playing, paused, stopped behaviors
 * • Vending machine - Different behaviors for coin insertion, selection
 * • Game character states - Walking, jumping, attacking behaviors
 * 
 * IMPLEMENTATION APPROACHES:
 * • State classes - Separate classes for each state
 * • State machine - Centralized state transition logic
 * • Functional state - Functions representing different states
 * 
 * REAL-WORLD USAGE:
 * • React component states and lifecycle methods
 * • Game AI state machines
 * • Network connection states (connected, disconnected, connecting)
 * • UI component states (loading, error, success)
 * 
 * PERFORMANCE:
 * - Time: O(1) for state transitions and operations
 * - Space: O(1) for state objects
 */

// State interface
interface MediaPlayerState {
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
  next(player: MediaPlayer): void;
  getStatus(): string;
}

// Context class
export class MediaPlayer {
  private currentState: MediaPlayerState;
  private currentTrack: number = 0;
  private volume: number = 50;

  constructor() {
    this.currentState = new StoppedState();
  }

  public setState(state: MediaPlayerState): void {
    this.currentState = state;
    console.log(`State changed to: ${this.currentState.getStatus()}`);
  }

  public play(): void {
    this.currentState.play(this);
  }

  public pause(): void {
    this.currentState.pause(this);
  }

  public stop(): void {
    this.currentState.stop(this);
  }

  public next(): void {
    this.currentState.next(this);
  }

  public getStatus(): string {
    return `Player Status: ${this.currentState.getStatus()}, Track: ${this.currentTrack}, Volume: ${this.volume}%`;
  }

  public setTrack(track: number): void {
    this.currentTrack = track;
  }

  public getTrack(): number {
    return this.currentTrack;
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(100, volume));
  }

  public getVolume(): number {
    return this.volume;
  }
}

// Concrete States
export class PlayingState implements MediaPlayerState {
  play(player: MediaPlayer): void {
    console.log('Already playing');
  }

  pause(player: MediaPlayer): void {
    console.log('Pausing playback');
    player.setState(new PausedState());
  }

  stop(player: MediaPlayer): void {
    console.log('Stopping playback');
    player.setState(new StoppedState());
  }

  next(player: MediaPlayer): void {
    console.log('Playing next track');
    player.setTrack(player.getTrack() + 1);
    // Stay in playing state
  }

  getStatus(): string {
    return 'Playing';
  }
}

export class PausedState implements MediaPlayerState {
  play(player: MediaPlayer): void {
    console.log('Resuming playback');
    player.setState(new PlayingState());
  }

  pause(player: MediaPlayer): void {
    console.log('Already paused');
  }

  stop(player: MediaPlayer): void {
    console.log('Stopping from pause');
    player.setState(new StoppedState());
  }

  next(player: MediaPlayer): void {
    console.log('Next track (staying paused)');
    player.setTrack(player.getTrack() + 1);
    // Stay paused
  }

  getStatus(): string {
    return 'Paused';
  }
}

export class StoppedState implements MediaPlayerState {
  play(player: MediaPlayer): void {
    console.log('Starting playback');
    player.setState(new PlayingState());
  }

  pause(player: MediaPlayer): void {
    console.log('Cannot pause when stopped');
  }

  stop(player: MediaPlayer): void {
    console.log('Already stopped');
  }

  next(player: MediaPlayer): void {
    console.log('Next track (will need to press play)');
    player.setTrack(player.getTrack() + 1);
    // Stay stopped
  }

  getStatus(): string {
    return 'Stopped';
  }
}

// Traffic Light State Machine Example
interface TrafficLightState {
  next(light: TrafficLight): void;
  getColor(): string;
  getDuration(): number;
}

export class TrafficLight {
  private currentState: TrafficLightState;

  constructor() {
    this.currentState = new RedState();
  }

  public setState(state: TrafficLightState): void {
    this.currentState = state;
    console.log(`Traffic light changed to: ${this.currentState.getColor()}`);
  }

  public next(): void {
    this.currentState.next(this);
  }

  public getStatus(): { color: string; duration: number } {
    return {
      color: this.currentState.getColor(),
      duration: this.currentState.getDuration()
    };
  }
}

export class RedState implements TrafficLightState {
  next(light: TrafficLight): void {
    light.setState(new GreenState());
  }

  getColor(): string {
    return 'Red';
  }

  getDuration(): number {
    return 30000; // 30 seconds
  }
}

export class YellowState implements TrafficLightState {
  next(light: TrafficLight): void {
    light.setState(new RedState());
  }

  getColor(): string {
    return 'Yellow';
  }

  getDuration(): number {
    return 5000; // 5 seconds
  }
}

export class GreenState implements TrafficLightState {
  next(light: TrafficLight): void {
    light.setState(new YellowState());
  }

  getColor(): string {
    return 'Green';
  }

  getDuration(): number {
    return 25000; // 25 seconds
  }
}

// Game Character State Machine
interface CharacterState {
  handleInput(character: GameCharacter, input: string): void;
  update(character: GameCharacter): void;
  getStateName(): string;
}

export class GameCharacter {
  private currentState: CharacterState;
  private health: number = 100;
  private position: { x: number; y: number } = { x: 0, y: 0 };
  private velocity: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    this.currentState = new IdleState();
  }

  public setState(state: CharacterState): void {
    this.currentState = state;
    console.log(`Character state: ${this.currentState.getStateName()}`);
  }

  public handleInput(input: string): void {
    this.currentState.handleInput(this, input);
  }

  public update(): void {
    this.currentState.update(this);
  }

  public getStatus(): string {
    return `${this.currentState.getStateName()} - Health: ${this.health}, Position: (${this.position.x}, ${this.position.y})`;
  }

  // Getters and setters
  public getHealth(): number { return this.health; }
  public setHealth(health: number): void { this.health = health; }
  
  public getPosition(): { x: number; y: number } { return { ...this.position }; }
  public setPosition(x: number, y: number): void { this.position = { x, y }; }
  
  public getVelocity(): { x: number; y: number } { return { ...this.velocity }; }
  public setVelocity(x: number, y: number): void { this.velocity = { x, y }; }
}

export class IdleState implements CharacterState {
  handleInput(character: GameCharacter, input: string): void {
    switch (input) {
      case 'MOVE_LEFT':
      case 'MOVE_RIGHT':
        character.setState(new WalkingState());
        break;
      case 'JUMP':
        character.setState(new JumpingState());
        break;
      case 'ATTACK':
        character.setState(new AttackingState());
        break;
    }
  }

  update(character: GameCharacter): void {
    // Reset velocity when idle
    character.setVelocity(0, 0);
  }

  getStateName(): string {
    return 'Idle';
  }
}

export class WalkingState implements CharacterState {
  private walkSpeed: number = 2;

  handleInput(character: GameCharacter, input: string): void {
    switch (input) {
      case 'STOP':
        character.setState(new IdleState());
        break;
      case 'JUMP':
        character.setState(new JumpingState());
        break;
      case 'ATTACK':
        character.setState(new AttackingState());
        break;
      case 'MOVE_LEFT':
        character.setVelocity(-this.walkSpeed, character.getVelocity().y);
        break;
      case 'MOVE_RIGHT':
        character.setVelocity(this.walkSpeed, character.getVelocity().y);
        break;
    }
  }

  update(character: GameCharacter): void {
    const pos = character.getPosition();
    const vel = character.getVelocity();
    character.setPosition(pos.x + vel.x, pos.y + vel.y);
  }

  getStateName(): string {
    return 'Walking';
  }
}

export class JumpingState implements CharacterState {
  private jumpForce: number = -5;
  private gravity: number = 0.3;

  handleInput(character: GameCharacter, input: string): void {
    // Can only move horizontally while jumping
    switch (input) {
      case 'MOVE_LEFT':
        const leftVel = character.getVelocity();
        character.setVelocity(-1, leftVel.y);
        break;
      case 'MOVE_RIGHT':
        const rightVel = character.getVelocity();
        character.setVelocity(1, rightVel.y);
        break;
    }
  }

  update(character: GameCharacter): void {
    const pos = character.getPosition();
    const vel = character.getVelocity();
    
    // Apply gravity
    character.setVelocity(vel.x, vel.y + this.gravity);
    
    // Update position
    character.setPosition(pos.x + vel.x, pos.y + vel.y);
    
    // Land when reaching ground (y = 0)
    if (pos.y >= 0) {
      character.setPosition(pos.x, 0);
      character.setVelocity(vel.x, 0);
      
      if (Math.abs(vel.x) > 0.1) {
        character.setState(new WalkingState());
      } else {
        character.setState(new IdleState());
      }
    }
  }

  getStateName(): string {
    return 'Jumping';
  }
}

export class AttackingState implements CharacterState {
  private attackDuration: number = 500; // ms
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  handleInput(character: GameCharacter, input: string): void {
    // Cannot interrupt attack
    console.log('Cannot perform action while attacking');
  }

  update(character: GameCharacter): void {
    // Attack animation/logic
    if (Date.now() - this.startTime > this.attackDuration) {
      console.log('Attack completed');
      character.setState(new IdleState());
    }
  }

  getStateName(): string {
    return 'Attacking';
  }
}

// Functional State Pattern (Modern approach)
type StateFunction<T> = (context: T, action: string) => StateFunction<T> | void;

export class FunctionalStateMachine<T> {
  private currentState: StateFunction<T>;
  
  constructor(
    private context: T,
    initialState: StateFunction<T>
  ) {
    this.currentState = initialState;
  }

  public dispatch(action: string): void {
    const nextState = this.currentState(this.context, action);
    if (nextState) {
      this.currentState = nextState;
    }
  }

  public getContext(): T {
    return this.context;
  }
}

// Example: Simple toggle switch using functional state
export const createToggleSwitch = () => {
  const context = { isOn: false };

  const offState: StateFunction<typeof context> = (ctx, action) => {
    if (action === 'TOGGLE') {
      ctx.isOn = true;
      console.log('Switch turned ON');
      return onState;
    }
  };

  const onState: StateFunction<typeof context> = (ctx, action) => {
    if (action === 'TOGGLE') {
      ctx.isOn = false;
      console.log('Switch turned OFF');
      return offState;
    }
  };

  return new FunctionalStateMachine(context, offState);
};

export const metadata: PatternMetadata = {
  title: "State Pattern",
  description: "Change object behavior based on internal state transitions",
  detailedDescription: "🎭 **The State Pattern - Dynamic Behavior Change**\n\nAllows objects to alter behavior when internal state changes. The object appears to change its class dynamically!\n\n🎯 **Core Problem Solved:**\n• Eliminate large conditional statements based on state\n• Make state transitions explicit and manageable\n• Allow different behavior for same methods based on state\n• Encapsulate state-specific behavior in separate classes\n\n🔍 **Three Implementation Approaches:**\n• **State Classes:** Separate classes for each state with specific behavior\n• **State Machine:** Centralized state transition logic and management\n• **Functional State:** Functions representing different states and transitions\n\n🚀 **Real-World Applications:**\n• Media player controls (play, pause, stop states)\n• Game character behavior (idle, walking, jumping, attacking)\n• UI component states (loading, error, success, idle)\n• Network connection management (connected, disconnected, connecting)\n• Workflow and approval processes\n• Traffic light systems and automation\n\n⚡ **Modern Usage Examples:**\n• React component state management with hooks\n• Redux state machines and reducers\n• Game AI behavior trees and state machines\n• Finite state machines in Node.js applications",
  category: "Behavioral",
  difficulty: "Medium",
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",
  concepts: ["State Transitions", "Dynamic Behavior", "Finite State Machine", "Context Switching", "State Encapsulation"],
  useCases: [PatternUseCase.STATE_MANAGEMENT, PatternUseCase.GAME_DEVELOPMENT, PatternUseCase.UI_ARCHITECTURE],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    relatedPatterns: ["Strategy", "Command", "Observer"],
  frameworkSupport: ["Redux", "XState", "React hooks", "State machine libraries"]
};

export const examples: PatternExample[] = [
  {
    scenario: "Media player control",
    description: "Different behavior for play button based on current state",
    input: "player.play() // when stopped",
    output: "Starting playback (state changes to Playing)"
  },
  {
    scenario: "Game character movement",
    description: "Handle input differently based on character state",
    input: "character.handleInput('JUMP') // when walking",
    output: "Character state: Jumping (applies jump physics)"
  },
  {
    scenario: "Traffic light automation",
    description: "Automatic state transitions in traffic control",
    input: "trafficLight.next() // when red",
    output: "Traffic light changed to: Green"
  }
];

export const solutions: Solution[] = [
  {
    name: "media-player-states",
    tabName: "Media Player States",
    approach: "Classic State Pattern Implementation",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    code: `// State interface defining behavior contract
interface MediaPlayerState {
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
  getStatus(): string;
}

// Context class managing current state
class MediaPlayer {
  private currentState: MediaPlayerState;
  private currentTrack: number = 0;

  constructor() {
    this.currentState = new StoppedState();
  }

  setState(state: MediaPlayerState): void {
    this.currentState = state;
    console.log(\`State: \${state.getStatus()}\`);
  }

  play(): void { this.currentState.play(this); }
  pause(): void { this.currentState.pause(this); }
  stop(): void { this.currentState.stop(this); }
}

// Concrete state implementations
class PlayingState implements MediaPlayerState {
  play(player: MediaPlayer): void {
    console.log('Already playing');
  }

  pause(player: MediaPlayer): void {
    console.log('Pausing playback');
    player.setState(new PausedState());
  }

  stop(player: MediaPlayer): void {
    console.log('Stopping playback');
    player.setState(new StoppedState());
  }

  getStatus(): string { return 'Playing'; }
}

class PausedState implements MediaPlayerState {
  play(player: MediaPlayer): void {
    console.log('Resuming playback');
    player.setState(new PlayingState());
  }

  pause(player: MediaPlayer): void {
    console.log('Already paused');
  }

  stop(player: MediaPlayer): void {
    console.log('Stopping from pause');
    player.setState(new StoppedState());
  }

  getStatus(): string { return 'Paused'; }
}

class StoppedState implements MediaPlayerState {
  play(player: MediaPlayer): void {
    console.log('Starting playback');
    player.setState(new PlayingState());
  }

  pause(player: MediaPlayer): void {
    console.log('Cannot pause when stopped');
  }

  stop(player: MediaPlayer): void {
    console.log('Already stopped');
  }

  getStatus(): string { return 'Stopped'; }
}

// Usage
const player = new MediaPlayer();
player.play();  // Starting playback
player.pause(); // Pausing playback
player.play();  // Resuming playback
player.stop();  // Stopping playback`
  },
  {
    name: "game-character-states",
    tabName: "Game Character AI",
    approach: "State-Based Behavior System",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `interface CharacterState {
  handleInput(character: GameCharacter, input: string): void;
  update(character: GameCharacter): void;
  getStateName(): string;
}

class GameCharacter {
  private currentState: CharacterState;
  private position: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    this.currentState = new IdleState();
  }

  setState(state: CharacterState): void {
    this.currentState = state;
    console.log(\`Character: \${state.getStateName()}\`);
  }

  handleInput(input: string): void {
    this.currentState.handleInput(this, input);
  }

  update(): void {
    this.currentState.update(this);
  }

  getPosition() { return this.position; }
  setPosition(x: number, y: number) { this.position = { x, y }; }
}

// Character states with different behaviors
class IdleState implements CharacterState {
  handleInput(character: GameCharacter, input: string): void {
    switch (input) {
      case 'MOVE':
        character.setState(new WalkingState());
        break;
      case 'JUMP':
        character.setState(new JumpingState());
        break;
      case 'ATTACK':
        character.setState(new AttackingState());
        break;
    }
  }

  update(character: GameCharacter): void {
    // Idle behavior - no movement
  }

  getStateName(): string { return 'Idle'; }
}

class WalkingState implements CharacterState {
  handleInput(character: GameCharacter, input: string): void {
    switch (input) {
      case 'STOP':
        character.setState(new IdleState());
        break;
      case 'JUMP':
        character.setState(new JumpingState());
        break;
    }
  }

  update(character: GameCharacter): void {
    // Walking behavior - update position
    const pos = character.getPosition();
    character.setPosition(pos.x + 1, pos.y);
  }

  getStateName(): string { return 'Walking'; }
}

class JumpingState implements CharacterState {
  handleInput(character: GameCharacter, input: string): void {
    // Cannot change state while jumping
  }

  update(character: GameCharacter): void {
    // Jump physics - eventually return to idle
    console.log('Applying jump physics');
    // After jump completes...
    character.setState(new IdleState());
  }

  getStateName(): string { return 'Jumping'; }
}

// Usage
const character = new GameCharacter();
character.handleInput('MOVE');   // Character: Walking
character.handleInput('JUMP');   // Character: Jumping
character.update();              // Jump physics applied, back to Idle`
  },
  {
    name: "functional-state",
    tabName: "Functional State",
    approach: "Modern Functional Approach",
    type: "function",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `// Functional state pattern using higher-order functions
type StateFunction<T> = (context: T, action: string) => StateFunction<T> | void;

class FunctionalStateMachine<T> {
  private currentState: StateFunction<T>;
  
  constructor(
    private context: T,
    initialState: StateFunction<T>
  ) {
    this.currentState = initialState;
  }

  dispatch(action: string): void {
    const nextState = this.currentState(this.context, action);
    if (nextState) {
      this.currentState = nextState;
    }
  }

  getContext(): T {
    return this.context;
  }
}

// Example: Toggle switch with functional states
const createToggleSwitch = () => {
  const context = { isOn: false };

  const offState: StateFunction<typeof context> = (ctx, action) => {
    if (action === 'TOGGLE') {
      ctx.isOn = true;
      console.log('Switch turned ON');
      return onState;
    }
    return offState;
  };

  const onState: StateFunction<typeof context> = (ctx, action) => {
    if (action === 'TOGGLE') {
      ctx.isOn = false;
      console.log('Switch turned OFF');
      return offState;
    }
    return onState;
  };

  return new FunctionalStateMachine(context, offState);
};

// Usage
const toggle = createToggleSwitch();

toggle.dispatch('TOGGLE'); // Switch turned ON
console.log(toggle.getContext().isOn); // true

toggle.dispatch('TOGGLE'); // Switch turned OFF  
console.log(toggle.getContext().isOn); // false

// More complex example: Counter with limits
const createCounter = (min: number, max: number) => {
  const context = { value: min, min, max };

  const normalState: StateFunction<typeof context> = (ctx, action) => {
    switch (action) {
      case 'INCREMENT':
        if (ctx.value < ctx.max) {
          ctx.value++;
          return ctx.value === ctx.max ? maxState : normalState;
        }
        break;
      case 'DECREMENT':
        if (ctx.value > ctx.min) {
          ctx.value--;
          return ctx.value === ctx.min ? minState : normalState;
        }
        break;
    }
    return normalState;
  };

  const minState: StateFunction<typeof context> = (ctx, action) => {
    if (action === 'INCREMENT') {
      ctx.value++;
      return normalState;
    }
    return minState;
  };

  const maxState: StateFunction<typeof context> = (ctx, action) => {
    if (action === 'DECREMENT') {
      ctx.value--;
      return normalState;
    }
    return maxState;
  };

  return new FunctionalStateMachine(context, normalState);
};`
  }
];
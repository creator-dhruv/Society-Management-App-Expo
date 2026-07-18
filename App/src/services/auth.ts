import type {
  AuthSession,
  LoginCredentials,
  SignupCredentials,
  StoredUserRecord,
  User,
} from "@/types/auth";
import {
  getRegisteredUsers,
  saveAuthSession,
  saveRegisteredUsers,
} from "@/services/storage";

const DEMO_USERS: StoredUserRecord[] = [
  {
    id: "demo-user-1",
    name: "Rahul Sharma",
    email: "user@demo.com",
    password: "demo123",
    role: "user",
    flatNo: "A-1204",
    societyId: "society-1",
    phone: "9876543210",
  },
  {
    id: "demo-admin-1",
    name: "Society Admin",
    email: "admin@demo.com",
    password: "demo123",
    role: "admin",
    societyId: "society-1",
    phone: "9876543211",
  },
  {
    id: "demo-guard-1",
    name: "Security Guard",
    email: "guard@demo.com",
    password: "demo123",
    role: "guard",
    societyId: "society-1",
    phone: "9876543212",
  },
];

function createSession(user: User): AuthSession {
  return {
    token: `token_${user.id}_${Date.now()}`,
    user,
  };
}

function stripPassword(record: StoredUserRecord): User {
  const { password: _password, ...user } = record;
  return user;
}

async function findUserByEmail(email: string): Promise<StoredUserRecord | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const registered = await getRegisteredUsers();
  const allUsers = [...DEMO_USERS, ...registered];

  return (
    allUsers.find((user) => user.email.toLowerCase() === normalizedEmail) ??
    null
  );
}

export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const userRecord = await findUserByEmail(credentials.email);

  if (!userRecord || userRecord.password !== credentials.password) {
    throw new Error("Invalid email or password.");
  }

  if (userRecord.role !== credentials.role) {
    throw new Error(
      `This account is registered as ${userRecord.role}. Please select the correct role.`,
    );
  }

  const session = createSession(stripPassword(userRecord));
  await saveAuthSession(session);
  return session;
}

export async function registerUser(
  credentials: SignupCredentials,
): Promise<AuthSession> {
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  if (credentials.password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  if (credentials.role === "user" && !credentials.flatNo?.trim()) {
    throw new Error("Flat number is required for residents.");
  }

  const existing = await findUserByEmail(credentials.email);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const newUser: StoredUserRecord = {
    id: `user_${Date.now()}`,
    name: credentials.name.trim(),
    email: credentials.email.trim().toLowerCase(),
    password: credentials.password,
    role: credentials.role,
    flatNo: credentials.flatNo?.trim(),
    phone: credentials.phone?.trim(),
    societyId: "society-1",
  };

  const registered = await getRegisteredUsers();
  await saveRegisteredUsers([...registered, newUser]);

  const session = createSession(stripPassword(newUser));
  await saveAuthSession(session);
  return session;
}

export async function resetPassword(email: string): Promise<void> {
  const userRecord = await findUserByEmail(email);
  if (!userRecord) {
    throw new Error("No account found with this email.");
  }
}

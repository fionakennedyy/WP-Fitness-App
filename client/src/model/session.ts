import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import * as myFetch from "./myFetch";
import { type User, getUserByEmail } from "./users";

const toast = useToast();

const session = reactive({  // reactive means changes to its properties will trigger reactivity
  user: null as User | null,
  token: null as string | null, 
  redirectUrl: null as string | null,
  messages: [] as {
    type: string,
    text: string,
  }[],
  loading: 0
});

// Function to make API requests with error handling and loading indicator
export function api(action: string, body?: unknown, method?: string, headers?: any) {
  session.loading++;

  // Attach the Authorization header if a token exists
  if (session.token) {
    headers = headers ?? {};
    headers['Authorization'] = `Bearer ${session.token}`;
  }

  // Make an API request using myFetch module
  return myFetch.api(`${action}`, body, method, headers)
    .catch(err => showError(err)) // Handle errors
    .finally(() => session.loading--);  // Decrement loading indicator after API call
}

export function getSession() {
  return session;
}

export function showError(err: any) {
  console.error(err);
  session.messages.push({ type: "error", text: err.message ?? err });
  toast.error(err.message ?? err);
}

// login system w login function and logout function
export function useLogin() {
  const router = useRouter();

  return {
    async login(email: string, password: string): Promise<User | null> {
      // Call the api function to log in
      const response = await api("users/login", { email, password });

      // Set user and token in the session, then redirect
      session.user = response.user;
      session.token = response.token;
      router.push(session.redirectUrl || "/");
      return session.user;
    },
    // Log out by setting user to null and redirecting
    logout() {
      session.user = null;
      router.push("/login")
    },
  };
}

// Register system
export function useRegister() {
  const router = useRouter();

  return {
    async register(firstName: string, lastName: string, email: string, password: string, birthdate: string, gender: string): Promise<User | null> {
      // Call api function to register the user
      const response = await api("users/register", {firstName, lastName, email, password, birthdate, gender});

      toast.success("Registration completed successfully");
      // Set user and token in the session, then redirect
      session.user = response.user;
      session.token = response.token;
      router.push(session.redirectUrl || "/");
      return session.user;
    },
  };
}
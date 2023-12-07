// Extract API root URL from .env
const API_ROOT = import.meta.env.VITE_API_ROOT as string;

// Define generic function for making HTTP requests using Fetch API
export function rest(url: string, body?: unknown, method?: string, headers?: HeadersInit) {
    return fetch(url, {
        // Set HTTP method to "POST" if there's a body, otherwise default to "GET"
        method: method ?? (body ? "POST" : "GET"),
        headers: {
            'Content-Type': 'application/json',
            // Spread any additional headers provided
            ...headers
        },
        // Stringify body as JSON if it exists. otherwise, set it to undefined
        body: body ? JSON.stringify(body) : undefined
    })
    .then(response => 
        response.ok 
        // Resolve with the parsed JSON response if HTTP status is okay
        ? response.json() 
        // Reject with parsed error JSON if HTTP status is not okay
        : response.json().then(err => Promise.reject(err))
    );
}

// Define function for making API requests, combining API root and action
export function api(action: string, body?: unknown, method?: string, headers?: HeadersInit) {
    // Use rest function, appending the API root to the provided action
    return rest(`${API_ROOT}/${action}`, body, method, headers);
}

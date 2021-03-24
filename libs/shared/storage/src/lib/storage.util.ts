export abstract class StorageUtil {
    constructor(private storage: Storage) {}

    /**
     * Empties the list associated with the object of all key/value pairs, if there are any.
     */
    clear() {
        this.storage.clear()
    }

    /**
     * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
     */
    getItem(key: string): string | null {
        return this.storage.getItem(key)
    }

    /**
     * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
     */
    removeItem(key: string) {
        this.storage.removeItem(key)
    }

    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     * 
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     */
    setItem(key: string, value: string) {
        this.storage.setItem(key, value)
    }
}
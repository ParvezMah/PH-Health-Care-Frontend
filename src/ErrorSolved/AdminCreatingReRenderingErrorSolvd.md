# The problem was a classic React Infinite Render Loop caused by unstable function references in a useEffect dependency array.

## 1. The Problem: "<span style="color:red">The Infinite Loop</span>" after creating an admin
Here is the chain of events that caused the crash:

1. You create an Admin: The <span style="color:lightgreen; font-weight:bold; text-decoration:underline;
">createAdmin</span> action succeeds, and `state.success` becomes true.
2. Effect Triggers: Inside `AdminFormDialog`, the `useEffect` runs because `state.success` is `true`.
```
    useEffect(() => {
    if (state?.success) {
        onSuccess(); // <--- Calls the parent's function
        onClose();
    }
    }, [state, onSuccess, onClose]); // <--- Depends on these functions
```
3. Parent Refreshes: The `onSuccess` function in the parent (`AdminsManagementHeader` ) calls `router.refresh()`.
```
    const handleSuccess = () => { // Created NEW every render!
    startTransition(() => {
        router.refresh();
    });
    };
```
4. Re-render: `router.refresh()` causes the page to reload data and re-render the `AdminsManagementHeader` component.
5. New Function Created: Because `AdminsManagementHeader` re-rendered, a completely new version of `handleSuccess` and `handleCloseDialog` was created in memory. They look the same, but to React, they are different objects.

6. Effect Fires Again:
    - `AdminFormDialog` sees that `onSuccess` has changed (it's a new function).
    - The `useEffect` dependency array `[..., onSuccess, ...]` detects a change.
    - The `effect` runs again.
    - It sees `state.success` is still `true`.
    - It calls `onSuccess()` again.
7. Repeat: Go back to step 3. This happens infinitely, hundreds of times per second.



## 2. The Solution: useCallback
1. We used useCallback to freeze (memoize) the functions so they don't change between renders.
```
    // Now, this function is created ONCE and reused forever (unless router changes)
    const handleSuccess = useCallback(() => {
    startTransition(() => {
        router.refresh();
    });
    }, [router]);

    // This one is also frozen. It never changes.
    const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    }, []);
```
2. Why this fixes it:
    - Parent Refreshes: `router.refresh()` happens.
    - Re-render: `AdminsManagementHeader` re-renders.
    - Same Function: `useCallback` returns the exact same function instance as before.
    - No Change Detected: `AdminFormDialog` checks its dependencies. `onSuccess` is the same. `onClose` is the same.
    - Effect Skips: The `useEffect` does not run again.
    - Loop Broken: The app waits for the next user interaction.
// src/state/activeContract.js
let activeContract = null;
let subscribers = [];

export function setActiveContract(contract) {
    activeContract = contract;
    subscribers.forEach((callback) => callback(activeContract));
}

export function getActiveContract() {
    return activeContract;
}

export function subscribe(callback) {
    subscribers.push(callback);
    return () => {
        subscribers = subscribers.filter((cb) => cb !== callback);
    };
}

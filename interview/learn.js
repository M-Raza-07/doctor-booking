// SYNCHRONOUS - blocks everything
function syncExample() {
  console.log("Start");

  const start = Date.now();
  while (Date.now() - start < 3000) {
    // This loop blocks for 3 seconds
  }

  console.log("End"); // Only appears after 3 seconds
}

// ASYNCHRONOUS - doesn't block
function asyncExample() {
  console.log("Start");

  setTimeout(() => {
    console.log("Inside timeout"); // Runs after 3 seconds
  }, 3000);

  console.log("End"); // Runs immediately!
}

syncExample(); // Start... (3 sec pause) ...End
asyncExample(); // Start, End, (3 sec) Inside timeout

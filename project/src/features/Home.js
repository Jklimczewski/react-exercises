function Home() {
    const handleStart = () => {
        window.location.href = "/gym"
    }  
    return (
      <>
        <h1>Welcome to the Fitness App</h1>
        <button onClick={handleStart}>Lets Start</button>
      </>
    );
  }
  
  export default Home;
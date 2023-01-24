import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledDiv = styled("div")`
  text-align: center;
`;

function Home() {
    const handleStart = () => {
        window.location.href = "/gym"
    }  
    return (
      <StyledDiv>
        <h1>Welcome to the Fitness App</h1>
        <Button variant="contained" onClick={handleStart}>Lets Start</Button>
      </StyledDiv>
    );
  }
  
  export default Home;
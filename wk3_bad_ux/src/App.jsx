import './App.css';
import { Box, Button, Modal, Text, Link } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import React, { useEffect, useState, useMemo } from 'react';
const ftcUrl = 'https://www.ftc.gov/news-events/news/press-releases/2023/06/ftc-takes-action-against-amazon-enrolling-consumers-amazon-prime-without-consent-sabotaging-their';
function App() {

  const initialStyle = useMemo(() => {
    return   {
      'transition': 'transform 0.1s linear' 
    }
  }, [])
  

  const [buttonStyle, setButtonStyle] = useState(initialStyle);
  const [showModal, setShowModal] = useState(false);
  const [hue, setHue] = useState(0);


  useEffect(()=>{
    const handleMouseMove = (event) => {
      const newX = event.clientX - Math.random(-300,100);
      const newY = event.clientY + Math.random(-100,100);
      const newButtonStyle = {
        ...buttonStyle,
        transform: `translate(${newX}px, ${newY}px)`,
      }
      setButtonStyle(newButtonStyle)
      const screenWidth = window.innerWidth;
      const newHue = (event.clientX / screenWidth) * 360
      setHue(newHue);
    }

    document.addEventListener('mousemove', handleMouseMove);

    const timeout = setTimeout(() => {
      document.removeEventListener('mousemove', handleMouseMove);
      setButtonStyle(initialStyle)

    }, '5000')
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout)
    }
  }, [buttonStyle, initialStyle])
  
  const handleOnClick = () => {
    setShowModal(true)
    
  }
  const handleModalDismiss = () => {
    setShowModal(false)
  }

  const bgStyle = {
    background: `linear-gradient(135deg, hsl(${hue}, 100%, 70%), hsl(${hue +60}, 100%, 70%))`,
  }

  
  return (
    <div className="App" style={bgStyle}>
      <Box height={1000} width='100%'> 
        <Text weight="bold" size='500' align='center' > Click below to Cancel Subscription</Text>
      <Text align='center'>Inspired by the 2024 FTC  <Link display='inline' href={ftcUrl}>lawsuit against Amazon</Link></Text>
      <button onClick={handleOnClick} id="show-modal-button" style={buttonStyle}> Click me</button>
      </Box>
      {showModal && (
        <Modal 
          size='lg' 
          heading="There is no escape"
          onDismiss={handleModalDismiss} 
          accessibilityModalLabel='confirm cancellation'
          footer={
            <Button color='primary'>ok</Button>
          }
        >
          <Text align='center'> lolz lolz  </Text>
        </Modal>
      )}
    </div>
  );
}

export default App;

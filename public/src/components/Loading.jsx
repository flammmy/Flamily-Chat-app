import React from 'react';
import styled from 'styled-components';
function Loading() {
  return (
    <Cont>
      <Loader></Loader>
    </Cont>
  )
}
const Cont = styled.div`
    display: flex;
    height: 100%;
    width : 100%;
    justify-content: center;
    align-items: center;
    @keyframes spin{
        from{
            transform: rotate(0deg);
        }
        to{
            transform : rotate(360deg);
        }
    }
`;
const Loader = styled.div`
    height: 3rem;
    width : 3rem;
    border : 3px solid white;
    border-top : none;
    border-radius: 50%;
    animation-name : spin;
    animation-duration : 1000ms;
    animation-iteration-count : infinite;
    animation-timing-function : linear;


`;
export default Loading

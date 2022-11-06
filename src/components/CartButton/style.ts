import styled from 'styled-components';

export const CartWrapper = styled.div`
  .button__badge {
    position: absolute;
    right: -0.2em;
    top: -0.2em;
    min-width: 2em;
    height: 2em;
    border-radius: 50%;
    border: 0.05em solid white;
    background-color: #ef5350;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    color: white;
    animation: pulse 2s infinite;
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 rgba(239, 83, 80, 0.4);
    }
    70% {
      -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    }
    100% {
      -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(239, 83, 80, 0.4);
      box-shadow: 0 0 0 0 rgba(239, 83, 80, 0.4);
    }
    70% {
      -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
      box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
      box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
  }
`;

import styled from 'styled-components'
import EdiText from "react-editext";

export const StyledEdiText = styled(EdiText)`
  button {
    border-radius: 5px;
  }
  input, textarea{
    border-color: #ff0000 !important;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6) !important;
    border-radius: 15px; 
    color: #465362;
     
  }`
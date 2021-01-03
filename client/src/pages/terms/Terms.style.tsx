import styled from 'styled-components';

export const Container = styled.div `
    background: #fff; 
    overflow-y: scroll; 
    height: 100%;
    & > * {
        margin: 10px;
    }
`
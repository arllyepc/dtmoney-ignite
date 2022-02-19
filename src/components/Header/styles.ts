import styled from 'styled-components';

export const Container = styled.header`
	background-color: var(--blue);
`;

export const Content = styled.div`
	max-width: 1120px;
	margin: 0 auto;

	padding: 0 1rem 10rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

    button {
        font-size: 1rem;
        color: #fff;
    }
`;

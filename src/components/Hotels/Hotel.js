import styled from 'styled-components';

export default function Hotel({ image, name, id }) {
  return (
    <Container id={id}>
      <Image image={image} />
      <Name>{name}</Name>
    </Container>
  );
}

const Container = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background-color: #ebebeb;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  cursor: pointer;
`;

const Image = styled.div`
  background: url(${(props) => props.image}) center center no-repeat;
  background-size: cover;
  border-radius: 5px;
  width: 168px;
  height: 109px;
`;

const Name = styled.div`
  width: 100%;
  height: 24px;
  font-size: 20px;
  display: flex;
  margin-top: 10px;
  color: #343434;
  align-items: center;
`;

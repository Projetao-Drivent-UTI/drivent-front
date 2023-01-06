import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export default function NoEnrollment() {
  return (
    <>
      <Box>
        <StyledTypography variant='subtitle1' color='textSecondary'>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</StyledTypography>
      </Box>
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin: auto;
  text-align: center;
  max-width: 500px;
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

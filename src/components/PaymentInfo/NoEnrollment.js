import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export default function NoEnrollment() {
  return (
    <>
      <StyledTypography variant='subtitle1' color='textSecondary'>Você precisa completar sua inscrição antes
de prosseguir pra escolha de ingresso</StyledTypography>
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin: auto;
  text-align: center;
  max-width: 300px;
`;

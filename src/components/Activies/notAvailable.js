import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export default function NotAvailable( { userTicket } ) {
  return (
    <>
      <Box>
        <StyledTypography variant='subtitle1' color='textSecondary'>{ userTicket.status ==='RESERVED'?
          'Você precisa ter confirmado pagamento antes de fazer a escolha de atividades'
          :'Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.'}</StyledTypography>
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

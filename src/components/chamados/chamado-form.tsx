"use client";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';

export function NovoChamadoForm () {
    return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="Criar Novo Chamado" title="Formulário de Chamado" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl fullWidth>
              <InputLabel>Titulo do Chamado</InputLabel>
              <OutlinedInput label="Titulo do Chamado" name="titulo" type="titulo" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel></InputLabel>
              <OutlinedInput label="Confirm password" name="confirmPassword" type="password" />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button 
          variant="contained"
          sx={
            {
              px: 10,
              py: 1.5,
              my: 1.5,
              mr: 1,
              fontSize: '0.875rem',
              fontWeight: 700,
              borderRadius: '1rem',
            }
          }
          >
            Criar
          </Button>
        </CardActions>
      </Card>
    </form>
    );
}
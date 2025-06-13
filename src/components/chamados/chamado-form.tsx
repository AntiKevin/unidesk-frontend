"use client";
import {
  Button, Card, CardActions, CardContent,
  CardHeader, Divider, FormControl, InputLabel,
  MenuItem, OutlinedInput, Select, Stack
} from '@mui/material';

export function NovoChamadoForm () {
  const categorias = [
    { value: 'cat1', label: 'Categoria 1' },
    { value: 'cat2', label: 'Categoria 2' },
    { value: 'cat3', label: 'Categoria 3' }
  ]

  const prioridades = [
    { value: 'baixa', label: 'Baixa' },
    { value: 'normal', label: 'Normal' },
    { value: 'alta', label: 'Alta' },
    { value: 'urgente', label: 'Urgente' },
    { value: 'critica', label: 'Crítica' }
  ]

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
          <Stack flexDirection="row" spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Titulo do Chamado</InputLabel>
              <OutlinedInput label="Titulo do Chamado" name="titulo" type="text" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Número</InputLabel>
              <OutlinedInput label="Número" name="numero" type="text" />
            </FormControl>
          </Stack>
          <Stack flexDirection="row" spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select defaultValue={categorias[0].value} label="State" name="state" variant="outlined">
                  {categorias.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            <FormControl fullWidth>
              {/* Select de prioridade */}
              <InputLabel>Prioridade</InputLabel>
              <Select defaultValue={prioridades[0].value} label="Prioridade" name="prioridade" variant="outlined">
                  {prioridades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack flexDirection="row" spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Descrição</InputLabel>
              <OutlinedInput label="Descrição" name="descricao" type="text" multiline rows={4} />
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
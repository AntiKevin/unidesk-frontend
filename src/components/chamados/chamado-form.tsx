"use client";
import CategoriaService from '@/services/CategoriaService';
import PrioridadeService from '@/services/PrioridadeService';
import {
  Button, Card, CardActions, CardContent,
  CardHeader, Divider, FormControl, InputLabel,
  MenuItem, OutlinedInput, Select, Stack
} from '@mui/material';
import { useEffect, useState } from 'react';

export function NovoChamadoForm () {

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [prioridades, setPrioridades] = useState<Prioridade[]>([])

  const defaultCategoria = {
    idCategoria: 1,
    nome: 'Sem Categoria Definida',
  }

  const defaultPrioridade = {
    idPrioridade: 1,
    nivel: 'Sem Prioridade Definida',
  };


  // Funções para buscar categorias
  async function fetchCategorias() {
    try {
      const response = await CategoriaService.getCategorias();
      setCategorias(response);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  }

  // Função para buscar prioridades
  async function fetchPrioridades() {
    try {
      const response = await PrioridadeService.getPrioridades();
      setPrioridades(response);
    } catch (error) {
      console.error("Error fetching prioridades:", error);
    }
  }

  useEffect(() => {
    // Chama as funções para buscar categorias e prioridades
    // quando o componente for montado
    fetchCategorias();
    fetchPrioridades();
  }, []);

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
                <Select defaultValue={1} label="Categoria" name="categoria" variant="outlined">
                  {categorias.map((option) => (
                    <MenuItem key={option.idCategoria} value={option.idCategoria}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            <FormControl fullWidth>
              {/* Select de prioridade */}
              <InputLabel>Prioridade</InputLabel>
              <Select defaultValue={1} label="Prioridade" name="prioridade" variant="outlined">
                  {prioridades.map((option) => (
                    <MenuItem key={option.idPrioridade} value={option.idPrioridade}>
                      {option.nivel}
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
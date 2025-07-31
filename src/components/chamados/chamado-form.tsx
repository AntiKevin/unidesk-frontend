"use client";
import { useUser } from '@/hooks/use-user';
import AlunoService from '@/services/AlunoService';
import CategoriaService from '@/services/CategoriaService';
import PrioridadeService from '@/services/PrioridadeService';
import TicketService from '@/services/TicketService';
import {
  Button, Card, CardActions, CardContent,
  CardHeader, Divider, FormControl, InputLabel,
  MenuItem, OutlinedInput, Select, Stack
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DEFAULTCATEGORIA = {
  idCategoria: 1,
  nome: 'Sem Categoria Definida',
}

const DEFAULTPRIORIDADE = {
  idPrioridade: 1,
  nivel: 'Sem Prioridade Definida',
};

const DEFAULTTICKET: TicketCreate = {
    titulo: '',
    descricao: '',
    idCoordenacao: 0,
    idAluno: 0,
    idStatus: 1, // Aberto
    idPrioridade: 1, // Sem Prioridade
    idCategoria: 1, // Sem Categoria
  }
export function NovoChamadoForm(): React.JSX.Element {

  const [categorias, setCategorias] = useState<Categoria[]>([DEFAULTCATEGORIA])
  const [prioridades, setPrioridades] = useState<Prioridade[]>([DEFAULTPRIORIDADE])
  const [ticketFormData, setTicketFormData] = useState<TicketCreate>(DEFAULTTICKET);

  const { user } = useUser();
  const router = useRouter();


  // Função para buscar a coordenacao do usuário
  // para preencher o campo de coordenacao no formulário de criação de chamado
  const getUserCoordenacao = async () => {
    if (user && user.role === 'ALUNO') {
      try {
        const aluno = await AlunoService.getAlunoById(user.id);
        if (aluno.curso.coordenacao) {
          setTicketFormData((prev) => ({
            ...prev,
            idCoordenacao: aluno.curso.coordenacao.idCoordenacao,
            idAluno: user.id,
          }));
        }
      }
      catch (error) {
        console.error("Error fetching user coordenacao:", error);
      }
    }
  };


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const payload: TicketCreate = {
        titulo: ticketFormData.titulo,
        descricao: ticketFormData.descricao,
        idCoordenacao: ticketFormData.idCoordenacao,
        idAluno: user?.role === 'ALUNO' ? user.id : ticketFormData.idAluno,
        idStatus: ticketFormData.idStatus,
        idPrioridade: ticketFormData.idPrioridade,
        idCategoria: ticketFormData.idCategoria,
      };
      await TicketService.createTicket(payload);
      // Reset form or show success message
      setTicketFormData(DEFAULTTICKET);
      router.push('/dashboard/chamados');
      
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  }

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
    // Chama as funções para buscar categorias e prioridades e a coordenacao do usuário
    // quando o componente for montado
    getUserCoordenacao();
    fetchCategorias();
    fetchPrioridades();
  }, []);

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
    >
      <Card>
        <CardHeader subheader="Criar Novo Chamado" title="Formulário de Chamado" />
        <Divider />
        <CardContent>
          <Stack flexDirection="row" spacing={3}>
            <FormControl fullWidth required>
              <InputLabel>Titulo do Chamado</InputLabel>
              <OutlinedInput
                value={ticketFormData.titulo}
                onChange={(e) => setTicketFormData({ ...ticketFormData, titulo: e.target.value })}
                label="Titulo do Chamado"
                name="titulo"
                type="text"
              />
            </FormControl>
          </Stack>
          <Stack flexDirection="row" spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={ticketFormData.idCategoria}
                onChange={(e) => setTicketFormData({ ...ticketFormData, idCategoria: e.target.value as number })}
                defaultValue={1}
                label="Categoria"
                name="categoria"
                variant="outlined"
              >
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
              <Select
                value={ticketFormData.idPrioridade}
                onChange={(e) => setTicketFormData({ ...ticketFormData, idPrioridade: e.target.value as number })}
                defaultValue={1}
                label="Prioridade"
                name="prioridade"
                variant="outlined"
              >
                {prioridades.map((option) => (
                  <MenuItem key={option.idPrioridade} value={option.idPrioridade}>
                    {option.nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack flexDirection="row" spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Descrição</InputLabel>
              <OutlinedInput
                value={ticketFormData.descricao}
                onChange={(e) => setTicketFormData({ ...ticketFormData, descricao: e.target.value })}
                label="Descrição"
                name="descricao"
                type="text"
                multiline
                rows={4}
              />
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
            type='submit'
          >
            Criar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
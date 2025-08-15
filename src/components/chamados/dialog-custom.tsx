'use client';
import { useUser } from '@/hooks/use-user';
import FuncCoordenacaoService from '@/services/FuncCoordenacaoService';
import StatusService from '@/services/statusService';
import TicketService from '@/services/TicketService';

import HistoryIcon from '@mui/icons-material/History';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Divider, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { X } from '@phosphor-icons/react/dist/ssr';
import * as React from 'react';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


type Props = {
  open: boolean;
  onClose: () => void;
  chamado: Ticket | null;
  mode: 'view' | 'finalize';
  currentStatus: Status;
  onSubmit?: (payload: TicketUpdate) => void;
}

const DEFAULT_SELECTED_EMPLOYEE = { id: 0, name: 'Selecione um funcionário' };

export default function DialogCustom({ open, onClose, chamado, mode, onSubmit, currentStatus }: Props) {

  const [status, setStatus] = React.useState<Status>(currentStatus);
  const [statusOptions, setStatusOptions] = React.useState<Status[]>([]);
  const [selectedEmployee, setSelectedEmployee] = React.useState<{ id: number; name: string }>(DEFAULT_SELECTED_EMPLOYEE);
  const [employeeOptions, setEmployeeOptions] = React.useState<{ id: number; name: string }[]>([]);
  const [step, setStep] = React.useState(1);
  const [mensagem, setMensagem] = React.useState("");
  const [mensages, setMessages] = React.useState<TicketMessages[]>([]);
  const [movimentacoes, setMovimentacoes] = React.useState<TicketMovimentacao[]>([]);

  const { user } = useUser();

  async function fetchStatusOptions() {
    try {
      const options = await StatusService.getStatus();
      setStatusOptions(options);
    } catch (error) {
      console.error("Error fetching status options:", error);
    }
  }

  async function fetchEmployeeOptions() {
    try {
      const response = await FuncCoordenacaoService.getFuncionarios();
      const options = response.map((funcionario) => ({
        id: funcionario.idUsuario,
        name: funcionario.nome,
      }));
      setEmployeeOptions(options);
    } catch (error) {
      console.error("Error fetching employee options:", error);
    }
  }

  // Define o status inicial como o status atual do chamado
  React.useEffect(() => {
    if (chamado) {
      const initialStatus = chamado.status || currentStatus;
      setStatus(initialStatus);
      setSelectedEmployee({
        id: chamado.funcionario?.idUsuario || 0,
        name: chamado.funcionario?.nome || 'Selecione um funcionário',
      });
    }
  }, [chamado, currentStatus]);

  // Atualiza o status quando o currentStatus muda
  React.useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus])

  // Obtem as opções de status quando o componente é montado
  React.useEffect(() => {
    fetchStatusOptions();
    if (user?.role === "COORDENADOR" || user?.role === "ADMIN") {
      fetchEmployeeOptions();
    }
    if (open && mode === 'view' && chamado) {
      TicketService.getTicketMovimentacoes(chamado.idTicket.toString())
        .then(data => setMovimentacoes(data))
        .catch(err => console.error('Error fetching movimentações:', err));
    }
  }, [open, mode, chamado]);

  // Limpa as opções quando o componente é desmontado
  React.useEffect(() => {
    return () => {
      setStatusOptions([]);
      setEmployeeOptions([]);
    }
  }, []);

  React.useEffect(() => {
    if (!open) {
      // Quando fechar, volta para o dialog de step 1
      setStep(1);
      setMensagem("");
    }
  }, [open]);

  React.useEffect(() => {
    if (step === 2 && chamado?.idTicket !== undefined) {
      handleMessage();
    }
  }, [step, chamado]);

  // limpa estados e dispara onClose original
  const handleCloseInternal = () => {
    setStatus(currentStatus);
    setSelectedEmployee(DEFAULT_SELECTED_EMPLOYEE);
    onClose();
  };

  const handleFinalize = () => {
    if (onSubmit && chamado) {
      const payload: TicketUpdate = {
        // definindo como Pendente caso FUNCIONARIO_COORDENACAO se não define como fechado
        idStatus: user?.role === "FUNCIONARIO_COORDENACAO" ? 4 : 3,
        // mantendo os outros campos do chamado
        titulo: chamado.titulo,
        descricao: chamado.descricao,
        mensagem: mensagem || chamado?.mensagem || "",
        idCoordenacao: chamado.coordenacao?.idCoordenacao || 0,
        idAluno: chamado.aluno?.idUsuario || 0,
        idPrioridade: chamado.prioridade?.idPrioridade || 1,
        idCategoria: chamado.categoria?.idCategoria || 1,
        idFuncionario: chamado.funcionario?.idUsuario || 0,
      };
      onSubmit(payload);
    }
    handleCloseInternal();
  }

  const handleMessage = async () => {
    try {
      if (chamado?.idTicket !== undefined) {
        const result = await TicketService.getTicketMessages(chamado?.idTicket);
        setMessages(result);
      }
    } catch (error) {
      console.error('Erro ao buscar chamados paginados:', error);
    }
  }

  const handleClick = () => {
    if (onSubmit && chamado) {
      const payload: TicketUpdate = {
        idStatus: status.idStatus,
        titulo: chamado.titulo,
        mensagem: chamado?.mensagem,
        descricao: chamado.descricao,
        idCoordenacao: chamado.coordenacao?.idCoordenacao || 0,
        idAluno: chamado.aluno?.idUsuario || 0,
        idPrioridade: chamado.prioridade?.idPrioridade || 1,
        idCategoria: chamado.categoria?.idCategoria || 1,
        idFuncionario: selectedEmployee.id || chamado.funcionario?.idUsuario || 0,
      };
      onSubmit(payload);
    }
    handleCloseInternal();
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseInternal}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: 500, // largura mínima
            minHeight: 300 // altura mínima
          }
        }}
      >
        {step === 1 && (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              {mode === 'view' ? 'Detalhes do Ticket' : 'Finalizar Ticket'}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseInternal}
              sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <X />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>
                <strong>ID:</strong> {chamado?.id}
              </Typography>
              <Typography gutterBottom>
                <strong>Título:</strong> {chamado?.titulo}
              </Typography>
              <Typography gutterBottom>
                <strong>E-mail:</strong> {chamado?.aluno?.email || chamado?.funcionario?.email || 'N/A'}
              </Typography>
              <Typography gutterBottom>
                <strong>Data:</strong> {chamado?.dataCriacao ? new Date(chamado?.dataCriacao * 1000).toLocaleString() : 'N/A'}
              </Typography>
              <Typography gutterBottom>
                <strong>Descrição:</strong> {chamado?.descricao || 'N/A'}
              </Typography>
              {mode === 'view' && (user?.role === "ADMIN"
                || user?.role === "COORDENADOR"
              ) && (
                  <>
                    <strong>Status: </strong>
                    <FormControl sx={{ flexGrow: 1, maxWidth: '100%', width: 240 }}>
                      <Select
                        value={status.idStatus}
                        onChange={(e) => {
                          const sel = statusOptions.find(s => s.idStatus === Number(e.target.value));
                          if (sel) setStatus(sel);
                        }}
                        displayEmpty
                      >
                        {statusOptions.map(opt => (
                          <MenuItem key={opt.idStatus} value={opt.idStatus}>
                            {opt.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              {mode === 'view' && (user?.role === "ALUNO" || user?.role === "FUNCIONARIO_COORDENACAO") && (
                <Typography gutterBottom>
                  <strong>Status: </strong> {status.nome}
                </Typography>
              )}
              {mode === 'view' && (user?.role === "ADMIN" || user?.role === "COORDENADOR") && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }} >
                  <FormControl sx={{ flexGrow: 1, maxWidth: '100%', width: 240 }}>
                    <InputLabel id="add-employee-label">Funcionário</InputLabel>
                    <Select
                      labelId="add-employee-label"
                      label="Funcionário"
                      value={selectedEmployee.id}
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        const sel = employeeOptions.find(opt => opt.id === id);
                        if (sel) setSelectedEmployee(sel);
                      }}
                    >
                      {employeeOptions.map(opt => (
                        <MenuItem key={opt.id} value={opt.id}>
                          {opt.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
              {/* Timeline de Movimentações */}
              {mode === 'view' && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Histórico de Movimentações</Typography>
                  {movimentacoes.length > 0 ? (
                    <Timeline position="right">
                      {movimentacoes.map((mov) => (
                        <TimelineItem key={mov.idMovimentacao}>
                          <TimelineOppositeContent variant="body2" color="text.secondary">
                            {new Date(mov.dataMovimentacao).toLocaleString()}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="primary"><HistoryIcon /></TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography>{mov.tipo}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {mov.usuarioDestino ? `${String(mov.usuarioOrigem.nome)} → ${String(mov.usuarioDestino.nome)}` :
                                `${String(mov.usuarioOrigem.nome)}`}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  ) : (
                    <Typography variant="body2" color="text.secondary">Nenhuma movimentação encontrada.</Typography>
                  )}
                </>
              )}
            </DialogContent>
            <DialogActions>
              {mode === 'view' && (
                <Button onClick={() => {
                  setStep(2);
                  handleMessage();
                }}>
                  Mensagens
                </Button>
              )}
              {/* Usuarios Alunos e funcionários de coordenação não podem modificar um chamado */}
              {mode === 'view' 
              && user?.role !== "ALUNO" 
              && user?.role !== "FUNCIONARIO_COORDENACAO" 
              && (
                <Button onClick={handleClick}>
                  Alterar
                </Button>
              )}
              {mode === 'finalize' && (
                <Button
                  onClick={() => setStep(2)}>
                  Avançar
                </Button>
              )}
            </DialogActions>
          </>
        )}

        {step === 2 && (
          <>
            <IconButton
              aria-label="close"
              onClick={handleCloseInternal}
              sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <X />
            </IconButton>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              {mode === 'view' ? 'Detalhes do Ticket' : 'Finalizar Ticket'}
            </DialogTitle>
            <DialogContent dividers>
              {mode === 'view' && (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {mensages.length > 0 ? (
                    mensages.map((message) => (
                      <React.Fragment key={message.idMensagem}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={
                              <Typography variant="subtitle2" color="text.secondary">
                                {message.usuario?.nome || 'Desconhecido'} - ID: {message.idMensagem}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body1" color="text.primary">
                                {message.conteudo}
                              </Typography>
                            }
                          />
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Nenhuma mensagem disponível para este chamado.
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                </List>
              )}

              {mode === 'finalize' && user?.role !== "ALUNO" && (
                <TextField
                  id="standard-multiline-static"
                  label="Resolução"
                  fullWidth
                  multiline
                  rows={6}
                  defaultValue="Fale o que foi feito no chamado"
                  variant="outlined"
                  onChange={(e) => setMensagem(e.target.value)}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setStep(1)}>
                Voltar
              </Button>
              {mode === 'finalize' && (
                <Button
                  onClick={handleFinalize}>
                  Finalizar
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
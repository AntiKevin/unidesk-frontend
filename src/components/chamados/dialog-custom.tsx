'use client';
import StatusService from '@/services/statusService';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Pen } from '@phosphor-icons/react';
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
  currentStatus: Status
  onSubmit?: (idStatus: number) => void;
}

export default function DialogCustom( { open, onClose, chamado, mode, onSubmit, currentStatus}: Props ) {

  const [status, setStatus] = React.useState<Status>(currentStatus);
  const [statusOptions, setStatusOptions] = React.useState<Status[]>([]);

  async function fetchStatusOptions() {
    try {
      const options = await StatusService.getStatus();
      setStatusOptions(options);
    } catch (error) {
      console.error("Error fetching status options:", error);
    }
  }

  React.useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus])

  // Obtem as opções de status quando o componente é montado
  React.useEffect(() => {
    fetchStatusOptions();
  }, []);

  
  const handleFinalize = () => {
    onClose();
  }

  const handleClick = () => {
    if(onSubmit) {
      onSubmit(status.idStatus)
    }
    onClose()
  }

  return (
    <React.Fragment>
      
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {mode === 'view' ? 'Detalhes do Ticket' : 'Finalizar Ticket'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          {mode === 'view' && (
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
          {mode === 'finalize' && (
            <Box sx={{ flexGrow: 1, maxWidth: '100%', width: '100%' }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <Box sx={{ color: 'text.secondary', mr: 1 }}>
                    <Pen fontSize="var(--icon-fontSize-md)" />
                  </Box>
                ),
              }}
              placeholder="Observações"
            />
          </Box>
          )}
        </DialogContent>
        <DialogActions>
          
          {mode === 'view' && (
            <Button onClick={handleClick}>
              Alterar
            </Button>
          )}
          {mode === 'finalize' && (
            <Button onClick={handleFinalize}>
              Finalizar
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
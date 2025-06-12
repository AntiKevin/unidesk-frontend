'use client';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { X } from '@phosphor-icons/react/dist/ssr';
import { Chamado } from './chamados-list';
import dayjs from 'dayjs';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Pen } from '@phosphor-icons/react';

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
  chamado: Chamado | null;
  mode: 'view' | 'finalize';
  currentStatus: 'aberto' | 'emAndamento' | 'resolvido' | 'fechado';
  onSubmit?: (status: string) => void;
}

export default function DialogCustom( { open, onClose, chamado, mode, onSubmit, currentStatus}: Props ) {

  const [status, setStatus] = React.useState<'aberto' | 'emAndamento' | 'resolvido' | 'fechado'>(currentStatus);

  React.useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus])

  
  const handleFinalize = () => {
    // Codigo para finalizar o chamado e mandar para o pai(chamados-list) tratar...
    onClose();
  }

  const handleClick = () => {
    if(onSubmit) {
      onSubmit(status)
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
            <strong>E-mail:</strong> {chamado?.solicitante.email}

          </Typography>
          <Typography gutterBottom>
            <strong>Data:</strong> {dayjs(chamado?.criadoEm).format('DD/MM/YYYY HH:mm')}
          </Typography>
          <Typography gutterBottom>
            <strong>Descrição:</strong> Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
          {mode === 'view' && (
            <>
            <strong>Status: </strong>
            <FormControl sx={{ flexGrow: 1, maxWidth: '100%', width: 240 }}>
            <Select value={status} onChange={(e) => setStatus(e.target.value as 'aberto' | 'emAndamento' | 'resolvido' | 'fechado')}>
              <MenuItem value="aberto">Aberto</MenuItem>
              <MenuItem value="emAndamento">Em Andamento</MenuItem>
              <MenuItem value="resolvido">Resolvido</MenuItem>
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
          <Button autoFocus onClick={onClose}>
            Fechar
          </Button>
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
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
import dayjs from 'dayjs';
import { Faq } from './faq-list';

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
  faq: Faq | null;
  
}

export default function DialogFaq( { open, onClose, faq}: Props ) {

  

  
 

  

  return (
    <React.Fragment>
      
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {faq?.titulo}
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
            <strong>Título:</strong> {faq?.titulo}

          </Typography>
          
          
          <Typography gutterBottom>
            <strong>Descrição:</strong>  {faq?.descricao}
          </Typography>
          
          
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
              Fechar
            </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
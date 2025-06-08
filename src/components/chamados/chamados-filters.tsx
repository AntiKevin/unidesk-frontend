// src/components/dashboard/chamados/chamados-filters.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export function ChamadosFilters(): React.JSX.Element {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            m: -1.5,
            p: 1.5,
          }}
        >
          <Box sx={{ flexGrow: 1, maxWidth: '100%', width: 360 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <Box sx={{ color: 'text.secondary', mr: 1 }}>
                    <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                  </Box>
                ),
              }}
              placeholder="Buscar chamados"
            />
          </Box>
          <FormControl sx={{ flexGrow: 1, maxWidth: '100%', width: 240 }}>
            <InputLabel>Status</InputLabel>
            <Select input={<OutlinedInput label="Status" />} value="">
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="aberto">Aberto</MenuItem>
              <MenuItem value="emAndamento">Em Andamento</MenuItem>
              <MenuItem value="resolvido">Resolvido</MenuItem>
              <MenuItem value="fechado">Fechado</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flexGrow: 1, maxWidth: '100%', width: 240 }}>
            <InputLabel>Prioridade</InputLabel>
            <Select input={<OutlinedInput label="Prioridade" />} value="">
              <MenuItem value="todas">Todas</MenuItem>
              <MenuItem value="baixa">Baixa</MenuItem>
              <MenuItem value="media">Média</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
              <MenuItem value="critica">Crítica</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flexGrow: 1, maxWidth: '100%', width: 240 }}>
            <InputLabel>Departamento</InputLabel>
            <Select input={<OutlinedInput label="Departamento" />} value="">
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="secretariaAcademica">Secretaria Acadêmica</MenuItem>
              <MenuItem value="biblioteca">Biblioteca</MenuItem>
              <MenuItem value="laboratorios">Laboratórios</MenuItem>
              <MenuItem value="ti">TI</MenuItem>
              <MenuItem value="administrativo">Administrativo</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
            <Button color="inherit" size="large" variant="text">
              Limpar
            </Button>
            <Button size="large" variant="contained">
              Filtrar
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
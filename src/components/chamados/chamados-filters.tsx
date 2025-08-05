import CursoService from '@/services/CursoService';
import PrioridadeService from '@/services/PrioridadeService';
import StatusService from '@/services/statusService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import * as React from 'react';

interface ChamadosFiltersProps {
  onFilter: (filters: {
    search: string;
    statusId: number | null;
    prioridadeId: number | null;
    cursoId: number | null;
  }) => void;
}

export function ChamadosFilters({ onFilter }: ChamadosFiltersProps): React.JSX.Element {
  const [search, setSearch] = React.useState('');
  const [statusId, setStatusId] = React.useState<number | ''>('');
  const [prioridadeId, setPrioridadeId] = React.useState<number | ''>('');
  const [cursoId, setCursoId] = React.useState<number | ''>('');
  const [statusOptions, setStatusOptions] = React.useState<Status[]>([]);
  const [prioridadeOptions, setPrioridadeOptions] = React.useState<Prioridade[]>([]);
  const [cursoOptions, setCursoOptions] = React.useState<Curso[]>([]);

  React.useEffect(() => {
    StatusService.getStatus().then(setStatusOptions).catch(console.error);
    PrioridadeService.getPrioridades().then(setPrioridadeOptions).catch(console.error);
    CursoService.getCursos().then(setCursoOptions).catch(console.error);
  }, []);

  const handleFilter = () => {
    onFilter({
      search,
      statusId: statusId === '' ? null : statusId,
      prioridadeId: prioridadeId === '' ? null : prioridadeId,
      cursoId: cursoId === '' ? null : cursoId,
    });
  };

  const handleClear = () => {
    setSearch('');
    setStatusId('');
    setPrioridadeId('');
    setCursoId('');
    onFilter({ search: '', statusId: null, prioridadeId: null, cursoId: null });
  };

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
              value={search}
              onChange={e => setSearch(e.target.value)}
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
            <Select
              input={<OutlinedInput label="Status" />}
              value={statusId}
              onChange={e => setStatusId(e.target.value === '' ? '' : Number(e.target.value))}
            >
              <MenuItem value="">Todos</MenuItem>
              {statusOptions.map(option => (
                <MenuItem key={option.idStatus} value={option.idStatus}>
                  {option.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flexGrow: 1, maxWidth: '100%', width: 240 }}>
            <InputLabel>Prioridade</InputLabel>
            <Select
              input={<OutlinedInput label="Prioridade" />}
              value={prioridadeId}
              onChange={e =>
                setPrioridadeId(e.target.value === '' ? '' : Number(e.target.value))
              }
            >
              <MenuItem value="">Todas</MenuItem>
              {prioridadeOptions.map(option => (
                <MenuItem key={option.idPrioridade} value={option.idPrioridade}>
                  {option.nivel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flexGrow: 1, maxWidth: '100%', width: 240 }}>
            <InputLabel>Departamento</InputLabel>
            <Select
              input={<OutlinedInput label="Departamento" />}
              value={cursoId}
              onChange={e => setCursoId(e.target.value === '' ? '' : Number(e.target.value))}
            >
              <MenuItem value="">Todos</MenuItem>
              {cursoOptions.map(option => (
                <MenuItem key={option.idCurso} value={option.idCurso}>
                  {option.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
            <Button color="inherit" size="large" variant="text" onClick={handleClear}>
              Limpar
            </Button>
            <Button size="large" variant="contained" onClick={handleFilter}>
              Filtrar
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
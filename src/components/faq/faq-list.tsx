'use client';
import { Button, Card, CardActions, CardHeader, Divider, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { Box, Stack, SxProps } from "@mui/system";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import React from "react";
import DialogFaq from "./dialog-faq";

export interface Faq {
    id: string;
    titulo: string;
    categoria: string;
    descricao: string;
}

export interface FaqListProps {
    faqs?: Faq[];
    sx?: SxProps;
}

export function FaqList({ faqs = [], sx }: FaqListProps): React.JSX.Element {


    const dadosFaqs = [
        {
            id: "1",
            titulo: "Como redefinir minha senha?",
            categoria: "Base de conhecimento",
            descricao: "Para redefinir sua senha, clique em 'Esqueci minha senha' na tela de login e siga as instruções enviadas para seu e-mail."
        },
        {
            id: "2",
            titulo: "Como abrir um novo chamado?",
            categoria: "Base de conhecimento",
            descricao: "Acesse o sistema, vá até a aba 'Chamados' e clique em 'Novo Chamado'. Preencha os campos obrigatórios e envie."
        },
        {
            id: "3",
            titulo: "Posso acompanhar o status do meu chamado?",
            categoria: "Base de conhecimento",
            descricao: "Sim, todos os seus chamados ficam listados em 'Meus Chamados'. Lá você pode ver o status e atualizações."
        },
        {
            id: "4",
            titulo: "Como atualizar um chamado já aberto?",
            categoria: "Base de conhecimento",
            descricao: "Você pode adicionar comentários ou anexos a um chamado aberto acessando-o na lista de 'Meus Chamados'."
        },
        {
            id: "5",
            titulo: "O que significa o status 'Em andamento'?",
            categoria: "Base de conhecimento",
            descricao: "Esse status indica que a equipe responsável já está analisando e trabalhando na resolução do chamado."
        },
        {
            id: "6",
            titulo: "Como cancelar um chamado?",
            categoria: "Base de conhecimento",
            descricao: "Chamados ainda não atendidos podem ser cancelados diretamente pela tela de visualização do chamado."
        },
        {
            id: "7",
            titulo: "Existe um prazo para resposta?",
            categoria: "Base de conhecimento",
            descricao: "Sim, nosso prazo padrão de resposta é de até 24 horas úteis, dependendo da prioridade do chamado."
        },
        {
            id: "8",
            titulo: "Quais tipos de problema posso reportar?",
            categoria: "Base de conhecimento",
            descricao: "Você pode reportar falhas técnicas, dúvidas sobre uso do sistema, solicitações de melhoria e outros incidentes relacionados."
        },
        {
            id: "9",
            titulo: "Como anexar arquivos ao chamado?",
            categoria: "Base de conhecimento",
            descricao: "Ao criar ou atualizar um chamado, utilize a opção 'Anexar Arquivo' para enviar imagens, PDFs ou documentos relevantes."
        },
        {
            id: "10",
            titulo: "Recebo notificações sobre meu chamado?",
            categoria: "Base de conhecimento",
            descricao: "Sim, você receberá notificações por e-mail a cada atualização importante no seu chamado."
        }
    ]

    const [selectedElement, setSelectedElement] = React.useState<Faq | null>(null);
    const [isDialogOpen, setDialogOpen] = React.useState(false);

    const openDialog = (faq: Faq, mode: 'view' | 'finalize') => {
        setSelectedElement(faq);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedElement(null);
        setDialogOpen(false);
    };

    return (
        <>
            <Card sx={sx}>
                <CardHeader title="Perguntas frequentes" />
                <Divider />
                <Box sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Número</TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>Categoria</TableCell>

                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dadosFaqs.map((faq) => {

                                return (
                                    <TableRow hover key={faq.id}>
                                        <TableCell>{faq.id}</TableCell>
                                        <TableCell>{faq.titulo}</TableCell>
                                        <TableCell>{faq.categoria}</TableCell>

                                        <TableCell>
                                            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                                <Tooltip title="Visualizar">
                                                    <IconButton onClick={() => openDialog(faq, 'view')}>
                                                        <MagnifyingGlass />
                                                    </IconButton>
                                                </Tooltip>

                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                        color="inherit"
                        endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
                        size="small"
                        variant="text"
                    >
                        Ver todos
                    </Button>
                </CardActions>

                <DialogFaq
                    open={isDialogOpen}
                    onClose={closeDialog}
                    faq={selectedElement}
                />
            </Card>
        </>
    )
}
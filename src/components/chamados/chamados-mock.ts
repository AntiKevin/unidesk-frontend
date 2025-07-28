export const exemplosChamados: Ticket[] = [
		{
			"id": 1,
			"idTicket": 1,
			"titulo": "Problema com acesso ao sistema",
			"descricao": "Não consigo logar no sistema acadêmico.",
			"dataCriacao": 1753716679.831460000,
			"dataFechamento": null,
			"dataAtualizacao": 1753716679.831460000,
			"coordenacao": {
				"idCoordenacao": 1,
				"nome": "Coordenação de Engenharia de Software",
				"curso": {
					"idCurso": 1,
					"nome": "Engenharia de Software",
					"campus": "Campus Principal"
				}
			},
			"funcionario": {
				"idUsuario": 6,
				"usuario": "carlos.pereira",
				"nome": "Carlos Pereira",
				"email": "carlos.pereira@example.com",
				"matricula": "F001",
				"coordenacao": {
					"idCoordenacao": 1,
					"nome": "Coordenação de Engenharia de Software",
					"curso": {
						"idCurso": 1,
						"nome": "Engenharia de Software",
						"campus": "Campus Principal"
					}
				}
			},
			"aluno": {
				"idUsuario": 1,
				"usuario": "joao.silva",
				"nome": "João Silva",
				"email": "joao.silva@example.com",
				"matricula": "20230001",
				"curso": {
					"idCurso": 1,
					"nome": "Engenharia de Software",
					"campus": "Campus Principal"
				},
				"role": "ALUNO"
			},
			"status": {
				"idStatus": 1,
				"nome": "Aberto"
			},
			"prioridade": {
				"idPrioridade": 3,
				"nivel": "Alta"
			},
			"categoria": {
				"idCategoria": 1,
				"nome": "Suporte Técnico"
			}
		},
		{
			"id": 2,
			"idTicket": 2,
			"titulo": "Dúvida sobre nota",
			"descricao": "Minha nota de cálculo não aparece no histórico.",
			"dataCriacao": 1753716679.831460000,
			"dataFechamento": null,
			"dataAtualizacao": 1753716679.831460000,
			"coordenacao": {
				"idCoordenacao": 2,
				"nome": "Coordenação de Ciência da Computação",
				"curso": {
					"idCurso": 2,
					"nome": "Ciência da Computação",
					"campus": "Campus Secundário"
				}
			},
			"funcionario": {
				"idUsuario": 7,
				"usuario": "usuario.admin",
				"nome": "Mariana Costa",
				"email": "mariana.costa@example.com",
				"matricula": "F002",
				"coordenacao": {
					"idCoordenacao": 2,
					"nome": "Coordenação de Ciência da Computação",
					"curso": {
						"idCurso": 2,
						"nome": "Ciência da Computação",
						"campus": "Campus Secundário"
					}
				}
			},
			"aluno": {
				"idUsuario": 2,
				"usuario": "maria.souza",
				"nome": "Maria Souza",
				"email": "maria.souza@example.com",
				"matricula": "20230002",
				"curso": {
					"idCurso": 2,
					"nome": "Ciência da Computação",
					"campus": "Campus Secundário"
				},
				"role": "ALUNO"
			},
			"status": {
				"idStatus": 1,
				"nome": "Aberto"
			},
			"prioridade": {
				"idPrioridade": 2,
				"nivel": "Média"
			},
			"categoria": {
				"idCategoria": 3,
				"nome": "Acadêmico"
			}
		},
		{
			"id": 3,
			"idTicket": 3,
			"titulo": "Solicitação de material",
			"descricao": "Preciso de acesso aos slides da aula de Banco de Dados.",
			"dataCriacao": 1753716679.831460000,
			"dataFechamento": null,
			"dataAtualizacao": 1753716679.831460000,
			"coordenacao": {
				"idCoordenacao": 1,
				"nome": "Coordenação de Engenharia de Software",
				"curso": {
					"idCurso": 1,
					"nome": "Engenharia de Software",
					"campus": "Campus Principal"
				}
			},
			"funcionario": {
				"idUsuario": 6,
				"usuario": "carlos.pereira",
				"nome": "Carlos Pereira",
				"email": "carlos.pereira@example.com",
				"matricula": "F001",
				"coordenacao": {
					"idCoordenacao": 1,
					"nome": "Coordenação de Engenharia de Software",
					"curso": {
						"idCurso": 1,
						"nome": "Engenharia de Software",
						"campus": "Campus Principal"
					}
				}
			},
			"aluno": {
				"idUsuario": 1,
				"usuario": "joao.silva",
				"nome": "João Silva",
				"email": "joao.silva@example.com",
				"matricula": "20230001",
				"curso": {
					"idCurso": 1,
					"nome": "Engenharia de Software",
					"campus": "Campus Principal"
				},
				"role": "ALUNO"
			},
			"status": {
				"idStatus": 1,
				"nome": "Aberto"
			},
			"prioridade": {
				"idPrioridade": 1,
				"nivel": "Baixa"
			},
			"categoria": {
				"idCategoria": 3,
				"nome": "Acadêmico"
			}
		},
	]
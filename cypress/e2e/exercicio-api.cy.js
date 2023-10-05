/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     let rng = Math.floor(Math.random() * 99999999)

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: "GET",
               url: "usuarios",
          })
          .then((response => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(30)
          }))
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          cy.cadastrarUsuario(`Usuario Teste ${rng}`, `usuarioteste${rng}@teste.com`, "teste", "true")
          .then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal("Cadastro realizado com sucesso")
          })

     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario("Usuario Teste", "usuarioteste", "teste", "true")
          .then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.email).to.equal('email deve ser um email válido')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.editarUsuario(`Usuario Editado ${rng}`, `usuarioeditado${rng}@teste.com`, "teste", "true")
          .then((response)=>{
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal("Registro alterado com sucesso")
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.excluirUsuario()
          .then((response)=>{
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal("Registro excluído com sucesso")
          })
     });
});

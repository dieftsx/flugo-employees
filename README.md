Flugo Sistema de Colaboradores
📋 Sobre o Projeto
Sistema de gerenciamento de colaboradores desenvolvido com React, TypeScript e Material UI, utilizando Firebase para autenticação e armazenamento de dados.

🚀 Funcionalidades
✅ Autenticação com Google

✅ Cadastro de colaboradores (formulário multi-step)

✅ Listagem de colaboradores

✅ Edição de colaboradores

✅ Exclusão de colaboradores

✅ Interface responsiva com Material UI

✅ Sidebar de navegação

✅ Avatares por gênero

🛠️ Tecnologias Utilizadas
React 18 com TypeScript

Material UI (MUI)

Firebase (Auth e Firestore)

React Router DOM

📦 Pré-requisitos
Node.js (versão 14 ou superior)

npm ou yarn

Conta no Firebase

⚙️ Configuração do Ambiente
1. Clone o projeto


```git clone https://github.com/dieftsx/flugo-employees.git```

cd flugo-employees

2. Instale as dependências

3. Configure o Firebase
Acesse o Firebase Console

Crie um novo projeto

Ative a Autenticação com Google

Crie um banco Firestore Database

Configure as regras de segurança:
````
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /employees/{employee} {
      allow read, write: if request.auth != null;
    }
  }
}
````
4. Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto:

````
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
````

5. Execute o projeto
``` 
npm start
```
O projeto estará disponível em: http://localhost:3000

📁 Estrutura do Projeto
````
src/
├── components/
│   ├── employees/
│   │   ├── EmployeeForm/
│   │   │   ├── BasicInfoStep.tsx
│   │   │   ├── ProfessionalInfoStep.tsx
│   │   │   ├── FormStepper.tsx
│   │   │   └── index.tsx
│   │   ├── SuccessDialog.tsx
│   │   └── EmployeeList/
│   ├── layout/
│   │   ├── AppBar.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   └── ui/
├── pages/
│   ├── DashboardPage.tsx
│   ├── RegisterEmployeePage.tsx
│   ├── EmployeeListPage.tsx
│   ├── EditEmployeePage.tsx
│   └── LoginPage.tsx
├── context/
│   └── AuthContext.tsx
├── types/
│   └── employeeTypes.ts
├── utils/
│   ├── validation.ts
│   ├── avatarUtils.ts
│   └── constants.ts
├── firebase.ts
└── App.tsx
````

🔧 Scripts Disponíveis
````
npm start - Inicia o servidor de desenvolvimento

npm run build - Gera build de produção

npm test - Executa os testes

npm run eject - Remove as dependências do Create React App
````
📝 Licença
Este projeto está sob a licença MIT.

🤝 Suporte
Em caso de problemas:

Verifique se todas as variáveis de ambiente estão configuradas

Confirme as regras de segurança do Firestore

Verifique o console do navegador para mensagens de erro

Desenvolvido com React, TypeScript e Firebase
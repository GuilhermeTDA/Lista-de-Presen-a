import { useState,useEffect } from 'react';
import Card from '../../Componentes/Card'
import './style.css'
import Footer from  '../../Componentes/Footer/index'


function PaginaInicial() {

    
    const [nomeAluno,setNomeAluno] = useState();
    
    const [alunos,setAlunos] = useState([]);

    const [usuario,setUsuario] = useState({nome: "", img: ""});

    function aicionarAluno() {
        const novoAluno = {
            nome: nomeAluno,
            hora:  new Date().toLocaleTimeString("pt-br",{
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
        }

        setAlunos(alunosAntigos =>  [...alunosAntigos, novoAluno])
    }

    useEffect(() =>  {
        //corpo useEffect
        
        fetch('https://randomuser.me/api')
       .then(Response => Response.json()) 
       .then(data => setUsuario({nome:data.results[0].name.first,img:data.results[0].picture.large}))
    },[])

   return (
    <> 
        <div className="container">

            <header>
                <h1>Lista de Presenças</h1>
                <div className='imagem'>
                    <strong>{usuario.nome}</strong>
                    <img 
                    src={usuario.img}
                    alt= "logo da Ulbra" >
                 </img>

                </div>
            </header>

            

            <input type="text" placeholder="Digite o nome" onChange={e => setNomeAluno(e.target.value) } />

            <button type="button" onClick={aicionarAluno}>Adicionar</button>
            {
             alunos.map(aluno => <Card key={aluno.hora} nome={ aluno.nome } hora= {aluno.hora}/> )
            
            }

        </div>
        
            <Footer />
        </> 
    )

}
export default PaginaInicial